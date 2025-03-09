import Image from "next/image";
import MainWrapper from "../wrappers/MainWrapper";

const FEATURES = [
  { name: "Skin Mapping", icon: "/skinMap.svg" },
  {
    name: "Tele-Dermatology",
    icon: "/teleDerma.svg",
  },
  {
    name: "Performance Metrics",
    icon: "/perfMetric.svg",
  },
  {
    name: "Evolution Tracking",
    icon: "/evolutionTrack.svg",
  },
  {
    name: "Referral network",
    icon: "/refer.svg",
  },
  {
    name: "Patient Portal",
    icon: "/patientPortal.svg",
  },
];

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
        {/* screen2Shadow */}
      </div>

      <div className='flex flex-col gap-6'>
        <p className='font-bold leading-8 text-secondary text-[40px]'>Key Features</p>
        <div className='grid grid-cols-2 gap-4'>
          {FEATURES.map((feature) => (
            <div
              className='flex flex-col md:flex-row px-5 py-6 items-center gap-3 shadowSmall border border-[#F5F5F5] rounded-[10px]'
              key={feature.name}
            >
              <div className='size-14 rounded-[14px] bg-primary flex items-center justify-center'>
                <Image width={100} height={100} src={feature.icon} alt='icon' />
              </div>
              <p className='text-base text-center text-secondary font-bold leading-5'>
                {feature.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </MainWrapper>
  );
};

export default Features;
