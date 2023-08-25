import Primary from "./primary";

const Badge = ({ variant = "primary", children, ...props }) => {
  switch (variant) {
    default:
      return <Primary {...props}>{children}</Primary>;
  }
};

export default Badge;
