import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      <div className="flex w-full justify-center px-16 h-16 items-center bg-white shadow-md">
        <div className="flex items-center gap-4 justify-center">
          <Link
            href="/contact?tab=general"
            className="text-black bg-white focus:outline-none"
          >
            <Image
              className="h-12 w-12"
              src="/images/Assets/mail.jpg"
              alt="Mail"
              quality={100}
              width={20}
              height={20}
            />
          </Link>
          <Link
            href="https://www.instagram.com/cahill_paul/?hl=en"
            className="text-black bg-white focus:outline-none"
          >
            <Image
              className="h-8 w-8"
              src="/images/Assets/instagram-icon.png"
              alt="Instagram"
              quality={100}
              width={20}
              height={20}
            />
          </Link>
        </div>
      </div>
    </>
  );
}
