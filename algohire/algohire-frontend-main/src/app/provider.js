'use client'
import { AuthProvider } from "@/hooks/useAuth";
import { Toaster } from "react-hot-toast";
const Provider  =({children}) => {



    return (


        <>
   <Toaster />
      <AuthProvider>
      {children}

      </AuthProvider>

        </>
    )
}

export default Provider