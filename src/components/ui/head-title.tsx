type HeadTitleProps = {
  title: string;
};

export default function HeadTitle({ title }: HeadTitleProps) {
  return (
    <section className="bg-[linear-gradient(258.69deg,_#13ACFC_-0.13%,_#8A44D9_95.76%)] bg-clip-text text-transparent font-semibold text-sm tracking-wide">
      {title}
    </section>
  );
}
