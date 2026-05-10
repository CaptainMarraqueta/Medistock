import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion"

import { faqs } from "@/src/constants/defaultFAQs"

export default function FAQSection() {
  return (
    <div className="container p-4 md:p-8">
      
      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">
          Preguntas frecuentes
        </h2>
        <p className="text-muted-foreground text-sm">
          Información sobre el uso del sistema MediStock para gestión de medicamentos y stock.
        </p>
      </div>

      {/* ACCORDION */}
      <Accordion
        type="single"
        collapsible
        defaultValue="item-0"
        className="w-full space-y-2"
      >
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="border-b border-border/50"
          >
            <AccordionTrigger className="text-sm font-medium">
              {faq.question}
            </AccordionTrigger>

            <AccordionContent className="text-sm text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}