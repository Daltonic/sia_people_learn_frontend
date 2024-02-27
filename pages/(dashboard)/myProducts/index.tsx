import DashboardLayout from "@/components/dashboard/dashboardLayout/DashboardLayout";
import MyProducts from "@/components/dashboard/myProducts/MyProducts";
import DeleteModal from "@/components/reusableComponents/DeleteModal";
import {
  fetchAcademies,
  fetchBooks,
  fetchCourses,
} from "@/services/backend.services";
import { IAcademies, ICourses } from "@/utils/type.dt";
import { GetServerSidePropsContext } from "next";

const Products: React.FC<{
  academiesData: IAcademies;
  coursesData: ICourses;
  booksData: ICourses;
}> = ({ academiesData, coursesData, booksData }) => {
  return (
    <DashboardLayout>
      <MyProducts
        academiesData={academiesData}
        coursesData={coursesData}
        booksData={booksData}
      />
      <DeleteModal />
    </DashboardLayout>
  );
};

export default Products;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const token = context.req.cookies.accessToken;

  try {
    const academies = (await fetchAcademies(
      { instructor: "true" },
      token
    )) as IAcademies;

    const courses = await fetchCourses(
      { type: "Course", instructor: "true" },
      token
    );

    const books = await fetchBooks({ type: "Book", instructor: "true" }, token);

    return {
      props: {
        academiesData: JSON.parse(JSON.stringify(academies)) as IAcademies,
        coursesData: JSON.parse(JSON.stringify(courses)) as ICourses,
        booksData: JSON.parse(JSON.stringify(books)) as ICourses,
      },
    };
  } catch (e: any) {
    console.log(e);
    return {
      props: {
        academiesData: {} as IAcademies,
        coursesData: {} as ICourses,
        booksData: {} as ICourses,
      },
    };
  }
};
