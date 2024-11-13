import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { UserCredentials } from "types";

const LoginComponent: React.FC = () => {
  const [credentials, setCredentials] = useState<UserCredentials>({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(credentials.username, credentials.password);
      navigate("/home");
    } catch (error: any) {
      if (error.response) {
        // Display specific error messages based on status codes
        switch (error.response.status) {
          case 404:
            toast.error("User not found. Please check your username.");
            break;
          case 401:
            toast.error("Invalid password. Please try again.");
            break;
          default:
            toast.error("An unexpected error occurred. Please try again.");
        }
      } else {
        // Handle cases where response data is unavailable (network or other issues)
        toast.error("Network error. Please check your connection.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); 
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white border border-gray-300 rounded-lg shadow-md">
        <h1 className="mb-6 text-2xl font-bold text-center">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              placeholder="Username"
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="relative mb-4">
            {" "}
            <input
              type={showPassword ? "text" : "password"} 
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute text-gray-500 right-2 top-2"
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeSlash size={24} /> : <Eye size={24} />}{" "}
            </button>
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <Link to="/signup" className="text-blue-600 hover:underline">
            Already have an account? Login here.
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginComponent;
