import { Poppins,  Rubik } from "next/font/google";

/* get direction based on locale */
export function getDirection(locale: string): 'ltr' | 'rtl' {
       return locale === 'ar' ? 'rtl' : 'ltr';
}
const english = Poppins({
       subsets: ["latin"],
       weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const arabic = Rubik({
       subsets: ["arabic"],
       weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export function getFont(locale: string) {
       return locale === "ar" ? arabic.className : english.className;
}