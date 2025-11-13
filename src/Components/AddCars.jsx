import React from "react";
import { Link } from "react-router";

const AddCars = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-zinc-100">
        <form onSubmit={handleSubmit} className="flex items-center gap-4 w-2/5 px-5 py-10 rounded-3xl bg-green-500">
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
                //   type={show ? "text" : "password"}
                className="input w-full rounded-full"
                name="password"
                placeholder="Password"
              />
              <span
                //   onClick={() => setShow(!show)}
                className="absolute top-12 right-5"
              >
                {/* <FaEye className="text-lg" /> */}
              </span>
            </div>
            <div className="mt-2">
              Have An Account?{" "}
              <Link to="/login" className="text-blue-800 hover:underline">
                LogIn
              </Link>
            </div>
            <button type="submit" className="btn btn-neutral rounded-full mt-2">
              Submit
            </button>
            {/* {error && <p className="text-red-500 text-xs">{error}</p>} */}
          </fieldset>
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
                //   type={show ? "text" : "password"}
                className="input w-full rounded-full"
                name="password"
                placeholder="Password"
              />
              <span
                //   onClick={() => setShow(!show)}
                className="absolute top-12 right-5"
              >
                {/* <FaEye className="text-lg" /> */}
              </span>
            </div>
            <div className="mt-2">
              Have An Account?{" "}
              <Link to="/login" className="text-blue-800 hover:underline">
                LogIn
              </Link>
            </div>
            <button type="submit" className="btn btn-neutral rounded-full mt-2">
              Submit
            </button>
            {/* {error && <p className="text-red-500 text-xs">{error}</p>} */}
          </fieldset>
        </form>
    </div>
  );
};

export default AddCars;
