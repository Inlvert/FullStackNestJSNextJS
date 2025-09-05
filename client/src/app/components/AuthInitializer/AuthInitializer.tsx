"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { refresh } from "@/redux/slices/authSlices";
import CONSTANTS from "@/constants";

export default function AuthInitializer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const refreshTokenFromLS = localStorage.getItem(CONSTANTS.REFRESH_TOKEN);
    if (refreshTokenFromLS) {
      dispatch(refresh(refreshTokenFromLS));
    }
  }, [dispatch]);

  return null;
}
