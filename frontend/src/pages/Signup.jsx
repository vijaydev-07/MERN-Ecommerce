import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  // auth context se signup function
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  // form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ui states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // form submit handler
  const submit = async (e) => {
    e.preventDefault();
    setError("");

    // basic validation
    if (!name || !email || !password) {
      setError("Name, email and password required");
      return;
    }

    try {
      setLoading(true);

      // signup api call (context ke through)
      const res = await signup(name, email, password);

      if (res?.success) {
        // signup success → home page
        navigate("/");
      } else {
        setError(res?.message || "Signup failed");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-14 max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Sign Up</h2>

      <form onSubmit={submit} className="flex flex-col gap-3">
        {/* name */}
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="px-3 py-2 border"
        />

        {/* email */}
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="px-3 py-2 border"
        />

        {/* password */}
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
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
          {loading ? "Creating..." : "Sign Up"}
        </button>
      </form>

      {/* redirect to login */}
      <p className="text-sm mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Signup;
