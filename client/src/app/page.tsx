"use client";

import { clearTokens } from "@/api";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/slices/authSlices";

export default function Home() {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const displayName = user ? `${user.firstName} ${user.lastName}` : "Guest";

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1>Hello {displayName}</h1>
      <button
        className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
        onClick={() => {
          dispatch(logout());
          clearTokens()
        }}
      >
        logOut
      </button>
    </div>
  );
}
