import DashboardLayout from "@/components/dashboard/dashboardLayout/DashboardLayout";
import MyUsers from "@/components/dashboard/users/MyUsers";

const Users: React.FC = () => {
 return (
   <DashboardLayout>
    <MyUsers/>
   </DashboardLayout>
 );
};

export default Users;
