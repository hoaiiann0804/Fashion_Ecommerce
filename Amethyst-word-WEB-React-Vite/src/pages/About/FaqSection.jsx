import React from 'react';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "../../components/ui/Accordion/accordion"

const FaqSection = () => {
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-purple-800">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Everything you need to know about our fashion brand
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div>
          <Accordion type="single" collapsible={true} className="w-full">
            <AccordionItem value="item-1" className="border-purple-200">
              <AccordionTrigger className="text-purple-800 hover:text-fashion-purple-600">
                How do I care for your products?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                We provide specific care instructions for each item. Generally, we recommend gentle washing, avoiding bleach, and air drying when possible to preserve the quality and longevity of our products.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-purple-200">
              <AccordionTrigger className="text-purple-800 hover:text-fashion-purple-600">
                What are your shipping options?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                We offer standard shipping (3-5 business days), express shipping (1-2 business days), and international shipping options. Free shipping is available for orders over $100.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border-purple-200">
              <AccordionTrigger className="text-purple-800 hover:text-fashion-purple-600">
                Are your products sustainable?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Yes! Sustainability is at the core of our values. We use eco-friendly materials, ethical manufacturing processes, and minimize waste through efficient production methods.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div>
          <Accordion type="single" collapsible={true} className="w-full">
            <AccordionItem value="item-4" className="border-purple-200">
              <AccordionTrigger className="text-purple-800 hover:text-fashion-purple-600">
                What is your return policy?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                We offer a 30-day return policy for unworn items in original condition with tags attached. Returns are free for customers in the United States. International returns may incur a shipping fee.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5" className="border-purple-200">
              <AccordionTrigger className="text-purple-800 hover:text-fashion-purple-600">
                Do you offer customizations?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                For select items, we do offer customization options. Please contact our customer service team to discuss your specific requirements and we'll be happy to assist you.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6" className="border-purple-200">
              <AccordionTrigger className="text-purple-800 hover:text-fashion-purple-600">
                How can I track my order?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Once your order ships, you'll receive a confirmation email with a tracking number and link. You can also log into your account on our website to track your order status in real-time.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
