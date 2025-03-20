import Image from "next/image";
import MainWrapper from "../wrappers/MainWrapper";
import { Send } from "lucide-react";

import { FiFacebook, FiInstagram, FiTwitter, FiLinkedin } from "react-icons/fi";

import Link from "next/link";
import { FaWhatsapp, FaYoutube } from "react-icons/fa";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms and Conditions", href: "/terms-and-conditions" },
  { name: "Disclaimer Policy", href: "/disclaimer-policy" },
];

const socialMediaLinks = [
  {
    id: 1,
    Icon: FiInstagram,
    link: "https://www.instagram.com/dr_dermx/",
  },
  {
    id: 2,
    Icon: FiFacebook,
    link: "https://www.facebook.com/people/DrDermx/61573088566777/",
  },
  {
    id: 3,
    Icon: FiTwitter,
    link: "https://x.com/Derm_X",
  },
  {
    id: 4,
    Icon: FiLinkedin,
    link: "https://www.linkedin.com/company/drdermx/",
  },
  {
    id: 5,
    Icon: FaWhatsapp,
    link: "whatsapp://channel/0029Vb3mK8LIXnljxJ2ERc0C",
  },
  {
    id: 5,
    Icon: FaYoutube,
    link: "https://www.youtube.com/@DrDermx/",
  },
];

const Footer = () => {
  return (
    <footer className='bg-secondary '>
      <MainWrapper className='mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-0 lg:py-32'>
        <div className='xl:grid xl:grid-cols-3 xl:gap-8'>
          <div className='flex flex-col gap-2'>
            <Image src={"/footerLogo.svg"} alt='DrDermex logo' width={150} height={34} />
            <p className='text-white'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra nunc ante velit
              vitae. Est tellus vitae, nullam lobortis enim.
            </p>
            <div className='flex items-center divide-x-2 divide-white/10'>
              {socialMediaLinks.map((link) => (
                <Link key={link.id} href={link.link} target='_blank'>
                  <div className='p-2'>
                    <link.Icon className='text-white hover:text-primary text-2xl cursor-pointer' />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className='mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 xl:col-span-2 xl:mt-0'>
            <div className='md:grid md:grid-cols-1 md:gap-8'>
              <div>
                <h3 className='uppercase text-2xl leading-[18px] text-white font-semibold'>
                  quick links
                </h3>
                <ul role='list' className='mt-6 space-y-4'>
                  {quickLinks.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className='text-white font-medium'>
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className='md:grid md:grid-cols-1 md:gap-8'>
              <div className='flex flex-col gap-8'>
                <div>
                  <p className='font-semibold text-2xl leading-9 uppercase text-white'>
                    newsletter
                  </p>
                  <p className='text-white'>
                    Subscribe our newsletter to get our latest update & news
                  </p>
                </div>
                <div className='relative max-w-fit'>
                  <input
                    className='rounded-full h-[50px] w-[369px] px-5 placeholder:text-base placeholder:text-[#7D7D7D] focus-within:outline-primary'
                    placeholder='Your email address'
                  />
                  <button className='bg-primary absolute size-[46px] text-white rounded-full p-2  right-1 top-1/2 -translate-y-1/2'>
                    <Send />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainWrapper>
    </footer>
  );
};

export default Footer;
