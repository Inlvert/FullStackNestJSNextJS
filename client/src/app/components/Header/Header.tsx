"use client";

import { usePathname } from "next/navigation";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link as HeroLink,
} from "@heroui/react";

const AcmeLogo = () => (
  <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
    <path
      clipRule="evenodd"
      d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

export default function Header() {
  const pathName = usePathname();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/login", label: "Login" },
    { href: "/registration", label: "Registration" },
  ];

  return (
    <Navbar>
      <NavbarBrand>
        <HeroLink
          href="/"
          color={pathName === "/" ? "primary" : "foreground"}
          className="flex items-center gap-2"
        >
          <AcmeLogo />
          <p className="font-bold text-inherit text-cyan-400">AUTH</p>
        </HeroLink>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {navItems.map((item) => (
          <NavbarItem key={item.href}>
            <HeroLink
              href={item.href}
              color={pathName === item.href ? "primary" : "foreground"}
            >
              {item.label}
            </HeroLink>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <HeroLink
            href="/registration"
            color={pathName === "/registration" ? "primary" : "foreground"}
          >
            Sign Up
          </HeroLink>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
