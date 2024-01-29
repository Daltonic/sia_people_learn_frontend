import CourseForm from "@/components/dashboard/createProduct/CourseForm";
import DashboardHeading from "@/components/dashboard/dashboardLayout/DashboardHeading";
import DashboardLayout from "@/components/dashboard/dashboardLayout/DashboardLayout";

const CreateCourse: React.FC = () => {
  return (
    <DashboardLayout>
      <DashboardHeading title="Create Product" description=" Start building your products." />
      <CourseForm />
    </DashboardLayout>
  );
};

export default CreateCourse;
