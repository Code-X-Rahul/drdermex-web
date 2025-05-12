"use client";

import MainWrapper from "@/components/wrappers/MainWrapper";
import Image from "next/image";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { FaCheckCircle } from "react-icons/fa";
import Link from "next/link";
import { useScroll } from "@/context/ScrollContext";

const AppDownloadSection = () => {
  const { downloadSectionRef } = useScroll();

  return (
    <MainWrapper className='py-16'>
      <div ref={downloadSectionRef} className='grid md:grid-cols-2 gap-8'>
        <Card className='border-[1px] border-primary p-8'>
          <CardHeader>
            <div className='flex flex-col gap-2'>
              <Image src={"/Logo.png"} alt='DrDermex logo' width={180} height={100} />
              <span className='text-2xl font-semibold text-primary'>for Patients</span>
            </div>
          </CardHeader>
          <CardContent>
            <ul className='flex flex-col gap-3 my-4'>
              <li className='flex items-center gap-2 text-lg text-[#2B384C]'>
                <span className='text-primary'>
                  <FaCheckCircle />
                </span>
                Image-based diagnosis
              </li>
              <li className='flex items-center gap-2 text-lg text-[#2B384C]'>
                <span className='text-primary'>
                  <FaCheckCircle />
                </span>
                Book consultations
              </li>
              <li className='flex items-center gap-2 text-lg text-[#2B384C]'>
                <span className='text-primary'>
                  <FaCheckCircle />
                </span>
                Treatment tracking
              </li>
            </ul>
            <div className='flex gap-6 mt-8 items-center'>
              <Link
                target='_blank'
                href='https://apps.apple.com/in/app/drdermx/id6739869233'
                className='flex items-center'
                style={{ height: "42px" }}
              >
                <Image
                  src='/appstore.svg'
                  alt='App Store'
                  width={140}
                  height={42}
                  style={{ height: "42px", width: "auto" }}
                />
              </Link>
              <Link
                target='_blank'
                href='https://play.google.com/store/apps/details?id=com.drdermx.drdermx&pcampaignid=web_share'
                className='flex items-center'
                style={{ height: "42px" }}
              >
                <Image
                  src='/playstore.png'
                  alt='Google Play'
                  width={140}
                  height={42}
                  style={{ height: "42px", width: "auto" }}
                />
              </Link>
            </div>
          </CardContent>
        </Card>
        <Card className='border-[1px] border-primary shadow-md p-8'>
          <CardHeader>
            <div className='flex flex-col gap-2'>
              <Image src={"/Logo.png"} alt='DrDermex logo' width={180} height={100} />
              <span className='text-2xl font-semibold text-primary'>for Professionals</span>
            </div>
          </CardHeader>
          <CardContent>
            <ul className='flex flex-col gap-3 my-4'>
              <li className='flex items-center gap-2 text-lg text-[#2B384C]'>
                <span className='text-primary'>
                  <FaCheckCircle />
                </span>
                Diagnose and manage patients
              </li>
              <li className='flex items-center gap-2 text-lg text-[#2B384C]'>
                <span className='text-primary'>
                  <FaCheckCircle />
                </span>
                In-clinic & teleconsult support
              </li>
              <li className='flex items-center gap-2 text-lg text-[#2B384C]'>
                <span className='text-primary'>
                  <FaCheckCircle />
                </span>
                Manage appointments, history
              </li>
            </ul>
            <div className='flex gap-6 mt-8'>
              <Link href='#'>
                <Image
                  src='/appstore.svg'
                  alt='App Store'
                  width={140}
                  height={42}
                  style={{ height: "42px", width: "auto" }}
                />
              </Link>
              <Link
                target='_blank'
                href='https://play.google.com/store/apps/details?id=com.drdermx.drdermx_doctor&pcampaignid=web_share'
              >
                <Image src='/playstore.png' alt='Google Play' width={140} height={42} />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainWrapper>
  );
};

export default AppDownloadSection;
