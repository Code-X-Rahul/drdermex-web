import Image from "next/image";
import { Button } from "./ui/button";
import MainWrapper from "./wrappers/MainWrapper";

const links = [
  {
    name: "About",
    url: "#",
  },
  {
    name: "Features",
    url: "#",
  },
  {
    name: "How it Works?",
    url: "#",
  },
  {
    name: "Support",
    url: "#",
  },
  {
    name: "Blog",
    url: "#",
  },
];

const Header = () => {
  return (
    <header className="py-4 primaryShadow  ">
      <MainWrapper className="flex items-center justify-between gap-3">
        <div>
          <Image
            layout="responsive"
            src={"/Logo.png"}
            alt="DrDermex logo"
            width={210}
            height={100}
          />
        </div>
        <ul className="list-none flex items-center gap-6">
          {links.map((link) => (
            <li
              key={link.name}
              className="text-text-primary text-sm leading-[19px]"
            >
              {link.name}
            </li>
          ))}
        </ul>
        <Button className="font-bold leading-6">
          <img src="/downlaod app.svg" alt="Download App" />
          Download App
        </Button>
      </MainWrapper>
    </header>
  );
};

export default Header;
