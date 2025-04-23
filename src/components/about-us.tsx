import Image from "next/image";
import { Shield, Sparkles, Heart } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export default function AboutUsSection() {
  return (
    <section className='w-full py-16 bg-white'>
      <div className='container px-4 md:px-6 mx-auto'>
        {/* Section Header */}
        <div className='flex flex-col items-center text-center mb-12'>
          <h2 className='text-4xl font-bold tracking-tight text-secondary mb-4'>About Us</h2>
          <div className='w-20 h-1 bg-pink-400 rounded mb-6'></div>
        </div>

        {/* Main Content */}
        <div className='grid md:grid-cols-12 gap-8 items-center'>
          {/* Left Column - Image */}
          <div className='md:col-span-5'>
            <div className='relative flex justify-center'>
              <div className='absolute -top-4 -left-4 w-24 h-24 bg-pink-100 rounded-full z-0'></div>
              <Image
                src='/aboutus-img.png'
                width={400}
                height={500}
                alt='DrDermx AI Dermatology'
                className='rounded-lg shadow-md relative z-10'
              />
              <div className='absolute -bottom-4 -right-4 w-32 h-32 bg-pink-50 rounded-full z-0'></div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className='md:col-span-7 space-y-6'>
            <h3 className='text-2xl font-semibold text-secondary'>
              Expert skin care that&apos;s accessible, accurate, and affordable
            </h3>

            <p className='text-slate-700'>
              At DrDermx, we believe that expert skin care should be accessible, accurate, and
              affordable for everyone. Our platform combines advanced technology with the expertise
              of Medical Council registered Dermatologists.
            </p>

            {/* Feature Cards */}
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8'>
              <div className='bg-pink-50 p-4 rounded-lg'>
                <div className='w-10 h-10 bg-white rounded-full flex items-center justify-center mb-3'>
                  <Shield className='h-5 w-5 text-pink-500' />
                </div>
                <h4 className='font-medium text-secondary mb-1'>Reliable Diagnosis</h4>
                <p className='text-sm text-slate-600'>Image-based diagnosis with 98% accuracy</p>
              </div>

              <div className='bg-pink-50 p-4 rounded-lg'>
                <div className='w-10 h-10 bg-white rounded-full flex items-center justify-center mb-3'>
                  <Sparkles className='h-5 w-5 text-pink-500' />
                </div>
                <h4 className='font-medium text-secondary mb-1'>Personalized Care</h4>
                <p className='text-sm text-slate-600'>Customized treatment plans for your skin</p>
              </div>

              <div className='bg-pink-50 p-4 rounded-lg'>
                <div className='w-10 h-10 bg-white rounded-full flex items-center justify-center mb-3'>
                  <Heart className='h-5 w-5 text-pink-500' />
                </div>
                <h4 className='font-medium text-secondary mb-1'>Holistic Approach</h4>
                <p className='text-sm text-slate-600'>Diet and yoga consultations included</p>
              </div>
            </div>

            <p className='text-slate-700'>
              Whether you&apos;re dealing with acne, pigmentation, eczema, or fungal infections, we
              offer personalized treatment plans and expert consultations. DrDermx is trusted by
              dermatologists, general practitioners, and frontline health workers.
            </p>

            <div className='pt-2'>
              <Link
                href='#'
                className='inline-flex items-center justify-center rounded-md text-sm font-medium text-white shadow-sm'
              >
                <Button>Learn More</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
