import React from "react";
import MainWrapper from "./wrappers/MainWrapper";
import Image from "next/image";
import { Facebook, Instagram, Send, Twitter, Youtube } from "lucide-react";
import { links } from "./Header";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-secondary">
      <MainWrapper className="grid grid-cols-3 gap-5 py-14 ">
        <div className="grid gap-2.5">
          <Image
            src={"/footerLogo.svg"}
            alt="DrDermex logo"
            width={207}
            height={34}
          />
          <p className="text-white">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra
            nunc ante velit vitae. Est tellus vitae, nullam lobortis enim.
          </p>
          <div className="flex items-center divide-x-2 divide-white/10">
            <div className="p-2">
              <Facebook className="text-white hover:text-primary cursor-pointer" />
            </div>
            <div className="p-2">
              <Instagram className="text-white hover:text-primary cursor-pointer" />
            </div>
            <div className="p-2">
              <Twitter className="text-white hover:text-primary cursor-pointer" />
            </div>
            <div className="p-2">
              <Youtube className="text-white hover:text-primary cursor-pointer" />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <p className="uppercase text-2xl leading-[18px] text-white font-semibold">
            quick link
          </p>
          <ul className="list-none flex flex-col gap-3">
            {links.map((link) => (
              <Link href={link.url} key={link.name}>
                <li className="text-white font-medium">{link.name}</li>
              </Link>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-8">
          <div>
            <p className="font-semibold text-2xl leading-9 uppercase text-white">
              newsletter
            </p>
            <p className="text-white">
              Subscribe our newsletter to get our latest update & news
            </p>
          </div>
          <div className="relative max-w-fit">
            <input
              className="rounded-full h-[50px] w-[369px] px-5 placeholder:text-base placeholder:text-[#7D7D7D] focus-within:outline-primary"
              placeholder="Your email address"
            />
            <button className="bg-primary absolute size-[46px] text-white rounded-full p-2  right-1 top-1/2 -translate-y-1/2">
              <Send />
            </button>
          </div>
        </div>
      </MainWrapper>
    </footer>
  );
};

export default Footer;
