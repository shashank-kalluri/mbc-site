import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
}

const FAQ = ({ items }: FAQProps) => {
  return (
    <div className="max-w-2xl mx-auto py-12 px-6">
      {/* Header */}
      <h2 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[rgb(251,176,64)] to-orange-400 text-center">
        Frequently Asked Questions
      </h2>

      {/* Accordion Section */}
      <div className="mt-8">
        <Accordion type="single" collapsible className="space-y-4">
          {items.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-gray-800 rounded-lg overflow-hidden"
            >
              <AccordionTrigger className="w-full text-lg font-semibold text-left py-4 px-6 hover:text-[rgb(251,176,64)] transition duration-300">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 text-gray-400 border-gray-800">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default FAQ;
