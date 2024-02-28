import DashboardLayout from "@/components/dashboard/dashboardLayout/DashboardLayout";
import AllReviews from "@/components/dashboard/reviews/AllReviews";

const Reviews: React.FC = () => {
  return (
    <DashboardLayout>
      <AllReviews />
    </DashboardLayout>
  );
};

export default Reviews;
