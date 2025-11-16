import { Route, Routes } from "react-router"
import Homepage from "./component/Landingpage"
import AuthLayout from "./component/auth/AuthLayout"
import SignUp from "./component/auth/SignUp"
import OTP from "./component/auth/OTP"
import Signin from "./component/auth/Signin"



function App() {

  return (
   <Routes>
      <Route index element={<Homepage/>}/>
      <Route path="/sign-in" element={<Signin/>}/>
      <Route element={<AuthLayout/>}>
         <Route path="sign-up" element={<SignUp/>} />
         <Route path="otp" element={<OTP/>}/>
      </Route>
   </Routes>
  )
}

export default App
