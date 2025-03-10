"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { HiBars4, HiXMark } from "react-icons/hi2";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

const MobileMenu = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const pathname = usePathname();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <div className='flex lg:hidden'>
      <button
        type='button'
        onClick={() => setMobileMenuOpen(true)}
        className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700'
      >
        <span className='sr-only'>Open main menu</span>
        <HiBars4 aria-hidden='true' className='size-6' />
      </button>

      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className='lg:hidden'>
        <div className='fixed inset-0 z-10' />
        <DialogPanel className='fixed inset-y-0 right-0 z-10 w-full bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10'>
          <div className='flex items-center justify-between'>
            <Link href='/'>
              <Image src={"/Logo.png"} alt='DrDermex logo' width={100} height={10} />
            </Link>
            <button
              type='button'
              onClick={() => setMobileMenuOpen(false)}
              className='-m-2.5 rounded-md p-2.5 text-gray-700'
            >
              <HiXMark aria-hidden='true' className='size-6' />
            </button>
          </div>
          <div className='mt-6'>
            <Link
              href='/'
              className='block py-2 text-base font-semibold text-gray-900 hover:bg-gray-50'
            >
              Home
            </Link>
            <Link
              href='/privacy-policy'
              className='block py-2 text-base font-semibold text-gray-900 hover:bg-gray-50'
            >
              Privacy Policy
            </Link>
            <Link
              href='/terms-and-conditions'
              className='block py-2 text-base font-semibold text-gray-900 hover:bg-gray-50'
            >
              TnC
            </Link>
            <Link
              href='/disclaimer-policy'
              className='block py-2 text-base font-semibold text-gray-900 hover:bg-gray-50'
            >
              Disclaimer Policy
            </Link>
          </div>
          <div className='py-3'>
            <Button className='font-bold leading-6'>Download App</Button>
          </div>
        </DialogPanel>
      </Dialog>
    </div>
  );
};

export default MobileMenu;
