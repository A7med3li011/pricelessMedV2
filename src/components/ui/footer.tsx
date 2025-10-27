import Image from "next/image"
import logo_white from "../../../public/assets/logo_white.png"
import Links from "./links"
import Icons from "./footer/icons"
import Link from "next/link"

const termLinks = [
    {title:"Data deletion",link:"/"},
    {title:"Privacy",link:"/"},
    {title:"Terms",link:"/"},
    {title:"Cookie preferences",link:"/"},

]

export default function Footer(){

    return <section className=" w-[95%] mx-auto py-15">
        
        <section >
            <Image width={150} height={150}  src={logo_white} alt="priceless-med"/>
        </section>

        <section className="flex flex-col sm:flex-row gap-y-10 items-center justify-between border-b-[1px] border-b-[#292929] pb-6 my-10">
            <Links light={true}/>
            <Icons/>
        </section>


        <section className="text-[#717678] flex sm:items-start  flex-col sm:justify-between items-center sm:flex-row gap-y-10 ">
            <p className="sm:w-1/3 w-full leading-6">©2025 PricelessMed Technologies. All rights reserved. Various trademarks held by their respective owners.</p>

    <ul className="flex items-center gap-x-4 text-[#BABBBC] text-xs sm:text-base flex-wrap gap-y-3">
        {termLinks.map((ele,index)=><li  key={index}><Link  href={ele.link}>{ele.title}</Link></li>)}
    </ul>

        </section>



    </section>
}