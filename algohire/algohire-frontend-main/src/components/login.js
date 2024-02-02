"use client"

import { useForm } from "react-hook-form"
import ErrorMessage from "@/components/ErrorMessage";
import { useState  , useContext} from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import axios from 'axios'
import AuthContext  from "@/utils/context";
import  {useRouter} from 'next/navigation'
const Login = () =>{
    const [IsSendingData, setIsSendingData] = useState(false)
    const contextAutjj = useContext(AuthContext)
   
let {login}  = contextAutjj
    const router = useRouter()
    const {
      register,
      handleSubmit,
      formState: { errors },
      reset
    } = useForm({
      defaultValues:{
        email:'',
        password:''
      }
    })
  
    const onSubmit = async (values) =>{
      setIsSendingData(true)

        // converting email to smallcase
        values.email = values.email.toLowerCase()
  
        try{
            let response = await axios.post('https://algohire-backend.vercel.app/api/user/login',values ,{    validateStatus: function (status) {
              return status >= 200 && status <=500
          }})
            
            if (response.status == 200) {
              // redirect user
             // saving token to webstorage and updating auth  context
              login(response.data.token)
              router.replace('/')
            }
            else if (response.status == 400){
              toast.error('password invalid')
              reset()
            }
            else if (response.status ==   404){
              toast.error('user does not exist')
              reset()
            }
            else {
              toast.error("Internal server error")
            }
        }
        catch(err){
          toast.error('something went wrong')
          console.log(`Error   while  loging a user ${err}`)
        }
      setIsSendingData(false)
    } 

    return (
        <div className="shadow-md border-2" >
        <RenderUi  register={register} onSubmit={onSubmit} IsSendingData={IsSendingData} handleSubmit={handleSubmit} errors={errors} />
        </div>
    )                                                                                                                                 
}



const RenderUi = (props) => {
    const {register,handleSubmit,onSubmit ,IsSendingData ,errors} = props;
    return (
  
      <div className="flex flex-col gap-2 bg-white py-4 px-10">
          <div className="flex justify-center items-center flex-col my-5 "> 
            
              <h1 className="Captilize font-semibold text-2xl">  Algohire</h1>
              </div>
          <form className="flex flex-col gap-5 " onSubmit={handleSubmit(onSubmit)}>

              <div>
                  <input type="email"  {...register('email' , {required:{value:true,message:"Email is required"} ,})} className="outline-1 outline-gray-200 rounded p-2 outline-none hover:outline hover:outline-black hover:outline-1 focus:outline focus:outline-1 focus:outline-blue-500" placeholder="Enter mail" />
                  <ErrorMessage error={errors?.email} Field='email' type="required" />
              </div>
              <div className="flex flex-col gap-2">
                  <input {...register('password' , {required:{value:true, message:"password is required"},minLength:{value:8,message:"Minimum  8 characters is required"}})}  type="password" className=" outline-1 outline-gray-200 rounded p-2 outline-none hover:outline hover:outline-black hover:outline-1 focus:outline focus:outline-1 focus:outline-blue-500" placeholder="Enter password" />
                  <ErrorMessage error={errors?.password} Field='password' type="required" />
                <ErrorMessage error={errors?.password} Field='password' type="minLength" />
            </div>

              <div className=" bg-blue-500 text-white py-3 px-2 rounded-full text-center font-semibold hover:bg-blue-700">
                  <button type="submit" > {IsSendingData? 'verifiying Password ...':"Login in"}</button>
              </div>
          </form>
      </div>
    );
}
export default Login