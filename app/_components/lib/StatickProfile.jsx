import Link from "next/link";

export default function StaticBrochure({className}) {
  return (
    <div className="text-center mt-6">
      <Link
        href="/brouchures/profile.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        الذهاب لبروفايل الشركة
      </Link>
    </div>
  );
}
