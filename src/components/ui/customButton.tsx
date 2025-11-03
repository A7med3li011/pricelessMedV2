type CustomButtonProps = {
  style?: string; // optional, in case no style class is passed
  text: string; // required button text
  fun?: React.MouseEventHandler<HTMLButtonElement>; // optional click handler
  type?: string; // required button text
};

export default function CustomButton({
  style,
  text,
  fun,
  type = "button",
}: CustomButtonProps) {
  return (
    <button type={type} className={style} onClick={fun}>
      {text}
    </button>
  );
}
