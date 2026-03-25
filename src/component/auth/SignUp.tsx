import { NavLink, useNavigate } from "react-router";
import Input from "../Input";
import Sidebar from "./Sidebar";
import { useState } from "react";
import { Logo } from "../../assets";
import { registerUser } from "../../services/authService";
import { useAuthStore } from "../../store/authStore";

const SignUp = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    try {
      setError("");

      if (!name || !email || !dob || !password || !cpassword) {
        setError("Please fill in all required fields");
        return;
      }

      if (password !== cpassword) {
        setError("Passwords do not match");
        return;
      }

      setLoading(true);

      const response = await registerUser({
        fullname: name,
        email,
        password,
        confirmPassword: cpassword,
        dateOfBirth: dob,
      });

      setAuth(response.data.token, response.data.user);

      console.log("Phone entered:", phone);

      navigate("/dashboard");
    } catch (err: any) {
      setError(
        err?.response?.data?.message || "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex gap-20">
      <Sidebar />
      <div className="w-full lg:w-1/2 flex flex-col mt-5 gap-10 px-5">
        <div className="flex justify-between lg:justify-center items-center w-full mb-10 ">
          <NavLink to="/">
            <img
              src={Logo}
              alt="TIDE Academy"
              className="lg:hidden block w-30 h-20"
            />
          </NavLink>

          <div className="flex items-center gap-10">
            <NavLink
              to="/sign-in"
              className="active:border-b-primary-100 text-black font-poppins font-bold"
            >
              Login
            </NavLink>
            <NavLink
              to="/sign-up"
              className="active:border-b-primary-100 text-black font-poppins font-bold"
            >
              Signup
            </NavLink>
          </div>
        </div>

        <div className="flex flex-col gap-5 justify-center items-center">
          <Input
            type="text"
            value={name}
            onchange={(e) => setName(e.target.value)}
            placeholder="Fullname"
          />
          <Input
            type="text"
            value={email}
            onchange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
          />
          <Input
            type="text"
            value={phone}
            onchange={(e) => setPhone(e.target.value)}
            placeholder="Phone Number"
          />
          <Input
            type="date"
            value={dob}
            onchange={(e) => setDob(e.target.value)}
            placeholder="Date Of Birth"
          />
          <Input
            type="password"
            value={password}
            onchange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <Input
            type="password"
            value={cpassword}
            onchange={(e) => setCpassword(e.target.value)}
            placeholder="Confirm Password"
          />

          {error && (
            <p className="text-red-500 text-sm font-medium w-full max-w-md">
              {error}
            </p>
          )}

          <button
            onClick={handleSignUp}
            type="button"
            disabled={loading}
            className="bg-primary-100 border-none rounded-xl font-semibold font-poppins w-44 px-2 py-2 mt-5 disabled:opacity-50"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;