import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      <div className="flex w-full justify-center px-16 h-16 items-center bg-white shadow-md">
        <div className="flex items-center gap-4 justify-center">
          <Link
            href="/contact"
            className="text-black bg-white focus:outline-none"
          >
            <Image
              className="h-12 w-12"
              src="/images/Assets/mail.jpg"
              alt="Mail"
              quality={100}
              width={60}
              height={60}
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
              width={60}
              height={60}
            />
          </Link>
          <Link
            href="https://www.facebook.com/AnnieSheaFaye"
            className="text-black bg-white focus:outline-none"
          >
            <Image
              className="h-9 w-9"
              src="/images/Assets/facebook-icon.jpg"
              alt="Instagram"
              quality={100}
              width={60}
              height={60}
            />
          </Link>
          <Link
            href="https://www.flickr.com/photos/bochtan/"
            className="text-black bg-white focus:outline-none"
          >
            <Image
              className="h-7 w-20"
              src="/images/Assets/flickr-icon.png"
              alt="Instagram"
              quality={100}
              width={60}
              height={60}
            />
          </Link>
        </div>
      </div>
    </>
  );
}
