import AcademyForm from "@/components/academydetail/AcademyForm";
import DashboardHeading from "@/components/dashboard/dashboardLayout/DashboardHeading";
import DashboardLayout from "@/components/dashboard/dashboardLayout/DashboardLayout";

const CreateCourse: React.FC = () => {
  return (
    <DashboardLayout>
      <DashboardHeading
        title="Create Academy"
        description="Add an Academy to your Catalogue."
      />
      <AcademyForm type="create" />
    </DashboardLayout>
  );
};

export default CreateCourse;
