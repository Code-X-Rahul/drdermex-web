"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const APP_LINKS = {
  ios: "https://apps.apple.com/in/app/drdermx/id6739869233",
  android:
    "https://play.google.com/store/apps/details?id=com.drdermx.drdermx&pcampaignid=web_share",
};

export default function Download() {
  const [deviceType, setDeviceType] = useState<"ios" | "android" | "desktop">("desktop");

  useEffect(() => {
    const userAgent = typeof window !== "undefined" ? navigator.userAgent : "";
    if (/iPad|iPhone|iPod/.test(userAgent)) {
      setDeviceType("ios");
      window.location.href = APP_LINKS.ios;
    } else if (/android/i.test(userAgent)) {
      setDeviceType("android");
      window.location.href = APP_LINKS.android;
    }
  }, []);

  return (
    <div className='flex-1 flex flex-col items-center justify-center p-8 text-center'>
      {deviceType !== "desktop" ? (
        <>
          <h1 className='text-2xl font-bold mb-4'>
            {deviceType === "ios"
              ? "Redirecting you to App Store..."
              : "Redirecting you to Google Play Store..."}
          </h1>
          <p>
            If nothing happens,{" "}
            <Link href='/' className='text-primary underline'>
              click here
            </Link>{" "}
            to go back.
          </p>
        </>
      ) : (
        <>
          <h1 className='text-2xl font-bold mb-4'>Download DrDermX</h1>
          <p className='mb-8'>
            Download our app on your mobile device for the best experience.
          </p>
          <div className='flex gap-6 items-center justify-center'>
            <a
              href={APP_LINKS.ios}
              target='_blank'
              rel='noopener noreferrer'
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
            </a>
            <a
              href={APP_LINKS.android}
              target='_blank'
              rel='noopener noreferrer'
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
            </a>
          </div>
          <p className='mt-8'>
            <Link href='/' className='text-primary underline'>
              Go back to home
            </Link>
          </p>
        </>
      )}
    </div>
  );
}
