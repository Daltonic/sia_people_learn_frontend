import CourseForm from "@/components/dashboard/createProduct/CourseForm";
import CourseHeader from "@/components/dashboard/createProduct/CourseHeader";
import DashboardLayout from "@/components/dashboard/dashboardLayout/DashboardLayout";

const CreateCourse: React.FC = () => {
  return (
    <DashboardLayout>
      <CourseHeader />
      <CourseForm />
    </DashboardLayout>
  );
};

export default CreateCourse;
