import { ReactNode } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";

interface LayoutProps {
  children: ReactNode
}

const Layout= ({ children }: LayoutProps) => {
  return (
    <>
      <div className="min-h-screen bg-slate-50 dark:bg-black dark:text-white">
        <Header/>
        <Sidebar/>
        <main className="max-w-6xl mx-auto">
          {children}
        </main>
      </div>      
    </>
  )
};


export default Layout;