import * as ToastPrimitives from "@radix-ui/react-toast";

export type ToastViewportElement = React.ElementRef<typeof ToastPrimitives.Viewport>;

export interface IToastViewportProps extends React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport> {}

export type ToastElement = React.ElementRef<typeof ToastPrimitives.Root>;

export interface IToastProps extends React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> {}

export type ToastActionElement = React.ElementRef<typeof ToastPrimitives.Action>;

export interface IToastActionProps extends React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action> {}

export type ToastCloseElement = React.ElementRef<typeof ToastPrimitives.Close>;

export interface IToastCloseProps extends React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close> {}

export type ToastTitleElement = React.ElementRef<typeof ToastPrimitives.Title>;

export interface IToastTitleProps extends React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title> {}

export type ToastDescriptionElement = React.ElementRef<typeof ToastPrimitives.Description>;

export interface IToastDescriptionProps extends React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description> {}
