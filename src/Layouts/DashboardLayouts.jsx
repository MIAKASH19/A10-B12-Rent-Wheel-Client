import React, { useContext } from 'react'
import { Link, NavLink, Outlet } from 'react-router'
import { ThemeContext } from '../Context/ThemeContext'
import ThemeToggle from '../Components/ThemeToggle'
import { AuthContext } from '../Context/AuthContext'
import { LuLayoutDashboard } from 'react-icons/lu'
import Swal from 'sweetalert2'
import { MdAddCircleOutline, MdOutlineRateReview } from 'react-icons/md'
import { CalendarCheck } from 'lucide-react'
import { FaHome, FaRegListAlt } from 'react-icons/fa'
import { GoGear } from 'react-icons/go'

const DashboardLayouts = () => {
    const { dark } = useContext(ThemeContext)
    const { user, signOutUser } = useContext(AuthContext)

    const handleSignOut = () => {
        signOutUser()
            .then(() => {
                Swal.fire({
                    title: "Signed Out!",
                    text: "You have been successfully signed out.",
                    icon: "success",
                    confirmButtonText: "OK",
                });
            })
            .catch((err) => {
                Swal.fire({
                    title: "Error!",
                    text: "Something went wrong while signing out.",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            });
    };

    return (
        <div className='font-inter'>
            <div className="drawer lg:drawer-open ">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Navbar */}
                    <nav className="navbar w-full bg-base-300 dark:bg-zinc-900 z-99">
                        <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost dark:hover:bg-zinc-500 rounded-xl">
                            {/* Sidebar toggle icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block dark:text-white text-zinc-900  size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
                        </label>
                        <div className="navbar">
                            <div className="navbar-start dark:text-white text-zinc-900">
                                <Link to="/" className="sm:text-xl text-sm flex items-center gap-2 font-semibold">
                                    {dark ? (
                                        <img src="/dark-theme-logo.png" alt="Logo" className="w-fit h-10 object-contain" />
                                    ) : (
                                        <img src="/rent-wheels-logo.png" alt="Logo" className="w-fit h-10 object-contain" />
                                    )}
                                    Rent-Wheels
                                </Link>
                            </div>
                            <div className="navbar-end gap-4 text-zinc-800 lg:flex md:pr-0 pr-5">
                                <ThemeToggle></ThemeToggle>
                                {user ? (
                                    <div className="dropdown dropdown-bottom  dropdown-end">
                                        <div
                                            tabIndex={0}
                                            role="button"
                                            className=" w-10 h-10 rounded-full overflow-hidden"
                                        >
                                            <img src={user.photoURL} className="w-full h-full object-cover" />
                                        </div>
                                        <div
                                            tabIndex="-1"
                                            className="dropdown-content menu bg-white dark:bg-zinc-900 dark:text-white text-zinc-900 rounded-3xl z-1 w-52 p-4 shadow-xl border border-zinc-200"
                                        >
                                            <h1 className="opacity-80 mb-2 ">{user.displayName}</h1>
                                            <p className="border-b border-zinc-200 pb-2 text-xs">
                                                {user.email}
                                            </p>
                                            <Link to="/dashboard" className="flex items-center py-2 gap-2 hover:text-[#9fcc51] rounded-2xl mt-2">
                                                <LuLayoutDashboard />
                                                Dashboard</Link>
                                            <button
                                                onClick={handleSignOut}
                                                className="bg-[#A0BB70] text-white transition-all duration-300-2 rounded-3xl mt-3 py-2"
                                            >
                                                Sign Out
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <Link
                                        to={"/sign-up"}
                                        className="bg-[#A0BB70] rounded-full text-sm text-white hover:bg-black transition-all duration-300 px-4 py-2"
                                    >
                                        Sign In
                                    </Link>
                                )}
                            </div>
                        </div>

                    </nav>
                    {/* Page content here */}
                    <Outlet></Outlet>
                </div>

                <div className="drawer-side overflow-visible">
                    <label
                        htmlFor="my-drawer-4"
                        aria-label="close sidebar"
                        className="drawer-overlay"
                    ></label>

                    <div className="flex min-h-full flex-col items-center bg-neutral-100 dark:bg-zinc-900 is-drawer-close:w-20 is-drawer-open:w-56 transition-all duration-300 shadow-lg">
                        {/* Sidebar Logo */}
                        <div className="flex items-center justify-center w-full py-6">
                            <h1 className="text-xl font-bold text-[#9fcc51] hidden is-drawer-close:block">
                                RW
                            </h1>
                            <h1 className="text-2xl font-bold text-[#9fcc51] is-drawer-close:hidden">
                                Rent-Wheels
                            </h1>
                        </div>

                        {/* Menu */}
                        <ul className="menu w-full grow flex flex-col items-center gap-4 px-2">
                            {/* Home */}
                            <li>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-4 py-2 w-full rounded-full transition-all duration-300
                ${isActive
                                            ? "bg-[#9fcc51] text-white shadow-lg"
                                            : "text-gray-700 hover:bg-[#9fcc51]/30 hover:text-white"
                                        }`
                                    }
                                    data-tip="Homepage"
                                >
                                    <FaHome size={20} className="min-w-5" />
                                    <span className="is-drawer-close:hidden font-medium">
                                        Homepage
                                    </span>
                                </NavLink>
                            </li>

                            {/* My Bookings */}
                            <li>
                                <NavLink
                                    to="/dashboard/my-bookings"
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-4 py-2 w-full rounded-full transition-all duration-300
                ${isActive
                                            ? "bg-[#9fcc51] text-white shadow-lg"
                                            : "text-gray-700 hover:bg-[#9fcc51]/30 hover:text-white"
                                        }`
                                    }
                                    data-tip="My Bookings"
                                >
                                    <CalendarCheck size={20} className="min-w-5" />
                                    <span className="is-drawer-close:hidden font-medium">
                                        My Bookings
                                    </span>
                                </NavLink>
                            </li>

                            {/* My Listings */}
                            <li>
                                <NavLink
                                    to="/dashboard/my-listings"
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-4 py-2 w-full rounded-full transition-all duration-300
                ${isActive
                                            ? "bg-[#9fcc51] text-white shadow-lg"
                                            : "text-gray-700 hover:bg-[#9fcc51]/30 hover:text-white"
                                        }`
                                    }
                                    data-tip="My Listings"
                                >
                                    <FaRegListAlt size={20} className="min-w-5" />
                                    <span className="is-drawer-close:hidden font-medium">
                                        My Listings
                                    </span>
                                </NavLink>
                            </li>
                            {/* Add Car */}
                            <li>
                                <NavLink
                                    to="/dashboard/add-car"
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-4 py-2 w-full rounded-full transition-all duration-300
                ${isActive
                                            ? "bg-[#9fcc51] text-white shadow-lg"
                                            : "text-gray-700 hover:bg-[#9fcc51]/30 hover:text-white"
                                        }`
                                    }
                                    data-tip="Add Car"
                                >
                                    <MdAddCircleOutline size={20} className="min-w-[20px]" />
                                    <span className="is-drawer-close:hidden font-medium">
                                        Add Car
                                    </span>
                                </NavLink>
                            </li>
                        </ul>

                        {/* Bottom Info / Logout */}
                        <div className="mb-6 mt-auto w-full px-4">
                            <button className="w-full py-2 px-4 rounded-full bg-[#9fcc51] text-white font-medium hover:bg-[#A0BB70] transition-all duration-300 shadow-lg">
                                <GoGear />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardLayouts