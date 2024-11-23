import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import MainWrapper from "@/components/wrappers/MainWrapper";
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
        <p className="text-3xl leading-8 font-bold text-primary">
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
          <div>
            
          </div>
        </MainWrapper>
      </div>
    </>
  );
}
