"use client";
import { useEffect } from "react";
import { useSearchParams, notFound } from "next/navigation";
import Link from "next/link";

const APP_LINKS = {
  ios: {
    patient: "https://apps.apple.com/in/app/drdermx/id6739869233",
    doctor: "https://apps.apple.com/in/app/drdermx/id6739869233",
  },
  android: {
    patient:
      "https://play.google.com/store/apps/details?id=com.drdermx.drdermx&pcampaignid=web_share",
    doctor:
      "https://play.google.com/store/apps/details?id=com.drdermx.drdermx_doctor&pcampaignid=web_share",
  },
};

const RegisterRedirector = () => {
  const searchParams = useSearchParams();
  const user = searchParams.get("user");

  useEffect(() => {
    if (user !== "doctor" && user !== "patient") return;
    const userAgent = typeof window !== "undefined" ? navigator.userAgent || navigator.vendor : "";
    if (/iPad|iPhone|iPod/.test(userAgent)) {
      window.location.href = APP_LINKS.ios[user];
    } else if (/android/i.test(userAgent)) {
      window.location.href = APP_LINKS.android[user];
    } else {
      // notFound();
    }
  }, [user]);

  if (user !== "doctor" && user !== "patient") {
    notFound();
    return null;
  }

  return (
    <div className='flex-1 flex flex-col items-center justify-center p-8 text-center'>
      <h1 className='text-2xl font-bold mb-4'>Redirecting you to the app store...</h1>
      <p>
        If nothing happens,{" "}
        <Link href='/' className='text-primary underline'>
          click here
        </Link>{" "}
        to go back.
      </p>
    </div>
  );
};

export default RegisterRedirector;
