import CourseForm from "@/components/dashboard/createCourse/CourseForm";
import DashboardLayout from "@/components/dashboard/dashboardLayout/DashboardLayout";

const CreateCourse: React.FC = () => {
 return (
   <DashboardLayout>
     <CourseForm />
   </DashboardLayout>
 );
};

export default CreateCourse;
