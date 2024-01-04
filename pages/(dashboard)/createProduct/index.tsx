import CourseForm from "@/components/dashboard/createProduct/CourseForm";
import CourseHeader from "@/components/dashboard/createProduct/CourseHeader";
import Curriculum from "@/components/dashboard/createProduct/Curriculum";
import DashboardLayout from "@/components/dashboard/dashboardLayout/DashboardLayout";

const CreateCourse: React.FC = () => {
 return (
   <DashboardLayout>
    <CourseHeader/>
     <CourseForm />
     <Curriculum/>
   </DashboardLayout>
 );
};

export default CreateCourse;
