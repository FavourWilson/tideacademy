import { Route, Routes } from "react-router"
import Homepage from "./component/Landingpage"
import AuthLayout from "./component/auth/AuthLayout"
import SignUp from "./component/auth/SignUp"
import OTP from "./component/auth/OTP"
import Signin from "./component/auth/Signin"
import Dashboard from "./pages/dashboard/Dashboard"
import Courses from "./pages/dashboard/Courses"
import MyCourses from "./pages/dashboard/MyCourse"
import Certificate from "./pages/dashboard/Certificate"
import Profile from "./pages/dashboard/Profile"



function App() {

  return (
   <Routes>
      <Route index element={<Homepage/>}/>
      <Route path="/sign-in" element={<Signin/>}/>
      <Route element={<AuthLayout/>}>
         <Route path="sign-up" element={<SignUp/>} />
         <Route path="otp" element={<OTP/>}/>
      </Route>
      
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/courses" element={<Courses/>} />
      <Route path="/my-course" element={<MyCourses/>} />
      <Route path="/certificate" element={<Certificate/>} />
      <Route path="/profile" element={<Profile/>} />


      <Route path="*" element={<h1>404 Not Found</h1>} />

   </Routes>
  )
}

export default App
