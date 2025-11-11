import { parsePhoneNumber } from "react-phone-number-input";
import { isValidPhoneNumber } from "react-phone-number-input";

export function parsingMobile(phone: string) {
  if (!isValidPhoneNumber(phone)) return;

  const parsed = parsePhoneNumber(phone);

  const data = {
    country: parsed?.country,
    code: `+${parsed?.countryCallingCode}`,
    phone: parsed?.nationalNumber,
  };
  return data;
}
