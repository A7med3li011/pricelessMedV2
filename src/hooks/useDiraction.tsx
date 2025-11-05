import { getDirection } from "../utils/direction";
import { useLocale } from "next-intl";

export function useDirection() {
  const locale = useLocale();
  const direction = getDirection(locale);
  const isRTL = direction === "rtl";
  return { direction, isRTL };
}

export default useDirection;
