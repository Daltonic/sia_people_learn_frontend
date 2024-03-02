import { ChangeEvent, SyntheticEvent, useState } from "react";
import Button from "../reusableComponents/Button";
import InputField from "../reusableComponents/InputField";
import { toast } from "react-toastify";
import { sendMessage } from "@/services/backend.services";

const Hero: React.FC = () => {
  const [formInput, setFormInput] = useState<{
    name: string;
    email: string;
    message: string;
  }>({
    name: "",
    email: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget;

    setFormInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    const { name, email, message } = formInput;
    await toast.promise(
      new Promise<void>((resolve, reject) => {
        sendMessage({ name, email, message })
          .then((res) => {
            setSubmitting(false),
              setFormInput({ name: "", email: "", message: "" });
            resolve();
          })
          .catch((error) => {
            setSubmitting(false);
            console.log(error);
            reject();
          });
      }),
      {
        pending: "Sending Message...",
        success: "Message Sent Successfully 👌",
        error: "Encountered error 🤯",
      }
    );
  };
  return (
    <div className="w-full md:mb-16 py-10 md:p-36 bg-[#F9F9F9] md:h-[28rem] flex flex-col md:flex-row justify-between">
      <div className="px-5 sm:px-10 flex-1">
        <h1 className="text-3xl md:text-4xl font-bold text-[#321463]">
          Contact Us
        </h1>
        <p className="text-md mt-3 capitalize text-[#4F547B]">
          We invite you to reach out to us for any inquiries, feedback,
          partnerships, consultancy, or Development service.
        </p>
      </div>
      <div className="bg-white p-5 sm:p-10 md:p-8 md:rounded-md w-full md:w-1/2 border mt-5 z-10 h-fit shadow-xl shadow-[#EDEDED]">
        <h1 className="text-[#321463] font-medium text-xl md:text-lg">
          Send a Message
        </h1>
        <p className="text-[#4F547B] md:text-sm mb-6">
          Ready to connect? Send us a message and let&apos;s start your learning
          journey
        </p>
        <form onSubmit={handleSubmit}>
          <InputField
            label="Name"
            name="name"
            placeholder="Enter your name"
            required
            inputType="text"
            value={formInput.name}
            handleChange={handleChange}
          />
          <InputField
            label="Email"
            name="email"
            placeholder="youremail@domain.com"
            required
            inputType="email"
            value={formInput.email}
            handleChange={handleChange}
          />
          <label htmlFor="message" className="text-violet-950 font-medium">
            Message:
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            cols={50}
            value={formInput.message}
            onChange={handleChange}
            className="text-slate-600 border border-[color:var(--border-2,#E1DDDD)] w-full justify-center mt-3 p-3 md:pl-6 py-3 rounded-lg items-start mb-2"
          ></textarea>
          <Button variant="pink">
            {submitting ? "Sending" : "Send"} Message
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Hero;
