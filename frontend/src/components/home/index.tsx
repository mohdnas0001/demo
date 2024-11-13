import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import ItemList from "./item-list";
import useAuthStore from "../../hooks/useAuthStore";
import { useAuth } from "../../context/auth-context";
import { SignOut } from "@phosphor-icons/react";
import Swal from "sweetalert2";

const Home = () => {
  const [currentDate, setCurrentDate] = useState<string>("");
  const username = useAuthStore((state) => state.username);
  const { logout } = useAuth();

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, log out!",
    });

    if (result.isConfirmed) {
      logout();
    }
  };

  useEffect(() => {
    const currentDateFormatted = format(new Date(), "PPpp");
    setCurrentDate(currentDateFormatted);
  }, []);

  return (
    <div className="p-2 md:p-10">
      <div className="flex flex-col items-start justify-between gap-2 p-2 mb-4 bg-gray-200 border border-gray-300 rounded-lg md:flex-row md:items-center md:h-24 md:p-10">
        <h1 className="text-xl font-bold md:text-2xl">Welcome, {username}</h1>
        <div className="flex flex-row items-center justify-between gap-2 md:gap-6">
          <span className="text-sm md:text-lg">{currentDate}</span>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center p-1 text-base text-white transition duration-200 bg-red-500 rounded-md shadow-lg md:p-2 hover:bg-red-600"
            aria-label="Logout"
          >
            <SignOut size={24} className="text-white" />
          </button>
        </div>
      </div>

      <div className="p-1 border border-gray-300 rounded-lg bg-light-gray md:p-4">
        <ItemList />
      </div>
    </div>
  );
};

export default Home;
