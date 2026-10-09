"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import PageCard from "@/components/wrappers/PageCard";

const HEADING = "text-[32px] font-bold leading-[1.12] tracking-[-0.5px] text-ink sm:text-[40px]";

const APP_LINKS = {
  ios: "https://apps.apple.com/in/app/drdermx/id6739869233",
  iosWebView: "https://gotoapp.store/drdermx",
  android:
    "https://play.google.com/store/apps/details?id=com.drdermx.drdermx&pcampaignid=web_share",
};

const isInstagramWebView = () => {
  if (typeof window === "undefined") return false;
  return /FBAN|FBAV|Instagram/.test(navigator.userAgent);
};

export default function Download() {
  const [deviceType, setDeviceType] = useState<"ios" | "android" | "desktop">("desktop");
  const [isWebView, setIsWebView] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent;
    const inWebView = isInstagramWebView();
    setIsWebView(inWebView);

    if (/iPad|iPhone|iPod/.test(ua)) {
      setDeviceType("ios");
      if (!inWebView) window.location.href = APP_LINKS.ios;
    } else if (/android/i.test(ua)) {
      setDeviceType("android");
      if (!inWebView) window.location.href = APP_LINKS.android;
      if (inWebView) window.location.href = APP_LINKS.android;
    }
  }, []);

  return (
    <PageCard className='max-w-[640px] text-center'>
      {deviceType === "desktop" ? (
        <>
          <h1 className={HEADING}>Download DrDermX</h1>
          <p className='mx-auto mb-8 mt-4 max-w-md text-[17px] leading-7 text-ink/70'>
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
          <p className='mt-10'>
            <Link href='/' className='text-[15px] font-bold text-rose underline-offset-4 hover:underline'>
              Go back to home
            </Link>
          </p>
        </>
      ) : isWebView && deviceType === "ios" ? (
        <>
          <h1 className={`${HEADING} mb-8`}>Download DrDermX</h1>
          <a
            href={APP_LINKS.iosWebView}
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
        </>
      ) : (
        <>
          <h1 className={`${HEADING} mb-4`}>
            {deviceType === "ios"
              ? "Redirecting to App Store..."
              : "Redirecting to Google Play Store..."}
          </h1>
          <p className='text-ink/70'>
            If nothing happens,{" "}
            <Link href='/' className='font-bold text-rose underline'>
              click here
            </Link>{" "}
            to go back.
          </p>
        </>
      )}
    </PageCard>
  );
}
