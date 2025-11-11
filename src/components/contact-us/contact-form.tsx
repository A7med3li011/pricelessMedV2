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
import { useTranslations, useLocale } from "next-intl";

export default function ContactForm() {
  const t = useTranslations("contact");
  const locale = useLocale();

  type FormData = z.infer<typeof schema>;
  const schema = z.object({
    first_name: z
      .string()
      .nonempty(t("form.firstNameRequired"))
      .min(3, t("form.firstNameMin"))
      .max(30, t("form.firstNameMax"))
      .regex(/^[a-zA-Z\s]+$/, t("form.firstNameRegex")),

    last_name: z
      .string()
      .nonempty(t("form.lastNameRequired"))
      .min(3, t("form.lastNameMin"))
      .max(30, t("form.lastNameMax"))
      .regex(/^[a-zA-Z\s]+$/, t("form.lastNameRegex")),

    email: z
      .string()
      .nonempty(t("form.emailRequired"))
      .email(t("form.emailInvalid"))
      .toLowerCase(),

    mobile: z
      .string()
      .nonempty(t("form.phoneNumberRequired"))
      .refine((value) => isValidPhoneNumber(value || ""), {
        message: t("form.phoneNumberInvalid"),
      }),

    message: z
      .string()
      .nonempty(t("form.messageRequired"))
      .min(10, t("form.messageMin"))
      .max(300, t("form.messageMax")),
  });

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
          message: t("form.successMessage"),
        });
        toast.success(t("form.successMessage"));
        reset(); // Reset form after successful submission

        // Clear success message after 5 seconds
      } else {
        // Error from API
        setSubmitStatus({
          type: "error",
          message: res.error?.message || t("form.errorMessage"),
        });
      }
    } catch (error) {
      // Unexpected error
      setSubmitStatus({
        type: "error",
        message: t("form.errorMessage"),
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
            placeholder={t("form.firstName")}
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
            placeholder={t("form.lastName")}
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
            placeholder={t("form.email")}
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
                  placeholder={t("form.phone")}
                  dir={locale === "ar" ? "rtl" : "ltr"}
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
          placeholder={t("form.messagePlaceholder")}
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

      <CustomButton
        type="submit"
        text={isSubmitting ? t("form.sending") : t("form.getInTouch")}
        style={`bg-[#8A44D9] text-white py-2 px-3 text-sm mt-5 rounded-full ${
          isSubmitting ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`}
        disabled={isSubmitting}
      />
    </form>
  );
}
