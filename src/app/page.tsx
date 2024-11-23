import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import MainWrapper from "@/components/wrappers/MainWrapper";
import { ArrowRight, Check } from "lucide-react";
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

const BENEFITS = [
  {
    name: "Early Detection",
    description: "A proactive approach to skin health.",
  },
  {
    name: "Improved Outcomes",
    description: "Accelerate your skin's journey to wellness.",
    isDisabled: true,
  },
  {
    name: "Mass Screening",
    description: "A new era of accessible skincare.",
  },
  {
    name: "Empowered Healthcare Workers",
    description: "Empowering professionals, transforming lives.",
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <MainWrapper className="grid grid-cols-2 gap-10">
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

      <MainWrapper className="py-10 grid grid-cols-2 gap-5">
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
          <Image src={"/acneImage.svg"} width={260} height={283} alt="acne" />
        </div>
      </MainWrapper>

      <div className="bg-primary/10 py-10">
        <MainWrapper className="grid grid-cols-[40%,_1fr] gap-5">
          <div className="flex items-center justify-center ">
            <Image src={"/acneImage.svg"} width={260} height={283} alt="acne" />
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

      <MainWrapper className="py-10 grid grid-cols-2 gap-5">
        <div className="flex flex-col gap-8">
          <p className="text-[40px] font-bold text-secondary">Benefits</p>
          <div className="flex flex-col gap-4">
            {BENEFITS.map((benefit) => (
              <button
                disabled={benefit.isDisabled}
                className="px-4 py-4 flex items-center justify-between shadowLarge rounded-md border border-[#F5F5F5] disabled:border-primary group"
                key={benefit.name}
              >
                <div className="flex flex-col gap-2 items-start">
                  <p className="text-secondary text-xl leading-[17px] font-bold group-disabled:text-primary">
                    {benefit.name}
                  </p>
                  <p className="text-sm leading-5 text-tertiary">
                    {benefit.description}
                  </p>
                </div>
                <ArrowRight
                  className={"text-[#D9D9D9] group-disabled:text-primary"}
                  size={20}
                />
              </button>
            ))}
          </div>
        </div>
      </MainWrapper>
    </>
  );
}
