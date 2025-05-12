"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { useScroll } from "@/context/ScrollContext";
import dynamic from "next/dynamic";

const MobileMenu = dynamic(() => import("./navigation/mobile-menu"));

const Header = () => {
  const { scrollToDownload } = useScroll();

  return (
    <header className='bg-white shadow-md'>
      <nav className='mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8'>
        <div className='flex lg:flex-1'>
          <Link href='/' className='-m-1.5 p-1.5'>
            <Image src={"/Logo.png"} alt='DrDermex logo' width={210} height={100} />
          </Link>
        </div>

        <MobileMenu />

        <div className='hidden lg:flex lg:gap-x-12'>
          <Link href='/' className='text-sm font-semibold text-gray-900'>
            Home
          </Link>
          <Link href='/privacy-policy' className='text-sm font-semibold text-gray-900'>
            Privacy Policy
          </Link>
          <Link href='/terms-and-conditions' className='text-sm font-semibold text-gray-900'>
            TnC
          </Link>
          <Link href='/disclaimer-policy' className='text-sm font-semibold text-gray-900'>
            Disclaimer Policy
          </Link>
        </div>

        <div className='hidden lg:flex lg:flex-1 lg:justify-end'>
          <Button onClick={scrollToDownload} className='font-bold leading-6'>
            Download App
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
