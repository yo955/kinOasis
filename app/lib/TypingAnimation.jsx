"use client";
import React, { useEffect, useRef, useState } from "react";

const TypingAnimation = ({ shouldAnimate }) => {
  const textRef = useRef(null);
  const texts = ["عمرانى", "عصرى", "متكامل"];
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!shouldAnimate || !textRef.current) {
      return; // عدم بدء الأنيميشن إذا كان يجب عدم تشغيله أو العنصر غير موجود
    }

    let text = "";
    let typingInterval;

    const typeText = () => {
      if (text.length < texts[currentIndex].length) {
        text += texts[currentIndex][text.length]; // إضافة حرف واحد في كل مرة
        setDisplayedText(text);
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setDisplayedText(""); // إفراغ النص بعد تأخير
          setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length); // الانتقال للكلمة التالية
          text = ""; // إعادة تعيين النص
          typingInterval = setInterval(typeText, 200); // بدء الكتابة مرة أخرى
        }, 1000); // تأخير قبل البدء في الكتابة مرة أخرى
      }
    };

    typingInterval = setInterval(typeText, 200); // بدء الأنيميشن

    return () => {
      clearInterval(typingInterval); // تنظيف الأنيميشن عند إلغاء المكون
    };
  }, [shouldAnimate, currentIndex]); // مراقبة currentIndex

  return (
    <div className="flex">
      <h1 className="text-[3.5em] sm:text-[5em] lg:text-[8.5em] text-white mr-4 ">
        نمو
      </h1>
      <div
        ref={textRef}
        className="font-medium text-[3.5em] sm:text-[5em] lg:text-[8.5em] text-white font-sans"
      >
        {displayedText}
      </div>
    </div>
  );
};

export default TypingAnimation;
