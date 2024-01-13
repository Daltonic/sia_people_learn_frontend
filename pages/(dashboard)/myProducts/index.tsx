import DashboardLayout from "@/components/dashboard/dashboardLayout/DashboardLayout";
import MyProducts from "@/components/dashboard/myProducts/MyProducts";
import { _useContext } from "@/context/Context";
import { useRouter } from "next/router";
import { useEffect } from "react";

const App: React.FC = () => {
  const router = useRouter();
  const { user } = _useContext();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [router, user]);
  return (
    <DashboardLayout>
      <MyProducts />
    </DashboardLayout>
  );
};

export default App;
