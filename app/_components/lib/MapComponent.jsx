const MapWithMarker = ({ width, radius, className }) => {
  return (
    <>
      {/* map */}
      <div className="w-full mx-auto relative">
        <div style={{ maxWidth: `${width}` }} className="mx-auto">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d37282.025245702156!2d46.72438098059433!3d24.796705476103956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2efcfe88f3ac8d%3A0x4aa75e1c02fadc82!2zUkFGQTI4OTPYjCAyODkzINin2YTYtNmK2K4g2LnYqNiv2KfZhNmE2Ycg2KfZhNmF2K7YttmI2KjYjCA3MTk22Iwg2K3ZiiDYp9mE2YHZhNin2K3YjCDYp9mE2LHZitin2LYgMTMzMTTYjCDYp9mE2LPYudmI2K_Zitip!5e0!3m2!1sar!2seg!4v1733359246876!5m2!1sar!2seg"
            style={{ borderRadius: `${radius}` }}
            className={className}
            width="100%"
            height="450"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default MapWithMarker;
