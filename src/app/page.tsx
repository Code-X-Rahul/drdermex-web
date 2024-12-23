import Benefits from "@/components/landingPage/Benefits";
import FAQ from "@/components/landingPage/FAQ";
import Features from "@/components/landingPage/Features";
import { Button } from "@/components/ui/button";
import MainWrapper from "@/components/wrappers/MainWrapper";
import { Check } from "lucide-react";
import Image from "next/image";

const PROBLEMS = [
  {
    icon: "/diseaseIcon2.svg",
    name: "Nutritional Deficiencies",
    width: 38,
    height: 34,
  },
  {
    icon: "/diseaseIcon.svg",
    name: "Underlying Diseases",
    width: 34,
    height: 34,
  },
  {
    icon: "/waterDrop.svg",
    name: "Dehydration",
    width: 28,
    height: 35,
  },
  {
    icon: "/backteria.svg",
    name: "Infections",
    width: 48,
    height: 34,
  },
];

export default function Home() {
  return (
    <>
      <MainWrapper className="grid md:grid-cols-2 gap-10">
        <div className="relative flex justify-center items-center ">
          <Image
            className="max-w-[480px] max-h-[460px] z-[1]"
            src={"/smiling_lady.png"}
            alt="smile"
            layout="responsive"
            width={480}
            height={460}
          />
          <div className="absolute -left-8 bottom-8">
            <Image
              className=""
              src={"/line.svg"}
              layout="responsive"
              width={235}
              height={91}
              alt="line"
            />
          </div>
        </div>
        <div className="flex flex-col gap-3 pt-16">
          <h3 className="text-secondary text-[56px] leading-[68px] font-bold">
            A Skin Health Revolution in India
          </h3>
          <p className="text-secondary font-medium text-xl leading-[34px]">
            AI Revolution, Image Diagnosis, 98% Accuracy, Cost Effective
          </p>
          <div className="flex items-center gap-5">
            <Button size={"lg"} className="text-base">
              Get Started
            </Button>
            <Button
              size={"lg"}
              variant={"ghost"}
              className="text-secondary h-auto font-bold text-base"
            >
              <Image
                layout="responsive"
                width={50}
                height={50}
                src={"/playIcon.svg"}
                alt="play icon"
              />
              Watch Video
            </Button>
          </div>
        </div>
      </MainWrapper>

      <div className="bg-primary/10 p-5 flex items-center justify-center ">
        <p className="text-3xl leading-8 font-bold text-primary text-center">
          SKIN A WINDOW TO BODY’S HEALTH
        </p>
      </div>

      <MainWrapper className="py-10 grid md:grid-cols-2 gap-5">
        <div className="grid gap-5">
          <p className="text-secondary text-2xl font-bold leading-[34px]">
            Skin reflects internal problems
          </p>
          <div className="grid grid-cols-2 gap-4">
            {PROBLEMS.map((problem) => (
              <div
                className="rounded-xl bg-secondary text-white p-4 flex flex-col justify-end gap-2"
                key={problem.name}
              >
                <Image
                  src={problem.icon}
                  alt={problem.name}
                  width={problem.width}
                  height={problem.height}
                />
                <p className="text-xl font-semibold">{problem.name}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Image
            src={"/acne.png"}
            width={260}
            height={283}
            alt="acne"
            className="rounded-[16px] acneShadow"
          />
        </div>
      </MainWrapper>

      <div className="bg-primary/10 py-10">
        <MainWrapper className="grid md:grid-cols-[40%,_1fr] gap-5">
          <div className="flex items-center justify-center ">
            <Image
              src={"/acne2.jpeg"}
              width={260}
              height={283}
              alt="acne"
              className="acneShadow w-[260px] h-[283px] object-cover rounded-[16px]"
            />
          </div>
          <div className="flex flex-col gap-8">
            <div className="grid gap-5">
              <p className=" text-2xl font-bold text-secondary leading-[17px]">
                Skin conditions reveal lifestyle issues:
              </p>
              <div className="grid grid-rows-3 grid-flow-col gap-4">
                <p className="text-secondary text-lg font-semibold leading-[17px] flex items-center gap-2">
                  <span className="size-[22px] p-1 rounded-full bg-secondary flex items-center justify-center">
                    <Check color="white" strokeWidth={4} />
                  </span>
                  Sun Damage
                </p>
                <p className="text-secondary text-lg font-semibold leading-[17px] flex items-center gap-2">
                  <span className="size-[22px] p-1 rounded-full bg-secondary flex items-center justify-center">
                    <Check color="white" strokeWidth={4} />
                  </span>
                  Allergies
                </p>
                <p className="text-secondary text-lg font-semibold leading-[17px] flex items-center gap-2">
                  <span className="size-[22px] p-1 rounded-full bg-secondary flex items-center justify-center">
                    <Check color="white" strokeWidth={4} />
                  </span>
                  Stress
                </p>
              </div>
            </div>
            <div className="grid gap-5">
              <p className=" text-2xl font-bold text-secondary leading-[17px]">
                Ignoring problems with skin can lead to the following:
              </p>
              <div className="grid grid-rows-3 grid-flow-col gap-4">
                <p className="text-secondary text-lg font-semibold leading-[17px] flex items-center gap-2">
                  <span className="size-[22px] p-1 rounded-full bg-secondary flex items-center justify-center">
                    <Check color="white" strokeWidth={4} />
                  </span>
                  Spread of Infection
                </p>
                <p className="text-secondary text-lg font-semibold leading-[17px] flex items-center gap-2">
                  <span className="size-[22px] p-1 rounded-full bg-secondary flex items-center justify-center">
                    <Check color="white" strokeWidth={4} />
                  </span>
                  Delayed Diagnosis
                </p>
                <p className="text-secondary text-lg font-semibold leading-[17px] flex items-center gap-2">
                  <span className="size-[22px] p-1 rounded-full bg-secondary flex items-center justify-center">
                    <Check color="white" strokeWidth={4} />
                  </span>
                  Emotional Impact
                </p>
                <p className="text-secondary text-lg font-semibold leading-[17px] flex items-center gap-2">
                  <span className="size-[22px] p-1 rounded-full bg-secondary flex items-center justify-center">
                    <Check color="white" strokeWidth={4} />
                  </span>
                  Worsening of Existing Conditions
                </p>
                <p className="text-secondary text-lg font-semibold leading-[17px] flex items-center gap-2">
                  <span className="size-[22px] p-1 rounded-full bg-secondary flex items-center justify-center">
                    <Check color="white" strokeWidth={4} />
                  </span>
                  Permanent Scarring
                </p>
              </div>
            </div>
          </div>
        </MainWrapper>
      </div>

      <div className="bg-primary p-5 flex items-center justify-center ">
        <p className="text-2xl leading-8 font-bold text-white text-center max-w-prose">
          Early diagnosis and treatment for skin issues can go a long way in
          protecting overall health and well-being especially in remote
          settings.
        </p>
      </div>

      <Benefits />

      <Features />
      <div className="bg-secondary text-white">
        <MainWrapper className="py-[100px] px-8 grid md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <p className="font-bold text-4xl text-inherit leading-[44px]">
                Data Insights for Patients, Doctors, and Healthcare
                Professionals
              </p>
              <p className="text-sm leading-6 text-inherit">
                Skin diseases affect millions globally and one third population
                in India. Traditional diagnostic methods are often invasive,
                inaccessible, or inaccurate, hindering early detection and
                treatment. Drdermx,{" "}
                <span className="font-bold underline cursor-pointer">
                  Read more
                </span>
              </p>
            </div>
            <div className="flex items-center gap-5">
              <div className="p-[14px] bg-white flex flex-col gap-3 rounded-[10px]">
                <div className="size-14 rounded-[14px] bg-primary flex items-center justify-center">
                  <img src={"/deepLearning.svg"} alt="icon" />
                </div>
                <p className="text-secondary text-xl font-bold leading-4">
                  Deep Learning
                </p>
                <p className="text-[#7D7D7D] text-xs font-medium leading-[10px]">
                  Powered imaging technology
                </p>
              </div>
              <div className="p-[14px] bg-white flex flex-col gap-3 rounded-[10px]">
                <div className="size-14 rounded-[14px] bg-primary flex items-center justify-center">
                  <img src={"/accuracy.svg"} alt="icon" />
                </div>
                <p className="text-secondary text-xl font-bold leading-4">
                  98%
                </p>
                <p className="text-[#7D7D7D] text-xs font-medium leading-[10px]">
                  Accurate results in seconds
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Image src={"/workFlow.svg"} width={404} alt="" height={360} />
          </div>
        </MainWrapper>
      </div>

      <FAQ />
    </>
  );
}
