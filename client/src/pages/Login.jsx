import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-[400px]">
        <h1 className="text-3xl font-bold mb-6 text-center">
          GrowthDesk
        </h1>

        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-3 rounded-lg"
          />

          <button
            className="w-full bg-black text-white p-3 rounded-lg"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-500"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;