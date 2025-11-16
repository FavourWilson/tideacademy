import { NavLink, useNavigate } from "react-router"
import Input from "../Input"
import Sidebar from "./Sidebar"
import { useState } from "react"
import { Logo } from "../../assets"

const SignUp = () => {
  const navigate = useNavigate()
  const [email,setEmail] = useState("")
  const [name,setName] = useState("")
  const [phone,setPhone] = useState("")
  const [dob, setDob] = useState("")
  const [password,setPassword] = useState("")
  const [cpassword, setCpassword] = useState("")

  const handleSignUp =()=>{
    navigate('/otp')
  }
  return (
    <div className="w-full flex gap-20">
      <Sidebar />
      <div className="w-full lg:w-1/2 flex flex-col mt-5 gap-10 px-5">
        <div className="flex justify-between lg:justify-center items-center w-full mb-10 ">
          <NavLink to="/">
            <img src={Logo} alt="TIDE Academy" className="lg:hidden block w-30 h-20" />
          </NavLink>

          <div className="flex items-center gap-10">
            <NavLink to="/sign-in" className="active:border-b-primary-100 text-black font-poppins font-bold">
              Login
            </NavLink>
            <NavLink to="/sign-up" className="active:border-b-primary-100 text-black font-poppins font-bold">
              Signup
            </NavLink>
          </div>
        </div>
        <div className="flex flex-col gap-5 justify-center items-center">
          <Input type={"text"} value={name} onchange={(e)=>setName(e.target.value)} placeholder={"Fullname"} />
        <Input type={"text"} value={email} onchange={(e)=>setEmail(e.target.value)} placeholder={"Email Address"} />
        <Input type={"text"} value={phone} onchange={(e)=>setPhone(e.target.value)} placeholder={"Phone Number"} />
        <Input type={"dob"} value={dob} onchange={(e)=>setDob(e.target.value)} placeholder={"Date Of Birth"} />
        <Input type={"password"} value={password} onchange={(e)=>setPassword(e.target.value)} placeholder={"Password"} />
        <Input type={"password"} value={cpassword} onchange={(e)=>setCpassword(e.target.value)} placeholder={"Confirm Password"} />

        <button
          onClick={handleSignUp}
          type="button"
          className="bg-primary-100 border-none rounded-xl font-semibold font-poppins w-44 px-2 py-2 mt-5"
        >
          Sign Up
        </button>
        </div>
      </div>

    </div>
  )
}

export default SignUp