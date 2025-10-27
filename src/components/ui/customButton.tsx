type CustomButtonProps = {
     style?: string; // optional, in case no style class is passed
  text: string; // required button text
  fun?: React.MouseEventHandler<HTMLButtonElement>; // optional click handler
}

export default function CustomButton({style,text,fun}:CustomButtonProps){

    return <button className={style} onClick={fun}>{text}</button>

}