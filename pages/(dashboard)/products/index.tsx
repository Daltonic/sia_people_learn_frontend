import DashboardLayout from "@/components/dashboard/dashboardLayout/DashboardLayout";
import Products from "@/components/dashboard/products/Products";
import {
  fetchAcademies,
  fetchBooks,
  fetchCourses,
} from "@/services/backend.services";
import { IAcademies, ICourses } from "@/utils/type.dt";
import { GetServerSidePropsContext } from "next";

const App: React.FC<{
  academiesData: IAcademies;
  coursesData: ICourses;
  booksData: ICourses;
}> = ({ academiesData, coursesData, booksData }) => {
  return (
    <DashboardLayout>
      <Products
        academiesObj={academiesData}
        coursesObj={coursesData}
        booksObj={booksData}
      />
    </DashboardLayout>
  );
};

export default App;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const token = context.req.cookies.accessToken;
  try {
    const academies = await fetchAcademies({}, token);

    const courses = await fetchCourses({ type: "Course" }, token);

    const books = await fetchBooks({ type: "Book" }, token);

    return {
      props: {
        academiesData: JSON.parse(JSON.stringify(academies)),
        coursesData: JSON.parse(JSON.stringify(courses)),
        booksData: JSON.parse(JSON.stringify(books)),
      },
    };
  } catch (e: any) {
    console.log(e);
    return {
      props: {
        academiesData: {} as any,
        coursesData: {} as any,
        booksData: {} as any,
      },
    };
  }
};
