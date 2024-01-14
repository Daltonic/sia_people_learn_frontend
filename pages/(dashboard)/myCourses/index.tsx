import MyCourses from "@/components/dashboard/courses/MyCourses";
import DashboardLayout from "@/components/dashboard/dashboardLayout/DashboardLayout";

const App: React.FC = () => {
 return (
   <DashboardLayout>
     <MyCourses />
   </DashboardLayout>
 );
};

export default App;
