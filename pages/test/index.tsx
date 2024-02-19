"use client";
import Layout from "@/components/layout/Layout";
import Button from "@/components/reusableComponents/Button";
import ProgressBar from "@/components/reusableComponents/ProgressBar";
import { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
import { MdCancel } from "react-icons/md";

type Image = {
    name: string;
    icon: string;
    file: File;
};

const TestPage: NextPage = () => {
    const [images, setImages] = useState<Image[]>([]);
    const [progress, setProgress] = useState(0);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = event.target.files;
        if (!fileList) return;

        const newImages: Image[] = Array.from(fileList).map((file) => ({
            name: file.name,
            icon: URL.createObjectURL(file),
            file: file,
        }));

        setImages((prevImages) => [...prevImages, ...newImages]);

        // Simulated progress update
        const interval = setInterval(() => {
            setProgress((prevProgress) => {
                if (prevProgress >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prevProgress + 10; // Increase the progress by 10% in each interval
            });
        }, 1000); // Simulated 1 second delay for each 10% progress increase
    };

    return (
        <Layout>
            <div className="text-center mb-14 p-5 md:px-16">
                <h1 className="text-violet-950 text-center text-3xl md:text-4xl font-bold">
                    UPLOAD FILES
                </h1>
                <p className="text-slate-600 text-center text-md mt-3 capitalize w-full">
                    Easily transfer your documents, images, and media with our intuitive upload feature.
                </p>
                <div className="w-3/5 mx-auto">
                    <div className="flex flex-col items-center justify-center border-dashed border-2 border-[#EDEDED] w-full mx-auto gap-5 p-10 mt-5 rounded-lg">
                        <Image width={200} height={200} src="/images/general/upload.png" className="w-28" alt="upload" />
                        <p className=" text-lg text-gray-600 text-center">Drag and drop your files <br /> OR</p>
                        <label htmlFor="file-upload" className="cursor-pointer">
                            <Button variant="pink" >
                                Browse Files
                            </Button>
                            <input id="file-upload" type="file" onChange={handleFileChange} className="hidden" multiple />
                        </label>
                    </div>
                    <div className="">
                        <h1 className="text-violet-950 text-lg font-medium text-start my-5">
                            Uploaded Files
                        </h1>
                        <div>
                            {images.map((image, i) => (
                                <div key={i} className="flex gap-2 items-center">
                                    <Image width={200} height={200} src="/images/general/imageFiles.png" className="object-cover w-10" alt="imageupload" />
                                    <div className="flex-1 flex justify-between text-gray-600">
                                        <div>
                                            <p>{image.name}</p>
                                            <ProgressBar progress={progress} />
                                        </div>
                                        <p>100%</p>
                                    </div>
                                    <MdCancel className="text-gray-600" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </Layout>
    );
};

export default TestPage;
