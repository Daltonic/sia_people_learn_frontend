import { generateAlphanumeric } from "@/utils";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useState } from "react";
import axios from "axios";

interface FileUpload {
  name: string;
  data: Buffer;
  size: number;
  encoding: string;
  tempFilePath: string;
  truncated: boolean;
  mimetype: string;
  md5: string;
  mv: Function;
}

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
  const [file, setFile] = useState<any>(null);
  const [fileInfo, setFileInfo] = useState<any>(null);
  const [showFilePicker, setShowFilePicker] = useState<boolean>(false);

  const handleSelectFile = (e: any) => {
    const reader = new FileReader();
    setFileInfo(e.target.files[0]);
    console.log(e.target.files[0]);

    // Define what happens when the file has been read
    reader.onload = function (e: any) {
      // e.target.result contains the file's data as a Blob
      const fileData = e.target.result;
      console.log(fileData); // Log the file's data to the console
      setFile(fileData);
    };

    // Read the file as a Blob
    reader.readAsArrayBuffer(e.target.files[0]);
  };

  const handleFileUpload = () => {
    if (!file) return;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", fileInfo.type);

    myHeaders.append(
      "Authorization",
      `Basic ${Buffer.from(
        `:${process.env.NEXT_PUBLIC_RENTERD_API_PASSWORD}`
      ).toString("base64")}`
    );

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: file,
    };
    const url = `${process.env.NEXT_PUBLIC_RENTERD_BASE_URI}${
      process.env.NEXT_PUBLIC_WORKER_API_PREFIX
    }/objects/${fileInfo?.type.split("/")[0]}/${generateAlphanumeric(
      6
    )}?bucket=${process.env.NEXT_PUBLIC_BUCKET}`;

    fetch(url, requestOptions)
      .then((response) => response.text())
      .then(() => {
        console.log("Uploaded successfully");
        setFileName(url);
      })
      .catch((error) => console.log("error", error));
  };

  // const handleFileUpload = async () => {
  //   if (!file) return;

  //   const alphanumericId = generateAlphanumeric(6);
  //   const url = `${process.env.NEXT_PUBLIC_RENTERD_BASE_URI}${
  //     process.env.NEXT_PUBLIC_WORKER_API_PREFIX
  //   }/objects/${fileInfo?.type.split("/")[0]}/${alphanumericId}?bucket=${
  //     process.env.NEXT_PUBLIC_BUCKET
  //   }`;

  //   const config = {
  //     method: "PUT",
  //     maxBodyLength: Infinity,
  //     url,
  //     headers: {
  //       "Content-Type": fileInfo.type,
  //       Authorization: `Basic ${Buffer.from(
  //         `:${process.env.NEXT_PUBLIC_RENTERD_API_PASSWORD}`
  //       ).toString("base64")}`,
  //     },
  //     data: file,
  //   };

  //   try {
  //     const response = await axios.request(config);
  //     console.log("Uploaded successfully");
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };

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
                  // onChange={(e) => setFile((e.target.files as FileList)[0])}
                  onChange={(e) => handleSelectFile(e)}
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

// var myHeaders = new Headers();
// myHeaders.append("Authorization", "Basic OnRlc3Q=");

// var requestOptions = {
//   method: 'GET',
//   headers: myHeaders,
//   redirect: 'follow'
// };

// fetch("https://zen.dappmentors.duckdns.org/api/worker/objects/image/Q4Urjt?bucket=dappmentors", requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));
