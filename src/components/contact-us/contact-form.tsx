"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomButton from "../ui/customButton";
import { z } from "zod";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import flags from "react-phone-number-input/flags";
import { useState } from "react";
import { parsingMobile } from "@/src/utils/parsePhoneNumber";
import contactusAction from "@/src/app/actions/client.action";
import toast from "react-hot-toast";

const schema = z.object({
  first_name: z
    .string()
    .nonempty("First name is required")
    .min(3, "First name must be at least 3 characters")
    .max(30, "First name must be at most 30 characters")
    .regex(/^[a-zA-Z\s]+$/, "First name can only contain letters"),

  last_name: z
    .string()
    .nonempty("Last name is required")
    .min(3, "Last name must be at least 3 characters")
    .max(30, "Last name must be at most 30 characters")
    .regex(/^[a-zA-Z\s]+$/, "Last name can only contain letters"),

  email: z
    .string()
    .nonempty("Email is required")
    .email("Please enter a valid email address")
    .toLowerCase(),

  mobile: z
    .string()
    .nonempty("Phone number is required")
    .refine((value) => isValidPhoneNumber(value || ""), {
      message: "Please enter a valid phone number",
    }),

  message: z
    .string()
    .nonempty("Message is required")
    .min(10, "Message must be at least 10 characters")
    .max(300, "Message must be at most 300 characters"),
});

type FormData = z.infer<typeof schema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onBlur", // Validate on blur for better UX
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
   

    try {
      const formData = new FormData();
      const nationalNumber = parsingMobile(data?.mobile)?.phone;
      const code = parsingMobile(data?.mobile)?.code;

      formData.append("first_name", data.first_name);
      formData.append("last_name", data.last_name);
      formData.append("email", data.email);
      formData.append("mobile", nationalNumber ?? "");
      formData.append("countryCode", code ?? "");
      formData.append("message", data.message);

      const res = await contactusAction(formData);
      console.log("Response:", res);

      if (res.success) {
        // Success
        setSubmitStatus({
          type: "success",
          message: "Thank you! Your message has been sent successfully.",
        });
        toast.success("Thank you! Your message has been sent successfully.")
        reset(); // Reset form after successful submission

        // Clear success message after 5 seconds
       
      } else {
        // Error from API
        setSubmitStatus({
          type: "error",
          message:
            res.error?.message ||
            "Oops! Something went wrong. Please try again or contact us directly.",
        });
      }
    } catch (error) {
      // Unexpected error
      setSubmitStatus({
        type: "error",
        message:
          "Oops! Something went wrong. Please try again or contact us directly.",
      });
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full px-5 sm:px-0 sm:w-2/3 md:w-6/12 mx-auto mt-20 text-center "
    >
      <section className="flex items-center justify-between flex-col md:flex-row gap-5">
        <div className="w-full md:w-[48%]">
          <input
            type="text"
            {...register("first_name")}
            className="border-[1px] focus:outline-none  border-[#DDDDDD] py-3 px-2  rounded-lg w-full"
            placeholder="First name"
          />
          {errors.first_name && (
            <p className="text-red-500 text-xs mt-1 text-left">
              {errors.first_name.message}
            </p>
          )}
        </div>
        <div className="w-full md:w-[48%]">
          <input
            type="text"
            {...register("last_name")}
            className="border-[1px] focus:outline-none  border-[#DDDDDD] py-3 px-2  rounded-lg w-full"
            placeholder="Last name"
          />
          {errors.last_name && (
            <p className="text-red-500 text-xs mt-1 text-left">
              {errors.last_name.message}
            </p>
          )}
        </div>
      </section>
      <section className="flex items-center justify-between flex-col md:flex-row gap-5 my-4">
        <div className="w-full md:w-[48%]">
          <input
            type="text"
            {...register("email")}
            className="border-[1px] focus:outline-none  border-[#DDDDDD] py-3 px-2  rounded-lg w-full"
            placeholder="Email address"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1 text-left">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="w-full md:w-[48%]">
          <Controller
            name="mobile"
            control={control}
            render={({ field: { onChange, value } }) => (
              <div className="border-[1px] border-[#DDDDDD] py-3 px-2 rounded-lg w-full">
                <PhoneInput
                  international
                  countryCallingCodeEditable={false}
                  defaultCountry="AE"
                  value={value}
                  onChange={onChange}
                  flags={flags}
                  className="phone-input-custom"
                  placeholder="Phone number"
                />
              </div>
            )}
          />
          {errors.mobile && (
            <p className="text-red-500 text-xs mt-1 text-left">
              {errors.mobile.message}
            </p>
          )}
        </div>
      </section>
      <section>
        <textarea
          {...register("message")}
          placeholder="Can you share more about your needs or challenges?"
          className="border-[1px] focus:outline-none  border-[#DDDDDD] py-3 px-2  rounded-lg w-full"
          rows={10}
        ></textarea>
        {errors.message && (
          <p className="text-red-500 text-xs mt-1 text-left">
            {errors.message.message}
          </p>
        )}
      </section>

      {/* Status Messages */}
      {submitStatus.type && (
        <div
          className={`mt-4 p-3 rounded-lg text-sm ${
            submitStatus.type === "success"
              ? "bg-green-100 text-green-800 border border-green-300"
              : "bg-red-100 text-red-800 border border-red-300"
          }`}
        >
          {submitStatus.message}
        </div>
      )}

      <CustomButton
        type="submit"
        text={isSubmitting ? "Sending..." : "Get in touch"}
        style={`bg-[#8A44D9] text-white py-2 px-3 text-sm mt-5 rounded-full ${
          isSubmitting ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`}
        disabled={isSubmitting}
      />
    </form>
  );
}
