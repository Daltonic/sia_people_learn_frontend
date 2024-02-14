import DashboardLayout from "@/components/dashboard/dashboardLayout/DashboardLayout";
import MyProducts from "@/components/dashboard/myProducts/MyProducts";
import { fetchAcademies } from "@/services/backend.services";
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
    </DashboardLayout>
  );
};

export default Products;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const token = context.req.cookies.accessToken;

  const requestDetails = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  };

  try {
    const academies = (await fetchAcademies(
      { instructor: "true" },
      token
    )) as IAcademies;

    const coursesRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/courses?type=Course&instructor=true`,
      requestDetails
    );

    const courses = (await coursesRes.json()) as ICourses;

    const booksRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/courses?type=Book&instructor=true`,
      requestDetails
    );

    const books = (await booksRes.json()) as ICourses;

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
