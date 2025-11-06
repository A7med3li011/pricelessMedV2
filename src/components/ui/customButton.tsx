type CustomButtonProps = {
  style?: string; // optional, in case no style class is passed
  text: string; // required button text
  fun?: React.MouseEventHandler<HTMLButtonElement>; // optional click handler
  type?: string; // button type (button, submit, reset)
  disabled?: boolean; // optional disabled state
};

export default function CustomButton({
  style,
  text,
  fun,
  type = "button",
  disabled = false,
}: CustomButtonProps) {
  return (
    <button type={type} className={style} onClick={fun} disabled={disabled}>
      {text}
    </button>
  );
}
