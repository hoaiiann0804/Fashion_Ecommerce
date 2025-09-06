/** @file src/components/ui/Accordion/accordion.jsx */
import React from "react";

/**
 * Accordion component to wrap AccordionItems
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components (AccordionItems)
 * @param {"single" | "multiple"} props.type - Type of accordion behavior
 * @param {boolean} [props.collapsible=false] - Allow all items to be closed
 * @param {string} [props.className=""] - Additional CSS classes
 */
export const Accordion = ({ children, type, collapsible = false, className = "" }) => {
  return (
    <div className={`accordion accordion-${type} ${collapsible ? "accordion-collapsible" : ""} ${className}`}>
      {children}
    </div>
  );
};

/**
 * AccordionItem component to wrap Trigger and Content
 * @param {Object} props
 * @param {string} props.value - Unique identifier for the item
 * @param {React.ReactNode} props.children - Trigger and Content components
 */
export const AccordionItem = ({ value, children }) => {
  return <div className="accordion-item" id={value}>{children}</div>;
};

/**
 * AccordionTrigger component for toggling content
 * @param {Object} props
 * @param {React.ReactNode} props.children - Trigger content
 * @param {string} [props.className=""] - Additional CSS classes
 */
export const AccordionTrigger = ({ children, className = "" }) => {
  return <button className={`accordion-trigger ${className}`}>{children}</button>;
};

/**
 * AccordionContent component for collapsible content
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to display
 * @param {string} [props.className=""] - Additional CSS classes

 */
export const AccordionContent = ({ children, className = "" }) => {
  return <div className={`accordion-content ${className}`}>{children}</div>;
};
export default { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
