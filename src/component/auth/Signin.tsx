import { NavLink } from "react-router" // Corrected import for React Router
import { Logo } from "../../assets"
import Input from "../Input"
import { useState, type ChangeEvent, type MouseEvent, } from "react"

const Signin = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const handleLogin = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    // Add your login logic here
  }

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  return (
    <div className="px-10 w-full">
      <div className="flex flex-col items-center">
        <div className="flex justify-between items-center w-full mb-10">
          <NavLink to="/">
            <img src={Logo} alt="TIDE Academy" className="w-30 h-20" />
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

        <div className="flex flex-col justify-center items-center gap-10 h-[50vh]">
          <Input
            type="text"
            placeholder="Email Address"
            value={email}
            onchange={handleEmailChange}
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onchange={handlePasswordChange}
          />

          <button 
            onClick={handleLogin} 
            type="button" 
            className="bg-primary-100 border-none rounded-xl font-semibold font-poppins w-44 px-2 py-2"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  )
}

export default Signin
