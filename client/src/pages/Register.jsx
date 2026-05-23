import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-[400px]">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Create Account
        </h1>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full border p-3 rounded-lg"
          />

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
            Register
          </button>
        </form>

        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-blue-500"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;