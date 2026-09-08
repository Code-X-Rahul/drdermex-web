import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaFacebookF, FaXTwitter, FaLinkedinIn, FaYoutube } from "react-icons/fa6";
import { APP_STORE_URL, PLAY_STORE_URL, DOCTOR_PLAY_STORE_URL, SOCIALS } from "@/constants/links";

const COLUMNS = [
  {
    title: "DrDermx",
    links: [
      { label: "Home", href: "/" },
      { label: "Start my diagnosis", href: "/diagnose" },
      { label: "Download the app", href: "/download" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms-and-conditions" },
      { label: "Disclaimer Policy", href: "/disclaimer-policy" },
      { label: "Delete my account", href: "/delete-account" },
    ],
  },
];

const SOCIAL_ICONS = { instagram: FaInstagram, facebook: FaFacebookF, x: FaXTwitter, linkedin: FaLinkedinIn, youtube: FaYoutube };

const Footer = () => {
  return (
    <footer className='bg-ink text-white'>
      <div className='mx-auto max-w-[1400px] px-6 pb-10 pt-16 sm:px-8 lg:px-10 lg:pt-20'>
        <div className='grid gap-12 lg:grid-cols-[1fr,1fr,1.6fr]'>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className='mb-5 text-[17px] font-bold'>{col.title}</p>
              <ul className='space-y-3.5'>
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className='text-[15px] text-white/80 hover:text-coral'>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className='lg:border-l lg:border-white/10 lg:pl-12'>
            <p className='text-xs font-extrabold uppercase tracking-[0.18em] text-white/60'>
              Experience the DrDermx mobile app
            </p>
            <div className='mt-4 flex flex-wrap gap-3'>
              <a href={PLAY_STORE_URL} target='_blank' rel='noreferrer'>
                <Image src='/playstore.png' alt='Google Play' width={130} height={40} className='h-10 w-auto' />
              </a>
              <a href={APP_STORE_URL} target='_blank' rel='noreferrer'>
                <Image src='/appstore.svg' alt='App Store' width={130} height={40} className='h-10 w-auto' />
              </a>
            </div>
            <p className='mt-4 text-sm text-white/60'>
              Are you a doctor?{" "}
              <a href={DOCTOR_PLAY_STORE_URL} target='_blank' rel='noreferrer' className='font-bold text-white underline underline-offset-4'>
                Get DrDermx for Professionals
              </a>
            </p>
            <div className='my-8 h-px bg-white/10' />
            <p className='max-w-md text-sm leading-6 text-white/70'>
              DrDermx is a dermatology platform providing fast, affordable, and expert-led skin
              diagnoses — combining image-based analysis with Medical Council registered
              dermatologists.
            </p>
            <p className='mt-4 text-sm text-white/50'>Registered Copyright {new Date().getFullYear()}</p>
          </div>
        </div>

        <div className='mt-16 flex flex-col gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-end sm:justify-between'>
          <div>
            <p className='mb-3 text-sm text-white/70'>Catch us on :</p>
            <div className='flex gap-4'>
              {SOCIALS.map(({ id, href }) => {
                const Icon = SOCIAL_ICONS[id];
                return (
                  <a key={id} href={href} target='_blank' rel='noreferrer' aria-label={id} className='text-white/80 hover:text-coral'>
                    <Icon className='size-6' />
                  </a>
                );
              })}
            </div>
          </div>
          <Image src='/footerLogo.svg' alt='DrDermx' width={170} height={28} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
