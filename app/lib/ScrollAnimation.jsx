"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const AosWrapper = ({ children }) => {
  useEffect(() => {
    AOS.init({
      duration: 1500,  // مدة الأنيميشن
      delay: 200,      // تأخير بدء الأنيميشن
      disable: function() {
        return window.innerWidth < 768; 
        // تعطيل AOS على الشاشات التي تكون أقل من 768px
      },
    });
  }, []);

  return <>{children}</>;
};

export default AosWrapper;
