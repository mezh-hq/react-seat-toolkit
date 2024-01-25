import * as AccordionPrimitive from "@radix-ui/react-accordion";

export type AccordionItemElement = React.ElementRef<typeof AccordionPrimitive.Item>;

export interface IAccordionItemProps extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> {}

export type AccordionTriggerElement = React.ElementRef<typeof AccordionPrimitive.Trigger>;

export interface IAccordionTriggerProps extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> {}

export type AccordionContentElement = React.ElementRef<typeof AccordionPrimitive.Content>;

export interface IAccordionContentProps extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> {
  containerClassName?: string;
}
