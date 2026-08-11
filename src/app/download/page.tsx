"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

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
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

  useEffect(() => {
    const ua = navigator.userAgent;
    const inWebView = isInstagramWebView();
    setIsWebView(inWebView);

    if (/iPad|iPhone|iPod/.test(ua)) {
      setDeviceType("ios");
      if (!inWebView) setRedirectUrl(APP_LINKS.ios);
    } else if (/android/i.test(ua)) {
      setDeviceType("android");
      if (!inWebView) setRedirectUrl(APP_LINKS.android);
    }
  }, []);

  const appStoreLink = deviceType === "ios" ? APP_LINKS.iosWebView : APP_LINKS.android;

  return (
    <>
      {redirectUrl && <meta httpEquiv="refresh" content={`0;url=${redirectUrl}`} />}
      <div className='flex-1 flex flex-col items-center justify-center p-8 text-center'>
        {deviceType === "desktop" ? (
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
        ) : isWebView ? (
          <>
            <h1 className='text-2xl font-bold mb-8'>Download DrDermX</h1>
            <a
              href={appStoreLink}
              className='flex items-center'
              style={{ height: "42px" }}
            >
              <Image
                src={deviceType === "ios" ? "/appstore.svg" : "/playstore.png"}
                alt={deviceType === "ios" ? "App Store" : "Google Play"}
                width={140}
                height={42}
                style={{ height: "42px", width: "auto" }}
              />
            </a>
          </>
        ) : (
          <>
            <h1 className='text-2xl font-bold mb-4'>
              {deviceType === "ios"
                ? "Redirecting to App Store..."
                : "Redirecting to Google Play Store..."}
            </h1>
            <p>
              If nothing happens,{" "}
              <Link href='/' className='text-primary underline'>
                click here
              </Link>{" "}
              to go back.
            </p>
          </>
        )}
      </div>
    </>
  );
}
