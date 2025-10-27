type HeadTitleProps = {
  title: string;
};

export default function HeadTitle({ title }: HeadTitleProps) {
  return (
    <section className="text-[#7E50DD] font-semibold text-xs tracking-wide">
      {title}
    </section>
  );
}
