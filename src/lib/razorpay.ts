import { RAZORPAY_CHECKOUT_SCRIPT_URL } from "@/constants/api";
import type { RazorpaySuccessResponse } from "@/interfaces/payment";

const SCRIPT_ID = "razorpay-checkout-script";

export interface RazorpayCheckoutOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill?: { name?: string; contact?: string; email?: string };
  theme?: { color: string };
  handler: (response: RazorpaySuccessResponse) => void;
}

type RazorpayConstructor = new (
  options: RazorpayCheckoutOptions
) => { open: () => void };

/** Loads the Razorpay checkout script once per page; safe to call repeatedly. */
export const loadRazorpayScript = (): Promise<boolean> =>
  new Promise((resolve) => {
    if (document.getElementById(SCRIPT_ID)) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = RAZORPAY_CHECKOUT_SCRIPT_URL;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

/** Returns null if the script hasn't loaded yet — caller should show an error. */
export const openRazorpayCheckout = (options: RazorpayCheckoutOptions) => {
  const Razorpay = (window as Window & { Razorpay?: RazorpayConstructor })
    .Razorpay;
  if (!Razorpay) return null;

  const checkout = new Razorpay(options);
  checkout.open();
  return checkout;
};
