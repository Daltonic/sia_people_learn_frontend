import Button from "@/components/reusableComponents/Button";
import { ISiteSettings, RootState } from "@/utils/type.dt";
import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploaderActions } from "@/store/slices/uploaderSlice";
import { FaArrowsRotate, FaTrashCan } from "react-icons/fa6";
import Image from "next/image";
import InputField from "@/components/reusableComponents/InputField";
import TextAreaField from "@/components/reusableComponents/TextAreaField";
import FileUploader from "@/components/reusableComponents/FileUploader";
import { toast } from "react-toastify";
import { createSiteSettings } from "@/services/backend.services";
import { useRouter } from "next/navigation";

interface Props {
  settingsData?: ISiteSettings;
}

const SiteSettingsForm: React.FC<Props> = ({ settingsData }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { setUploaderModal } = uploaderActions;
  const { userData } = useSelector((states: RootState) => states.userStates);

  const [settings, setSettings] = useState<ISiteSettings>({
    bannerCaption: settingsData?.bannerCaption || "",
    bannerText: settingsData?.bannerText || "",
    bannerUrl: settingsData?.bannerUrl || null,
  });
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.currentTarget;

    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  console.log(settings);

  const handleImageMount = (imageUrl: string) => {
    setSettings((prev) => ({
      ...prev,
      bannerUrl: imageUrl,
    }));
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (!settings.bannerUrl) {
      return toast.warn("Please upload an image");
    }

    if (userData?.userType !== "admin") {
      return toast.warn("Only admins can update site settings");
    }

    setSubmitting(true);

    const token = sessionStorage.getItem("accessToken") as string;
    const inputData = { ...settings, bannerUrl: settings.bannerUrl! };

    await toast.promise(
      new Promise<void>((resolve, reject) => {
        createSiteSettings(inputData, token)
          .then((result) => {
            router.push("/(dashboard)/dashboard");
            setSubmitting(false);
            resolve(result);
          })
          .catch((error) => {
            setSubmitting(false);
            reject(error);
          });
      }),
      {
        pending: "Saving Settings...",
        success: "Successfully created 👌",
        error: "Encountered error 🤯",
      }
    );
  };

  return (
    <div className="bg-white rounded-lg">
      <div className="p-5 border-b border-[#EDEDED]">
        {!settings?.bannerUrl && (
          <Button
            onClick={() => dispatch(setUploaderModal("scale-100"))}
            className="text-slate-600 border border-[color:var(--border-2,#E1DDDD)]"
          >
            Add Image
          </Button>
        )}

        {settings.bannerUrl && (
          <div className="relative w-full">
            <div className="flex justify-start items-center space-x-2 absolute top-2 left-2">
              <Button
                onClick={() => dispatch(setUploaderModal("scale-100"))}
                className="bg-black bg-opacity-25 text-white"
              >
                <FaArrowsRotate size={20} />
              </Button>

              <Button
                onClick={() =>
                  setSettings((prev) => ({ ...prev, bannerUrl: "" }))
                }
                className="bg-black bg-opacity-25 text-white"
              >
                <FaTrashCan size={20} />
              </Button>
            </div>
            <Image
              src={settings.bannerUrl}
              alt={"Banner"}
              width={500}
              height={100}
              className="h-72 w-full object-cover"
            />
          </div>
        )}
      </div>
      <form className="p-5" onSubmit={handleSubmit}>
        <InputField
          label="Banner Caption"
          name="bannerCaption"
          placeholder="Banner Caption"
          required
          inputType="text"
          value={settings.bannerCaption}
          handleChange={handleChange}
        />
        <TextAreaField
          label="Banner Text"
          id="bannerText"
          name="bannerText"
          placeholder="Banner Text"
          value={settings.bannerText}
          handleChange={handleChange}
        />
        {settingsData ? (
          <Button variant="pink" className="mt-4" disabled={submitting}>
            {submitting ? "Updating" : "Update"}
          </Button>
        ) : (
          <Button variant="pink" className="mt-4" disabled={submitting}>
            {submitting ? "Creating" : "Create"}
          </Button>
        )}
      </form>
      <FileUploader
        onUploadSuccess={(response) => handleImageMount(response.url)}
        accept="image/png,image/jpeg,image/jpg"
      />
    </div>
  );
};

export default SiteSettingsForm;
