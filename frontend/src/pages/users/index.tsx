import React, { useEffect, useState } from 'react';
import { GetServerSideProps, NextPageContext } from 'next';
import getUserCurrentEmail from '../../functions/getUserCurrentEmail';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface CustomJwtPayload {
  sub: string;
  email: string;
  userName: string;
}

export const getServerSideProps = async (context: NextPageContext) => {
  console.log(context?.req?.headers.cookie);

  const cookie = context?.req?.headers.cookie;
  const token = cookie?.split(';').find((c) => c.trim().startsWith('ff_token='))?.split('=')[1] || '';

  const decode = jwtDecode<CustomJwtPayload>(token);

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      email: decode.email || ''
    })
  });

  const data = await response.json();

  return {
    props: {
      data,
      emailA: decode.email
    }
  }
}

const PageUser: React.FC<any> = ({ data, emailA }) => {

  const handleClick = async (emailB: string) => {
    console.log({
      emailA,
      emailB
    });

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/follow`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        emailA,
        emailB
      })
    })
    
    if(!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    console.log(data);
    
    location.reload();
  }

  const checkFollow = (followedByB: any) => {
    return followedByB?.find((item: any) => item.email === emailA)
  }

  return (
    <>
      <div className="bg-slate-200 max-w-6xl p-6 shadow-lg h-screen flex justify-center" >
        {data && data?.users?.map((item: any, index: number) => (
          <>
            <div key={index} className="shadow-lg rounded-lg float-left h-16 m-3 p-4 bg-white flex gap-8 items-center w-70">
              <Avatar className='w-fitcontent'>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-left">
                <h2 className="text-lg font-bold">
                  {item?.userName}
                </h2>
                <h3 className="text-md">
                  {item?.email}
                </h3>
              </div>
              {!checkFollow(item.followedBy) ? (
                <button className="rounded-full bg-slate-200 text-center w-8 h-8 float-right font-bold text-xl hover:border-green-600 hover:border-1 hover:text-green-600"
                  onClick={() => handleClick(item.email)}
                >
                  +
                </button>
              ) : (
                <>
                  <div className="w-10 h-8 ml-2"></div>
                </>
              )}
              
            </div>
          </>
        ))}
      </div>
    </>
  );
}

export default PageUser;