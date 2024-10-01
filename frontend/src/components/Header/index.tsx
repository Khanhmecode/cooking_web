import { IoSearch } from "react-icons/io5";
import { Modal } from "antd";
import { useEffect, useState } from 'react';
import SignUp from "@/components/SignUp";
import SignIn from "@/components/SignIn";
import Cookies from "js-cookie";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import Link from 'next/link';

interface CustomJwtPayload {
  sub: string;      // Subject (usually user ID)
  email: string;    // Email
  userName: string; // User name
  exp?: number;     // Expiry date (optional)
  iat?: number;     // Issued at (optional)
  // Add other properties if needed
}

export default function Header() {
  const [openSignIn, setOpenSignIn] = useState<boolean>(false);
  const [openSignUp, setOpenSignUp] = useState<boolean>(false);
  const [openUserModal, setOpenUserModal] = useState<boolean>(false);

  const [token, setToken] = useState<string>('');

  useEffect(() => {
    const ff_token = Cookies.get('ff_token');
    if(ff_token) {
      setToken(ff_token);
    }
  }, [token]);

  const handleSignOut = () => {
    Cookies.remove('ff_token');
    setToken('');
    location.reload();
  }  
  
  return (
    <>
      <style>
        {
          `
            .ant-modal-content {              
              width: 100% !important;
              padding: unset !important;
              top: -8vh;
            }            
          `
        }
      </style>
      <div className="sticky p-5 top-0 z-10 shadow-md bg-white">
        <section className="flex flex-row items-center justify-center max-w-6xl mx-auto">
          <div className="w-1/3 flex flex-row items-center justify-left">
            <Link href="/" className="text-3xl font-bold text-left flex">
              <span className="mr-3 border-b-2 border-black pb-1">Flavor</span>
              <img src="/images/logo.png" alt="logo" className="w-10 h-10 scale-150" />
              <span className="ml-3 border-b-2 border-black pb-1">Fusion</span>
            </Link>
          </div>
          <nav className="w-1/3 flex flex-row gap-8 items-center justify-left group" aria-label="main">
            <Link href="/" id="home" className="w-1/3 text-center text-lg transition-all ease-linear duration-200 font-medium rounded-lg hover:bg-black hover:text-white p-2">Home</Link>
            <Link href="/create-post" id="recipes" className="w-1/3 text-center text-lg transition-all ease-linear duration-200 font-medium rounded-lg hover:bg-black hover:text-white p-2">Post</Link>
            <Link href="/users" id="users" className="w-1/3 text-center text-lg transition-all ease-linear duration-200 font-medium rounded-lg hover:bg-black hover:text-white p-2"             
            >Users
            </Link>
            <button className="text-xl transition-all ease-linear duration-200 font-medium hover:text-xl">
              <IoSearch />
            </button>
          </nav>

          <div className="w-1/3 flex flex-row items-center justify-end gap-6">
            {!token ? (
              <>
                <span className="rounded-full bg-black text-white p-2 text-center w-10 h-10 font-medium">
                  0
                </span>
                <button className="bg-gray-200 max-w-60 rounded-3xl p-2 px-5 text-center hover:scale-110 cursor-pointer transition-all duration-200 font-medium"
                  onClick={() => setOpenSignIn(true)}
                >
                  Log in
                </button>
                <button className="bg-black max-w-60 rounded-3xl p-2 px-5 text-center text-white hover:scale-110 cursor-pointer transition-all duration-200 font-medium"
                  onClick={() => setOpenSignUp(true)}
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar> 
                <button className="bg-black max-w-60 rounded-3xl p-2 px-5 text-center text-white hover:scale-110 cursor-pointer transition-all duration-200 font-medium"
                  onClick={handleSignOut}
                >
                  Sign out
                </button>                             
              </>
            )}
          </div>
        </section>
      </div>

      <Modal
        open={openSignUp}
        onCancel={() => setOpenSignUp(false)}
        footer={null}
        width={1100}
      >
        <SignUp />
      </Modal>

      <Modal
        open={openSignIn}
        onCancel={() => setOpenSignIn(false)}
        footer={null}
        width={1100}
      >
        <SignIn />
      </Modal>
    </>
  )
};


{/* <div className="bg-teal-700 text-white sticky top-0 z-10">
        <section className="max-w-4xl mx-auto flex justify-between p-4 items-center">
          <h1 className="text-3xl font-medium">
            <a href="/" className="">Cooking with me!</a>
          </h1>
          <div>
            <button id="mobile-open-button" className="text-3xl sm:hidden focus:outline-none">
              &#9776;              
            </button>
            <nav className="hidden sm:block space-x-8 text-xl" aria-label="main">
              <a href="#home" className="hover:opacity-90">Home</a>
              <a href="#blog" className="hover:opacity-90">Blog</a>
              <a href="#tutorials" className="hover:opacity-90">Tutorials</a>
              <a href="#contact" className="hover:opacity-90">Contact</a>              
            </nav>
          </div>
        </section>
      </div> */}