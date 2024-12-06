import { FaMapMarkerAlt } from "react-icons/fa";

const MapWithMarker = () => {
  return (
    <div className="relative mb-28 w-full h-full">
      {/* Map */}
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28991.821517814935!2d55.254376!3d25.197197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f4341cb78c1af%3A0x5e69b0b77101b92b!2sBurj%20Khalifa!5e0!3m2!1sar!2sa!4v1699723125772!5m2!1sar!2sa&q=25.197197,55.274376"
        style={{ border: 0, width: "100%", height: "100%" }}
        className=" rounded-lg"
        loading="lazy"
      ></iframe>

      {/* Icons */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <FaMapMarkerAlt className="text-red-500 text-3xl md:text-4xl lg:text-5xl" />
      </div>
    </div>
  );
};

export default MapWithMarker;
