import React from "react";
import MainWrapper from "../wrappers/MainWrapper";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    id: "1",
    title: "Scrambled it to make a type specimen book?",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    id: "2",
    title: "When an unknown printer took a galley of type?",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    id: "3",
    title: "Scrambled it to make a type specimen book?",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    id: "4",
    title: "Scrambled it to make a type specimen book?",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
];
const FAQ = () => {
  return (
    <MainWrapper className='py-[50px] px-6 lg:px-0 lg:pt-4 md:grid grid-cols-[40%,_1fr] gap-5'>
      <div className='text-secondary  border rounded-md flex flex-col justify-end gap-2 p-6'>
        <p className='text-[28px] leading-[44px] font-bold'>Frequently Asked Questions</p>
        <p>We would be happy to help you with whatever questions you have.</p>
        <Button className='max-w-fit ' size={"lg"}>
          Ask us Anything <ArrowRight />
        </Button>
      </div>
      <div className='px-6 lg:px-0 lg:pt-4'>
        <Accordion type='multiple'>
          {FAQS.map((faq) => (
            <AccordionItem value={faq.id} key={faq.id}>
              <AccordionTrigger className='font-bold text-secondary'>{faq.title}</AccordionTrigger>
              <AccordionContent className='text-sm text-secondary'>
                {faq.description}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </MainWrapper>
  );
};

export default FAQ;
