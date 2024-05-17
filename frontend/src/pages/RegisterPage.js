import { Link } from "react-router-dom";
import React, { useState } from "react";
import useUserAPI from "../api/userAPI.js";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { register } = useUserAPI();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message on new submit
    console.log({ email, password });
    try {
      await register({ email, password });

      // Redirect to login page or show success message
    } catch (error) {
      console.error("Error registering user:", error.message);
      setError(error.message); // Set error message from API response
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register Now!</h1>
          <p className="py-6">
            Create an account to start managing your clinic's appointments,
            referrals, and payments seamlessly with ClinicAid.
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && (
              <div className="form-control mt-4">
                <span className="text-sm text-red-500">{error}</span>
              </div>
            )}
            <div className="form-control mt-4">
              <span className="text-sm text-neutral-500">
                Already have an account?{" "}
                <Link to="/login" className="text-primary">
                  Login here
                </Link>
              </span>
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
