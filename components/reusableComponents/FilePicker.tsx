import { generateAlphanumeric } from "@/utils";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useState } from "react";
import axios from "axios";

interface Props {
  type: "Image" | "Video" | "PDF" | "Aud";
  label: string;
  fileName: string;
  setFileName: Dispatch<SetStateAction<string>>;
}

const FilePicker: React.FC<Props> = ({
  type,
  label,
  fileName,
  setFileName,
}) => {
  const [file, setFile] = useState<File | "">("");
  const [showFilePicker, setShowFilePicker] = useState<boolean>(false);

  const handleFileUpload = () => {
    if (file === "") return;
    const formData = new FormData();
    formData.append("file", file);

    const upload = async () => {
      try {
        const fileId = generateAlphanumeric(10);
        const folderName = type.toLowerCase();
        const url = `${process.env.NEXT_PUBLIC_RENTERD_BASE_URI}${process.env.NEXT_PUBLIC_WORKER_API_PREFIX}/objects/${folderName}/${fileId}?bucket=${process.env.NEXT_PUBLIC_BUCKET}`;

        const requestOptions = {
          method: "PUT",
          headers: {
            Authorization: `Basic ${Buffer.from(
              `:${process.env.NEXT_PUBLIC_RENTERD_API_PASSWORD}`
            ).toString("base64")}`,
          },
          body: formData,
        };

        const config = {
          method: "put",
          maxBodyLength: Infinity,
          url,
          headers: {
            Authorization: `Basic ${Buffer.from(
              `:${process.env.NEXT_PUBLIC_RENTERD_API_PASSWORD}}`
            ).toString("base64")}`,
            "Content-Type": type,
          },
          data: formData,
        };

        console.log(config);

        const response = await axios.request(config);

        // const response = await fetch(url, requestOptions);
        console.log(response);

        // const text = await response.text();
        // if (response.status === 400) {
        //   alert(text);
        // } else {
        //   const result = response.json();
        //   console.log(result);
        //   setFileName(url);
        // }
      } catch (e: any) {
        alert(e);
        console.log(e.message);
      }
    };
    upload();
  };

  const useBackend = () => {
    if (file === "") return;
    const formData = new FormData();
    formData.append("file", file);

    const upload = async () => {
      try {
        const requestDetails = {
          method: "POST",
          headers: {
            authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
          body: formData,
        };

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/media/sia/upload`,
          requestDetails
        );

        const text = await res.text();
        alert(text);

        const result = await res.json();
      } catch (e: any) {
        console.log(e.message);
      }
    };
    upload();
  };

  return (
    <div className="flex flex-col w-full my-3 relative">
      <label className="text-violet-950 font-medium">{label}</label>
      <div className="flex gap-2 items-center justify-center">
        <div className="flex items-center justify-center relative">
          <div
            onClick={() => setShowFilePicker((prev) => !prev)}
            className="flex justify-center items-center cursor-pointer select-none rounded-md relative"
          >
            <Image
              src={`/assets/file.png`}
              alt="file"
              width={36}
              height={36}
              className="object-contain"
            />
          </div>
          {showFilePicker && (
            <div className="glassmorphism z-10 absolute top-6 left-8 p-3 w-[195px] h-[150px] flex flex-col rounded-md justify-between">
              <div className="flex-1 flex flex-col">
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => setFile((e.target.files as FileList)[0])}
                />
                <label
                  htmlFor="file-upload"
                  className="border border-gray-300 py-1.5 px-2 rounded-md shadow-sm text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 cursor-pointer w-fit"
                >
                  Select {type}
                </label>

                <p className="mt-4 text-gray-500 text-xs truncate">
                  {file === "" ? "No file selected" : file?.name}
                </p>
              </div>
              <div className="mt-4 flex item-center justify-center">
                <button
                  className="px-2 py-1 flex-1 rounded-md color-red"
                  onClick={handleFileUpload}
                  disabled={file === ""}
                  type="button"
                >
                  Upload {type}
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="text-slate-600 border border-[color:var(--border-2,#E1DDDD)] w-full justify-center mt-3 p-3 md:pl-6 py-3 rounded-lg items-start focus:outline-none pr-12">
          {file === "" ? `No ${type} Uploaded` : fileName}
        </div>
      </div>
    </div>
  );
};

export default FilePicker;
