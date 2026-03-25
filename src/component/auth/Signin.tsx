import { NavLink, useNavigate } from "react-router";
import { Logo } from "../../assets";
import Input from "../Input";
import { useState, type ChangeEvent, type MouseEvent } from "react";
import { loginUser } from "../../services/authService";
import { useAuthStore } from "../../store/authStore";

const Signin = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleLogin = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      setError("");

      if (!email || !password) {
        setError("Email and password are required");
        return;
      }

      setLoading(true);

      const response = await loginUser({
        email,
        password,
      });

      setAuth(response.data.token, response.data.user);

      navigate("/dashboard");
    } catch (err: any) {
      setError(
        err?.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className="px-10 w-full">
      <div className="flex flex-col items-center">
        <div className="flex justify-between items-center w-full mb-10">
          <NavLink to="/">
            <img src={Logo} alt="TIDE Academy" className="w-30 h-20" />
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

        <div className="flex flex-col justify-center items-center gap-6 h-[50vh]">
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

          {error && (
            <p className="text-red-500 text-sm font-medium w-full max-w-md">
              {error}
            </p>
          )}

          <button
            onClick={handleLogin}
            type="button"
            disabled={loading}
            className="bg-primary-100 border-none rounded-xl font-semibold font-poppins w-44 px-2 py-2 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signin;