import * as React from "react";

const variantClass = {
  default: "ui-button--default",
  destructive: "ui-button--default",
  outline: "ui-button--outline",
  secondary: "ui-button--outline",
  ghost: "ui-button--ghost",
  link: "ui-button--link",
  project: "ui-button--project",
} as const;

const sizeClass = {
  default: "",
  sm: "",
  lg: "ui-button--lg",
  icon: "ui-button--icon",
} as const;

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: keyof typeof variantClass;
  size?: keyof typeof sizeClass;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "default", asChild = false, children, ...props }, ref) => {
    const classes = ["ui-button", variantClass[variant], sizeClass[size], className].filter(Boolean).join(" ");

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        className: [classes, (children.props as { className?: string }).className].filter(Boolean).join(" "),
      });
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export { Button };
