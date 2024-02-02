"use client";

import useAuth from "@/hooks/useAuth";
import Link from "next/link"
const  Layout = ( {children}) =>{



    return (<div className="bg-white relative">


        <Header  />

       <div>
       {children}
       </div>
    </div>)
}

const Header = () =>{

    let {userToken, logout} = useAuth() 

   
    return (
        <>
            <div className="sticky top-0  z-50 bg-white  w-full flex flex-row justify-between px-5 py-3 shadow-md items-center">

                <div className="text-2xl font-bold "> Algohire blog system</div>

                <div>

                    <ul> 
                      { userToken != null ?  <AdminMenu /> :  <li className="bg-blue-500 hover:bg-blue-600 py-2 rounded text-white font-bold px-5"> <Link href="/login"> Login</Link> </li>}
                    </ul>
                </div>
            </div>
        </>
    )
}



const AdminMenu = () =>{

    let {userToken, logout} = useAuth() 
    return (
        <>
            <ul className="flex  items-center gap-5">
                <li> <Link href={'/add'} className="uppercase hover:bg-green-700 bg-green-500 py-2 px-5 rounded-full text-white "> add </Link> </li>
                <li><button  className="rounded-full bg-sky-400 py-2 px-5 text-white font-semibold hover:bg-sky-600" onClick={() =>{logout()}}> logout </button></li>
            </ul>
        </>
    )
}
export default Layout