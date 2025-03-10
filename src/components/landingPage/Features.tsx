import Image from "next/image";
import MainWrapper from "../wrappers/MainWrapper";
import { ImageCarousel } from "../ui/image-carousel";

const Features = () => {
  return (
    <MainWrapper className='py-10 px-6 lg:px-0 lg:pt-4 grid-col-1 grid md:grid-cols-2 gap-5'>
      <div className='flex items-center flex-col md:flex-row justify-center relative'>
        <Image
          src={"/screen2.png"}
          alt='screen 2'
          width={495}
          height={475}
          className='pointer-events-none  z-10 bg-transparent screen2Shadow'
        />
      </div>

      <div className='flex-col'>
        <p className='font-bold leading-8 mb-6 text-center text-secondary text-[40px]'>
          Key Features
        </p>
        <div className='grid grid-cols-1 basis-full gap-4'>
          <ImageCarousel />
        </div>
      </div>
    </MainWrapper>
  );
};

export default Features;
