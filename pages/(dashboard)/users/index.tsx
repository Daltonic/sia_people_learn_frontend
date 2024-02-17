import DashboardLayout from "@/components/dashboard/dashboardLayout/DashboardLayout";
import MyUsers from "@/components/dashboard/users/MyUsers";
import { fetchUsers } from "@/services/backend.services";
import { IUsers } from "@/utils/type.dt";
import { GetServerSidePropsContext } from "next";

const Users: React.FC<{ usersData: IUsers }> = ({ usersData }) => {
  return (
    <DashboardLayout>
      <MyUsers initialUserObj={usersData} />
    </DashboardLayout>
  );
};

export default Users;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const token = context.req.cookies.accessToken;
  try {
    const users = await fetchUsers({}, token);

    return {
      props: {
        usersData: JSON.parse(JSON.stringify(users)) as IUsers,
      },
    };
  } catch (e: any) {
    console.log(e);
    return {
      props: {
        usersData: {} as IUsers,
      },
    };
  }
};
