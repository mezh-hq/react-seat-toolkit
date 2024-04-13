import * as React from "react";
import {
  Content,
  Icon,
  Item,
  ItemIndicator,
  ItemText,
  Portal,
  Root,
  ScrollDownButton,
  ScrollUpButton,
  Trigger,
  Value,
  Viewport
} from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react";
import { twMerge } from "tailwind-merge";

const Select = Root;

const SelectValue = Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof Trigger>,
  React.ComponentPropsWithoutRef<typeof Trigger>
>(({ className, children, ...props }, ref) => (
  <Trigger
    ref={ref}
    className={twMerge(
      "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    )}
    {...props}
  >
    {children}
    <Icon asChild>
      <ChevronsUpDown className="h-4 w-4 opacity-50" />
    </Icon>
  </Trigger>
));
SelectTrigger.displayName = Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof ScrollUpButton>
>(({ className, ...props }, ref) => (
  <ScrollUpButton
    ref={ref}
    className={twMerge("flex cursor-default items-center justify-center py-1", className)}
    {...props}
  >
    <ChevronUp />
  </ScrollUpButton>
));
SelectScrollUpButton.displayName = ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof ScrollDownButton>
>(({ className, ...props }, ref) => (
  <ScrollDownButton
    ref={ref}
    className={twMerge("flex cursor-default items-center justify-center py-1", className)}
    {...props}
  >
    <ChevronDown />
  </ScrollDownButton>
));
SelectScrollDownButton.displayName = ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof Content>,
  React.ComponentPropsWithoutRef<typeof Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <Portal>
    <Content
      ref={ref}
      className={twMerge(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <Viewport
        className={twMerge(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </Viewport>
      <SelectScrollDownButton />
    </Content>
  </Portal>
));
SelectContent.displayName = Content.displayName;

const SelectItem = React.forwardRef<React.ElementRef<typeof Item>, React.ComponentPropsWithoutRef<typeof Item>>(
  ({ className, children, ...props }, ref) => (
    <Item
      ref={ref}
      className={twMerge(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
        <ItemIndicator>
          <Check className="h-4 w-4" />
        </ItemIndicator>
      </span>
      <ItemText>{children}</ItemText>
    </Item>
  )
);
SelectItem.displayName = Item.displayName;

export { Select, SelectValue, SelectTrigger, SelectContent, SelectItem };
