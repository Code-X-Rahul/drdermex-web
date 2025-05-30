"use client";

import React from "react";
import MainWrapper from "../wrappers/MainWrapper";
import { FaqSection } from "../blocks/faq";

const FAQs = [
  {
    id: "1",
    question: "What is DrDermx?",
    answer:
      "DrDermx is a dermatology platform that provides expert skin disease diagnosis and holistic skin health solutions. Our platform combines image-based assessments with consultations from Medical Council registered Dermatologists to offer accurate, personalized treatment plans.",
  },
  {
    id: "2",
    question: "How does DrDermx work?",
    answer:
      "DrDermx uses cutting edge technology to analyze skin images and provide a preliminary diagnosis. You can upload an image of your skin condition, and our system, along with experienced dermatologists, will assess it and provide expert recommendations, including treatment plans and lifestyle advice.",
  },
  {
    id: "3",
    question: "What skin conditions can DrDermx diagnose",
    answer: "DrDermx can assist with a wide range of skin conditions around 3000+ including:",
    listItems: [
      "Acne and acne scars, wrinkle, Hair loss",
      "Pigmentation issues (melasma, dark spots)",
      "Eczema and psoriasis",
      "Fungal infections (skin and nail)",
      "Phrynoderma (Vitamin A deficiency)",
      "Scabies, pellagra, and Hansen's disease",
      "Chronic urticaria (hives)",
    ],
  },
  {
    id: "4",
    question: "Are the doctors on DrDermx qualified?",
    answer:
      "Yes! All dermatologists on DrDermx are Medical Council registered Dermatologists who have completed MBBS with 2-3 years of MD/DNB or a Diploma in Skin and Venereal Diseases.",
  },
  {
    id: "5",
    question: "Is DrDermx only for individuals, or can doctors use it too?",
    answer:
      "DrDermx is designed for everyone. It can be used by individuals looking for expert dermatology care as well as general practitioners, other specialty doctors, and frontline health workers to assist in diagnosing and managing skin diseases.",
  },
  {
    id: "6",
    question: "Do I need an appointment to use DrDermx?",
    answer:
      "No, DrDermx provides instant analysis, and you can consult a dermatologist without the hassle of booking a traditional appointment.",
  },
  {
    id: "7",
    question: "Does DrDermx provide personalized treatment plans?",
    answer:
      "Yes, after diagnosis, our dermatologists provide personalized treatment plans, including prescriptions, skincare routines, and diet and yoga recommendations for holistic skin wellness.",
  },
  {
    id: "8",
    question: "Is DrDermx a replacement for in-person dermatology visits?",
    answer:
      "DrDermx is designed to provide convenient and expert skin health guidance, but for severe or complex cases, an in-person visit may still be necessary. Our platform helps in early detection, differential diagnosis, and effective management of common skin concerns.",
  },
  {
    id: "9",
    question: "How secure is my data on DrDermx?",
    answer:
      " We take privacy and security seriously. All your personal and medical information is encrypted and stored securely, ensuring confidentiality at every step.",
  },
  {
    id: "10",
    question: "How can I get started with DrDermx?",
    answer:
      "Simply visit our website, upload an image of your skin concern, and receive expert-driven analysis and guidance from qualified dermatologists. It’s fast, reliable, and easy to use.",
  },
];

const FAQ = () => {
  return (
    <MainWrapper className='py-[50px] px-6 lg:px-0 lg:pt-4 md:grid grid-cols-1 gap-5'>
      <FaqSection
        title='Frequently Asked Questions'
        description='We would be happy to help you with whatever questions you have'
        items={FAQs}
      />
    </MainWrapper>
  );
};

export default FAQ;
