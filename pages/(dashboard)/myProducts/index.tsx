import DashboardLayout from "@/components/dashboard/dashboardLayout/DashboardLayout";
import MyProducts from "@/components/dashboard/myProducts/MyProducts";
import { _useContext } from "@/context/Context";

const App: React.FC = () => {
  return (
    <DashboardLayout>
      <MyProducts />
    </DashboardLayout>
  );
};

export default App;
