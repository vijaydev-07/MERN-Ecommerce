import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  // auth context se login function
  const { login } = useContext(AuthContext);

  // page redirect ke liye
  const navigate = useNavigate();

  // form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // UI states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // form submit handler
  const submit = async (e) => {
    e.preventDefault();
    setError("");

    // basic validation
    if (!email || !password) {
      setError("Email and password required");
      return;
    }

    // email clean + lowercase (safe practice)
    const normalizedEmail = email.trim().toLowerCase();

    try {
      setLoading(true);

      // login API call via context
      const res = await login(normalizedEmail, password);

      // success -> home page
      if (res?.success) {
        navigate("/");
      } else {
        setError(res?.message || "Invalid credentials");
      }
    } catch (err) {
      // unexpected error
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-14 max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Login</h2>

      {/* login form */}
      <form onSubmit={submit} className="flex flex-col gap-3">
        {/* email input */}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="px-3 py-2 border"
        />

        {/* password input */}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="px-3 py-2 border"
        />

        {/* error message */}
        {error && <p className="text-red-600 text-sm">{error}</p>}

        {/* submit button */}
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-black text-white disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* signup link */}
      <p className="text-sm mt-4">
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-600">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default Login;
