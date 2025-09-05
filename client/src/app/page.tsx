"use client";

import { useAppSelector } from "@/redux/hooks";

export default function Home() {
  const user  = useAppSelector((state) => state.auth.user);

  const displayName = user
    ? `${user.firstName} ${user.lastName}`
    : "Guest";

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1>Hello {displayName}</h1>
    </div>
  );
}
