import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from "jwt-decode";

interface CustomJwtPayload {
  sub: string;
  email: string;
  userName: string;
}
 
export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  if(request.cookies.has('ff_token')) {
    const token = request.cookies.get('ff_token')?.value;
    const decode = jwtDecode<CustomJwtPayload>(token || '');

    response.cookies.set({
      name: 'email',
      value: decode.email
    });
  }  
 
  return response;
}