
'use client'
import useAuth from "@/hooks/useAuth";

const AllowedRoles = ({children}) =>{
    let {userToken} = useAuth() 


if (userToken ==null){

    return (<>

        not allowed
    </>)
}
  return (

    <>
 {children}
    </>
  ) 
}

export default AllowedRoles