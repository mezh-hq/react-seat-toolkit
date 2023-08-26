import Primary from "./primary";

const Badge = ({ variant, children, ...props }) => {
  switch (variant ?? "primary") {
    default:
      return <Primary {...props}>{children}</Primary>;
  }
};

export default Badge;
