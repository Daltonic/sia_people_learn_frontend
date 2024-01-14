import DashboardLayout from "@/components/dashboard/dashboardLayout/DashboardLayout";
import Products from "@/components/dashboard/products/Products";

const App: React.FC = () => {
 return (
   <DashboardLayout>
     <Products />
   </DashboardLayout>
 );
};

export default App;
