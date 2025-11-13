import React, { useContext, useState } from "react";
import { FaEye, FaStarOfLife } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";

const Login = () => {
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const { signInUser, setUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate()
  const location = useLocation()

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);
    signInUser(email, password)
      .then((result) => {
        e.target.reset();
        setUser(result.user);
        navigate(`${location.state ? location.state : "/"}`);
        console.log(user);
      })
      .catch((error) => setError(error));
  };

  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then(() => {
        navigate(location?.state || "/");
      })
      .catch((error) => setError(error.message));
  };

  return (
    <div className="w-full min-h-screen px-10 ">
      <div className=" rounded-2xl w-full h-screen flex gap-5 overflow-hidden p-6 shadow-2xl border border-zinc-200">
        <div className="bg-[url(https://images.unsplash.com/photo-1608320066644-cfe4ae0e8fa7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTYyfHxjYXJ8ZW58MHwxfDB8fHww)] bg-cover bg-center flex flex-col items-start justify-between w-1/2 h-full rounded-2xl p-5">
          <span className="bg-white text-sm rounded-full px-4 py-2">
            Rent-Wheels
          </span>
          <div className="text-white">
            <p className="text-xs ">You Can Easily</p>
            <h3 className="text-4xl w-4/5">
              Get accrss your personal hub for clarity and productivity.
            </h3>
          </div>
        </div>
        <div className=" w-1/2  h-full flex items-center justify-center rounded-2xl ">
          <div className="card w-4/5 h-full py-10 ">
            <div className="w-fit mb-3">
              <FaStarOfLife
                className="text-3xl text-[#ffe042] animate-spin duration-1000"
                style={{ animationDuration: "7s" }}
              />
            </div>
            <h1 className="text-5xl font-semibold text-start">
              Log In Your Account
            </h1>
            <p className="text-zinc-500 mt-2 text-sm text-start ">
              Access your lists, bookings and browse car anytime, anywhere and
              keep everything flowing in one place
            </p>
            <form onSubmit={handleSubmit}>
              <fieldset className="fieldset">
                <label className="mt-2 text-sm">Email</label>
                <input
                  type="email"
                  className="input w-full rounded-full"
                  name="email"
                  placeholder="Email"
                />
                <div className="relative gap-2 flex flex-col">
                  <label className="mt-2 text-sm">Create Password</label>
                  <input
                    type={show ? "text" : "password"}
                    className="input w-full rounded-full"
                    name="password"
                    placeholder="Password"
                  />
                  <span
                    onClick={() => setShow(!show)}
                    className="absolute top-12 right-5"
                  >
                    <FaEye className="text-lg" />
                  </span>
                </div>
                <div className="mt-2">
                  Have An Account?{" "}
                  <Link to="/Sign-up" className="text-blue-800 hover:underline">
                    Sign Up
                  </Link>
                </div>
                <button
                  type="submit"
                  className="btn btn-neutral rounded-full mt-2"
                >
                  Log In
                </button>
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="btn btn-primary rounded-full mt-4"
                >
                  Log In With Google
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
