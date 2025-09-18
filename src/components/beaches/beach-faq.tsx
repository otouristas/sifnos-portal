import { HelpCircle, ChevronDown } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const BeachFAQ = () => {
  const faqs = [
    {
      question: "Which is the best beach for families on Sifnos?",
      answer: "Platy Gialos and Kamares are ideal for families thanks to their wide sandy shores, shallow waters, and full amenities."
    },
    {
      question: "Where can I find traditional pottery workshops?",
      answer: "Pottery lovers should visit Kamares, Faros, and Herronisos, where authentic workshops operate year-round."
    },
    {
      question: "Are there hiking trails starting from the beach villages?",
      answer: "Yes! Kamares, Faros, Vathi, and Platy Gialos all serve as trailheads for scenic routes across Sifnos."
    },
    {
      question: "What is the most famous church on Sifnos?",
      answer: "The Monastery of Panagia Chrysopigi is the island's most iconic religious site and patron saint, celebrated with a major annual festival."
    },
    {
      question: "Can I access Fykiada beach by car?",
      answer: "No, Fykiada is only reachable by foot or by boat, offering a serene, crowd-free experience."
    },
    {
      question: "Are there Blue Flag beaches on Sifnos?",
      answer: "Yes, Platy Gialos consistently earns the Blue Flag award for cleanliness, safety, and eco-friendliness."
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-background to-secondary/10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold flex items-center justify-center gap-2">
                <HelpCircle className="h-8 w-8 text-primary" />
                Frequently Asked Questions About Sifnos Beaches
              </CardTitle>
              <p className="text-muted-foreground mt-2">
                Everything you need to know about enjoying the beautiful beaches of Sifnos
              </p>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="space-y-2">
                {faqs.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="border border-border/50 rounded-lg px-4"
                  >
                    <AccordionTrigger className="text-left hover:text-primary transition-colors">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export { BeachFAQ };
