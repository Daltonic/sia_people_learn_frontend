import DashboardHeading from "@/components/dashboard/dashboardLayout/DashboardHeading";
import DashboardLayout from "@/components/dashboard/dashboardLayout/DashboardLayout";
import EditCourseForm from "@/components/dashboard/editProduct/EditCourseForm";

const EditCreateCourse: React.FC = () => {
 return (
   <DashboardLayout>
    <DashboardHeading title="Edit Product" description="  Edit your products." />
     <EditCourseForm />
   </DashboardLayout>
 );
};

export default EditCreateCourse;
