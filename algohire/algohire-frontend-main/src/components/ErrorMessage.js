const ErrorMessage = (props) =>{
    const { error, Field , type}  = props

    return (<div>
         <p className="text-sm text-red-500"> {error?.type == type ? error?.message:""} </p>
    </div>)
}

export default ErrorMessage;