import Image from "next/image";
import SectionHeading from "./SectionHeading";

const CARDS = [
  {
    title: "Reliable diagnosis",
    text: "Image-based diagnosis with 98% accuracy, reviewed by a registered dermatologist.",
    img: "/aboutus-img.png",
    imgClass: "-bottom-16 right-6 w-[36%]",
  },
  {
    title: "Personalised care",
    text: "Prescriptions, skincare routines and follow-ups built around your skin — not a template.",
    img: "/Early_Detection.png",
    imgClass: "-bottom-14 -right-12 w-[72%]",
  },
  {
    title: "Holistic approach",
    text: "Diet and yoga guidance included, because skin health starts inside.",
    img: "/Health_Workers.png",
    imgClass: "-bottom-16 -right-10 w-[70%]",
  },
];

const CareCards = () => {
  return (
    <section className='relative z-10 -mt-12 rounded-t-[40px] bg-white pt-20 sm:pt-24'>
      <div className='mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10'>
        <SectionHeading eyebrow='Holistic approach' title='Expert skin care that’s accessible, accurate and affordable' />
        <div className='mt-10 grid gap-5 md:grid-cols-3'>
          {CARDS.map((c) => (
            <div key={c.title} className='relative h-[250px] overflow-hidden rounded-[20px] bg-cream p-7'>
              <p className='relative z-10 text-[22px] font-bold text-ink'>{c.title}</p>
              <p className='relative z-10 mt-2 max-w-[58%] text-[15px] leading-6 text-ink/70'>{c.text}</p>
              <Image
                src={c.img}
                alt=''
                aria-hidden
                width={400}
                height={500}
                className={`pointer-events-none absolute object-contain object-bottom ${c.imgClass}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareCards;
