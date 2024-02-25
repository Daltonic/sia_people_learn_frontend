import CourseForm from "@/components/dashboard/createProduct/CourseForm";
import DashboardHeading from "@/components/dashboard/dashboardLayout/DashboardHeading";
import DashboardLayout from "@/components/dashboard/dashboardLayout/DashboardLayout";

const CreateCourse: React.FC = () => {
  return (
    <DashboardLayout>
      <DashboardHeading
        title="Create Course"
        description="Add a new Course to your Catalogue"
      />
      <CourseForm type="create" />
    </DashboardLayout>
  );
};

export default CreateCourse;
