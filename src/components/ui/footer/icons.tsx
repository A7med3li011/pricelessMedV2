
import Link from "next/link";
import { FaLinkedin, FaTiktok } from "react-icons/fa";
import { IoLogoFacebook, IoLogoInstagram } from "react-icons/io";


const icons = [
    {icon:<IoLogoFacebook />,link:"/"},
    {icon:<IoLogoInstagram />,link:"/"},
    {icon:<FaLinkedin />,link:"/"},
    {icon:<FaTiktok />,link:"/"}

]

export default function Icons (){


    return <ul className=" flex items-center gap-x-8 text-white">
      {  icons.map((ele,index)=><li key={index}><Link href={ele.link}>{ele.icon}</Link></li>)}
    </ul>
}