import DashboardHeading from "@/components/dashboard/dashboardLayout/DashboardHeading";
import DashboardLayout from "@/components/dashboard/dashboardLayout/DashboardLayout";
import SiteSettingsForm from "@/components/dashboard/settings/SiteSettingsForm";
import { fetchSiteSettings } from "@/services/backend.services";
import { ISiteSettings } from "@/utils/type.dt";

const SiteSettings: React.FC<{ settingsData: ISiteSettings }> = ({
  settingsData,
}) => {
  return (
    <DashboardLayout>
      <DashboardHeading
        title="Manage Site Settings"
        description="Manage Site banner Url, banner text and banner caption"
      />
      <SiteSettingsForm settingsData={settingsData} />
    </DashboardLayout>
  );
};

export default SiteSettings;

export const getServerSideProps = async () => {
  try {
    const settings = await fetchSiteSettings();
    return {
      props: {
        settingsData: JSON.parse(JSON.stringify(settings)) as ISiteSettings,
      },
    };
  } catch (e: any) {
    console.log(e.message);
    return {
      props: {
        settingsData: {} as ISiteSettings,
      },
    };
  }
};
