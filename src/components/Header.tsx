"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ScanFace, Smartphone, Home, FileText, ShieldCheck, Info, UserX } from "lucide-react";
import { FaWhatsapp, FaInstagram, FaFacebookF, FaXTwitter, FaLinkedinIn, FaYoutube } from "react-icons/fa6";
import { APP_STORE_URL, PLAY_STORE_URL, WHATSAPP_URL, SOCIALS } from "@/constants/links";

const MENU = [
  {
    title: "Get started",
    items: [
      { label: "Start my diagnosis", href: "/diagnose", Icon: ScanFace },
      { label: "Download the app", href: "/download", Icon: Smartphone },
      { label: "Chat on WhatsApp", href: WHATSAPP_URL, Icon: FaWhatsapp, external: true },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "Home", href: "/", Icon: Home },
      { label: "Privacy Policy", href: "/privacy-policy", Icon: ShieldCheck },
      { label: "Terms & Conditions", href: "/terms-and-conditions", Icon: FileText },
      { label: "Disclaimer Policy", href: "/disclaimer-policy", Icon: Info },
      { label: "Delete my account", href: "/delete-account", Icon: UserX },
    ],
  },
];

const SOCIAL_ICONS = { instagram: FaInstagram, facebook: FaFacebookF, x: FaXTwitter, linkedin: FaLinkedinIn, youtube: FaYoutube };

const Header = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className='sticky top-0 z-50'>
      <div className='hidden h-11 items-center justify-end gap-4 bg-white px-6 sm:flex lg:px-10'>
        <p className='text-[15px] text-ink'>Instant, dermatologist-verified results on the app</p>
        <Link
          href='/download'
          className='rounded-md bg-navy px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wide text-white'
        >
          Install app
        </Link>
      </div>

      <header className='bg-ink/95 backdrop-blur'>
        <nav className='flex h-[74px] items-center justify-between px-5 sm:px-8 lg:px-10'>
          <Link href='/' className='shrink-0'>
            <Image src='/footerLogo.svg' alt='DrDermx' width={150} height={25} priority />
          </Link>

          <div className='flex items-center gap-3 sm:gap-5'>
            <Link
              href='/diagnose'
              className='rounded-full bg-white px-5 py-2.5 text-[12px] font-extrabold uppercase tracking-wide text-ink transition hover:bg-coral sm:text-[13px]'
            >
              Start diagnosis
            </Link>
            <a
              href={WHATSAPP_URL}
              target='_blank'
              rel='noreferrer'
              aria-label='Chat on WhatsApp'
              className='hidden text-white sm:block'
            >
              <FaWhatsapp className='size-7' />
            </a>
            <button
              type='button'
              aria-label='Open menu'
              onClick={() => setOpen(true)}
              className='text-white'
            >
              <Menu className='size-7' />
            </button>
          </div>
        </nav>
      </header>

      {open && (
        <div className='fixed inset-0 z-[60] overflow-y-auto bg-white'>
          <div className='flex h-[74px] items-center justify-between border-b border-ink/10 px-5 sm:px-8 lg:px-10'>
            <Image src='/Logo.png' alt='DrDermx' width={140} height={24} />
            <button type='button' aria-label='Close menu' onClick={() => setOpen(false)}>
              <X className='size-7 text-ink' />
            </button>
          </div>

          <div className='mx-auto grid max-w-6xl gap-x-12 gap-y-10 px-6 py-12 md:grid-cols-3 lg:py-16'>
            {MENU.map((col) => (
              <div key={col.title}>
                <p className='mb-2 text-xs font-extrabold uppercase tracking-[0.18em] text-ink/40'>
                  {col.title}
                </p>
                <ul>
                  {col.items.map(({ label, href, Icon, external }) => (
                    <li key={label} className='border-b border-ink/10'>
                      <Link
                        href={href}
                        target={external ? "_blank" : undefined}
                        className='flex items-center gap-3 py-5 text-[15px] font-bold text-ink hover:text-rose'
                      >
                        <Icon className='size-5 text-ink/70' />
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <p className='mb-2 text-xs font-extrabold uppercase tracking-[0.18em] text-ink/40'>
                Get the app
              </p>
              <div className='flex gap-3 border-b border-ink/10 py-5'>
                <a href={PLAY_STORE_URL} target='_blank' rel='noreferrer'>
                  <Image src='/playstore.png' alt='Google Play' width={130} height={40} className='h-10 w-auto' />
                </a>
                <a href={APP_STORE_URL} target='_blank' rel='noreferrer'>
                  <Image src='/appstore.svg' alt='App Store' width={130} height={40} className='h-10 w-auto' />
                </a>
              </div>
              <div className='flex gap-3 py-6'>
                {SOCIALS.map(({ id, href }) => {
                  const Icon = SOCIAL_ICONS[id];
                  return (
                    <a
                      key={id}
                      href={href}
                      target='_blank'
                      rel='noreferrer'
                      aria-label={id}
                      className='flex size-11 items-center justify-center rounded-xl border border-ink/10 text-ink hover:border-coral hover:text-rose'
                    >
                      <Icon className='size-5' />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
