import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      <div className="flex w-full justify-center px-8 md:px-16 h-10 bg-white sm:h-16 items-center shadow-md">
        <div className="flex items-center gap-4 justify-center">
          <Link
            href="/contact"
            className="text-black bg-white focus:outline-none"
          >
            <Image
              className="sm:h-12 h-8 w-8 sm:w-12"
              src="/images/Assets/mail.jpg"
              alt="Mail"
              quality={100}
              width={60}
              height={60}
            />
          </Link>
          <Link
            href="https://www.instagram.com/cahill_paul/?hl=en"
            target="_blank"
            className="text-black bg-white focus:outline-none"
          >
            <Image
              className="sm:h-8 sm:w-8 h-6 w-6"
              src="/images/Assets/instagram-icon.png"
              alt="Instagram"
              quality={100}
              width={60}
              height={60}
            />
          </Link>
          <Link
            href="https://www.facebook.com/AnnieSheaFaye"
            target="_blank"
            className="text-black bg-white focus:outline-none"
          >
            <Image
              className="sm:h-9 sm:w-9 w-7 h-[27px]"
              src="/images/Assets/facebook-icon.jpg"
              alt="Instagram"
              quality={100}
              width={60}
              height={60}
            />
          </Link>
          <Link
            href="https://www.flickr.com/photos/bochtan/"
            target="_blank"
            className="text-black bg-white focus:outline-none"
          >
            <Image
              className="sm:h-7 sm:w-20 h-6 w-14"
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
