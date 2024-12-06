"use client";

import { usePathname } from "next/navigation";
import Footer from "../Footer";

export default function FooterWrapper() {
  const pathname = usePathname();
  const isDashboard =
    pathname.startsWith("/dashpoard") || pathname.startsWith("/login");

  return !isDashboard ? <Footer /> : null;
}
