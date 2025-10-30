type HeadTitleProps = {
  text: string;
};
export default function MainHeader({ text }: HeadTitleProps) {
  return (
    <p className="font-bold text-xl md:text-4xl  md:tracking-[-1.5%] mb-5 mt-3">
      {text}
    </p>
  );
}
