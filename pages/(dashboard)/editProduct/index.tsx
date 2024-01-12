import DashboardLayout from "@/components/dashboard/dashboardLayout/DashboardLayout";
import EditCourseForm from "@/components/dashboard/editProduct/EditCourseForm";
import EditCourseHeader from "@/components/dashboard/editProduct/EditCourseHeader";

const EditCreateCourse: React.FC = () => {
 return (
   <DashboardLayout>
    <EditCourseHeader/>
     <EditCourseForm />
   </DashboardLayout>
 );
};

export default EditCreateCourse;
