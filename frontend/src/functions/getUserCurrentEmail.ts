import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface CustomJwtPayload {
  sub: string;
  email: string;
  userName: string;
}

const getEmailCurrentUser = (): string => {
  const token = Cookies.get('ff_token');
  console.log(token);
  if(token) {
    const decode = jwtDecode<CustomJwtPayload>(token || '');
    return decode.email;
  } else {
    return '';
  }
}

export default getEmailCurrentUser;