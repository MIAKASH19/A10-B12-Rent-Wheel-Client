import React, { useContext, useState } from "react";
import { FaEye } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";

const Register = () => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const { createUser, updateUser, setUser, signInWithGoogle } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation()

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photo = e.target.photoUrl.value;
    const email = e.target.email.value;
    const password = e.target.password.value;


    const passRegex = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;

    if (!passRegex.test(password)) {
      setError(
        "Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters."
      );
      return;
    }

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        updateUser({ displayName: name, photoURL: photo })
          .then(() => {
            const updatedUser = {
              name: name,
              email: email,
              image: photo,
            };
            fetch("https://rent-wheel-server-api.onrender.com/users", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(updatedUser),
            })
              .then((res) => res.json())
              .then((data) => {
                setUser({ ...user, displayName: name, photoURL: photo });
                navigate(location?.state || "/");
              });
          })
          .catch((error) => {
            setError(error);
            setUser(user);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        setError(errorCode);
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        setUser(user);

        const newUser = {
          name: user.displayName,
          email: user.email,
          image: user.photoURL,
        };

        fetch("https://rent-wheel-server-api.onrender.com/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        })
          .then((res) => res.json())
          .then((data) => {
            navigate("/");
          });
      })
      .catch((error) => setError(error.message));
  };

  return (
    <div className="w-full md:min-h-screen h-fit md:px-10 px-4 my-20">
      <div className=" rounded-2xl w-full md:h-screen h-full flex gap-5 overflow-hidden p-6 shadow-2xl border border-zinc-200">
        <div className="bg-[url(https://images.unsplash.com/photo-1618353482480-61ca5a9a7879?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fGNhcnxlbnwwfDF8MHx8fDA%3D)] bg-cover bg-bottom hidden lg:flex flex-col items-start justify-between w-1/2 h-full rounded-2xl p-5">
          <span className="bg-white text-sm rounded-full px-4 py-2">
            Rent-Wheels
          </span>
          <div className="text-white ">
            <p className="text-xs ">You Can Easily</p>
            <h3 className="text-4xl w-4/5">
              Get access your personal hub for clarity and productivity.
            </h3>
          </div>
        </div>
        <div className=" md:w-1/2 w-full h-full flex items-center justify-center rounded-2xl ">
          <div className="card md:w-4/5 w-full h-full pt-6 ">
            <h1 className="text-5xl font-semibold text-start">
              Create An Account
            </h1>
            <p className="text-zinc-500 mt-2 hidden lg:block text-sm text-start ">
              Access your lists, bookings and browse car anytime, anywhere and
              keep everything flowing in one place
            </p>
            <form onSubmit={handleSubmit}>
              <fieldset className="fieldset">
                <label className="mt-2 text-sm">Name</label>
                <input
                  type="text"
                  className="input w-full rounded-full"
                  name="name"
                  placeholder="Name"
                />
                <label className="mt-2 text-sm">Photo Url</label>
                <input
                  type="text"
                  className="input w-full rounded-full"
                  name="photoUrl"
                  placeholder="Photo Url"
                />
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
                  <Link to="/login" state={location?.state ? location.state : null} className="text-blue-800 hover:underline">
                    LogIn
                  </Link>
                </div>
                <button
                  type="submit"
                  className="btn btn-neutral rounded-full mt-2"
                >
                  Submit
                </button>
                <button
                  onClick={handleGoogleSignIn}
                  className="btn btn-primary rounded-full mt-4"
                >
                  Sign In with Google
                </button>
                {error && <p className="text-red-500 text-xs">{error}</p>}
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
