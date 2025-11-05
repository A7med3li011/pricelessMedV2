import ContactForm from "@/src/components/contact-us/contact-form";
import FaqSkeleton from "@/src/components/contact-us/faq-skeleton";
import FaqContent from "@/src/components/home/Faq/faq-content";
import HeadTitle from "@/src/components/ui/head-title";
import MainHeader from "@/src/components/ui/main-header";
import { Suspense } from "react";

export default function contactPage() {
  return (
    <section className="">
      <section className="bg-gradient py-20">
        <section className="container ">
          <section className="text-center w-2/3 md:w-6/12 mx-auto">
            <HeadTitle title={`Frequently Asked Questions`} />

            <MainHeader
              text={`Everything you need to know about saving on healthcare `}
            />
          </section>
          <Suspense fallback={<FaqSkeleton />}>
            <FaqContent />
          </Suspense>
        </section>
      </section>
      <section>
        <section className="bg-white py-20 container">
          <section className="text-center w-2/3 md:w-6/12 mx-auto">
            <HeadTitle title={`CONTACT`} />

            <MainHeader text={`Get in touch `} />
          </section>
          <p className="text-center mb-1 text-sm text-[#717678] tracking-[0px]">
            Our team is happy to answer your questions
          </p>
          <p className="text-center text-sm text-[#717678] tracking-[0px]">
            Fill out the form below and a representative will reach out.
          </p>

          <ContactForm />
        </section>
      </section>
    </section>
  );
}
