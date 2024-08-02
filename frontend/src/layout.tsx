import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import {ReactNode} from "react";
import {Layout} from "lucide-react";

const MainLayout = ({children}: {children: ReactNode}) => {
    return (
        <>
            <Navbar/>
            <div className='flex'>
                <div className='hidden md:block h-[100vh]'>
                    <Sidebar/>
                </div>
                <div className='p-5 w-full md:max-w-[1140px]'>{children}</div>
            </div>
        </>
    );
}

export default MainLayout;