"use client"
// Todo //
import { useState } from 'react';

const WhatsAppButton = () => {
  const [showError, setShowError] = useState(false);

  // التعامل مع الضغط على الزر
  const handleWhatsAppClick = () => {
    const whatsappNumber = '+966553810363'; // استبدل الرقم
    if (whatsappNumber) {
      window.open(`https://wa.me/${whatsappNumber}`, '_blank');
    } else {
      setShowError(true);
    }
  };

  return (
    <div>
      <button onClick={handleWhatsAppClick} className="whatsapp-btn">
        تواصل عبر واتساب
      </button>

      {showError && (
        <div className="error-message">
          <span>الرقم غير متوفر</span>
          <button onClick={() => setShowError(false)}>إغلاق</button>
        </div>
      )}
    </div>
  );
};

export default WhatsAppButton;
