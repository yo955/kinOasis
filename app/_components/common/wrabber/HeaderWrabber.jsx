"use client";

import { usePathname } from "next/navigation";
import Header from "../Header";

export default function HeaderWrapper() {
  const pathname = usePathname();
  const isDashboard =
    pathname.startsWith("/dashpoard") || pathname.startsWith("/login");

  return !isDashboard ? <Header /> : null;
}
