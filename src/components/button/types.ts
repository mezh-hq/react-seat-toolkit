export interface IButtonCoreProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  loading?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export interface IButtonProps extends IButtonCoreProps {
  to?: string;
  wrapperClassName?: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
  ariaLabel?: string;
}
