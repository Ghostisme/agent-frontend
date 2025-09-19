import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@nexus/ui/lib/utils";
import { blueTheme } from "../../../themes/blue-theme";

type ButtonType = "default" | "primary" | "dashed" | "text" | "link";
type ButtonSize = "small" | "middle" | "large";
type ButtonShape = "default" | "round" | "circle";
// type ButtonVariant = "default" | "primary" | "destructive" | "outline" | "ghost" | "link"

type CommonProps = VariantProps<typeof buttonVariants> & {
  asChild?: boolean;
  type?: ButtonType;
  size?: ButtonSize;
  danger?: boolean;
  ghost?: boolean;
  block?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "start" | "end";
  shape?: ButtonShape;
  htmlType?: "button" | "submit" | "reset";
  className?: string;
  children?: React.ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type" | "className" | "children"> & {
    href?: never;
    target?: never;
    rel?: never;
  };

type ButtonAsAnchor = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50 focus-visible:ring-4 focus-visible:outline-1 aria-invalid:focus-visible:ring-0",
  {
    variants: {
      variant: {
        // default:
        //   "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90",
        // destructive:
        //   "bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90",
        // outline:
        //   "border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
        // primary:
        //   "bg-[var(--btn-bg)] text-[var(--btn-fg)] shadow-sm hover:bg-[var(--btn-hover)] active:bg-[var(--btn-active)]",
        // secondary:
        //   "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        // ghost: "hover:bg-accent hover:text-accent-foreground",
        // link: "text-primary underline-offset-4 hover:underline",
        default:
          "bg-[var(--nxs-color-bg-container)] text-[var(--nxs-color-text)] border border-[var(--nxs-color-border)] shadow-xs hover:border-[var(--nxs-color-primary-hover)]",
        primary:
          "bg-[var(--nxs-Button-color-primary,var(--nxs-color-primary))] text-[var(--nxs-color-text-light-solid)] shadow-sm hover:bg-[var(--nxs-color-primary-hover)] active:bg-[var(--nxs-color-primary-active)]",
        destructive:
          "bg-[var(--nxs-color-error,#ff4d4f)] text-[var(--nxs-color-text-light-solid)] shadow-xs hover:brightness-95",
        outline:
          "border border-[var(--nxs-color-border)] bg-[var(--nxs-color-bg-container)] hover:border-[var(--nxs-color-primary-hover)]",
        ghost: "bg-transparent text-[var(--nxs-color-text)] hover:bg-[color-mix(in_oklab,var(--nxs-color-primary),transparent_92%)]",
        link: "text-[var(--nxs-color-primary)] underline-offset-4 hover:underline",
      },
      size: {
        // default: "h-9 px-4 py-2 has-[>svg]:px-3",
        // sm: "h-8 rounded-md px-3 has-[>svg]:px-2.5",
        // lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        // icon: "size-9",
        default: "h-[var(--nxs-Button-control-height,36px)] px-4 py-2 has-[>svg]:px-3",
        sm: "h-[calc(var(--nxs-Button-control-height,36px)-4px)] rounded-md px-3 has-[>svg]:px-2.5",
        lg: "h-[calc(var(--nxs-Button-control-height,36px)+4px)] rounded-md px-6 has-[>svg]:px-4",
        icon: "size-[var(--nxs-Button-control-height,36px)]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = ({ className, asChild = false, ...props }: ButtonProps) => {
  const {
    // type: antType = "default",
    // size: antSize = "middle",
    type,
    size,
    danger,
    ghost,
    block,
    loading,
    icon,
    iconPosition = "start",
    shape = "default",
    href,
    target,
    htmlType = "button",
    children,
    variant, // 允许透传但会被 antd API 覆盖
    ...rest
  } = props as ButtonProps;

  const isLink = "href" in props && !!props.href;
  const isText = type === "text";
  const isDashed = type === "dashed";
  const isCircle = shape === "circle";
  const isRound = shape === "round";

  let mappedVariant: VariantProps<typeof buttonVariants>["variant"] = variant;
  if (isLink) mappedVariant = "link";
  else if (danger) mappedVariant = "destructive";
  else if (type === "primary") mappedVariant = "primary";
  else if (isDashed) mappedVariant = "outline";
  else mappedVariant = "default";

  const mappedSize: VariantProps<typeof buttonVariants>["size"] =
    isCircle ? "icon" : size === "small" ? "sm" : size === "large" ? "lg" : "default";

  const extra = [
    block && "w-full",
    (isRound || isCircle) && "rounded-full",
    isDashed && "border border-dashed",
    ghost && "bg-transparent text-current border border-current shadow-none",
    isText && "bg-transparent hover:bg-transparent shadow-none",
    loading && "cursor-not-allowed",
  ]
    .filter(Boolean)
    .join(" ");

  const classes = cn(
    buttonVariants({ variant: mappedVariant, size: mappedSize, className }),
    extra
  );

  // asChild: 让调用方自己提供元素（如 <a/> 或 <Link/>）
  if (asChild) {
    return (
      <Slot data-slot="button" className={classes} {...(rest as ButtonProps)}>
        {icon && iconPosition === "start" ? icon : null}
        {children}
        {icon && iconPosition === "end" ? icon : null}
        {loading ? (
          <svg aria-hidden="true" className="animate-spin ml-1 size-4" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" className="opacity-25" stroke="currentColor" strokeWidth="4" fill="none" />
            <path d="M4 12a8 8 0 018-8" className="opacity-75" fill="currentColor" />
          </svg>
        ) : null}
      </Slot>
    );
  }

  if (isLink) {
    const { href, target, rel, ...linkRest } = rest as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a
        data-slot="button"
        className={classes}
        href={href}
        target={target}
        rel={target === "_blank" ? "noreferrer noopener" : rel}
        {...linkRest}
      >
        {icon && iconPosition === "start" ? icon : null}
        {children}
        {icon && iconPosition === "end" ? icon : null}
        {loading ? (
          <svg aria-hidden="true" className="animate-spin ml-1 size-4" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" className="opacity-25" stroke="currentColor" strokeWidth="4" fill="none" />
            <path d="M4 12a8 8 0 018-8" className="opacity-75" fill="currentColor" />
          </svg>
        ) : null}
      </a>
    );
  }

  const buttonRest = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;
  const disabled = buttonRest.disabled || !!loading;

  // const inlineStyle = variant === "primary"
  //   ? ({
  //     ["--btn-bg" as any]: blueTheme.button.primary.background,
  //     ["--btn-fg" as any]: blueTheme.button.primary.foreground,
  //     ["--btn-hover" as any]: blueTheme.button.primary.hover,
  //     ["--btn-active" as any]: blueTheme.button.primary.active,
  //   } as React.CSSProperties)
  //   : undefined;
  return (
    <button
      data-slot="button"
      className={classes}
      type={htmlType}
      aria-disabled={disabled || undefined}
      disabled={disabled}
      {...buttonRest}
    >
      {icon && iconPosition === "start" ? icon : null}
      {children}
      {icon && iconPosition === "end" ? icon : null}
      {loading ? (
        <svg aria-hidden="true" className="animate-spin ml-1 size-4" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" className="opacity-25" stroke="currentColor" strokeWidth="4" fill="none" />
          <path d="M4 12a8 8 0 018-8" className="opacity-75" fill="currentColor" />
        </svg>
      ) : null}
    </button>
  );
}

export default Button

// function Button({
//   className,
//   variant,
//   size,
//   asChild = false,
//   ...props
// }: React.ComponentProps<"button"> &
//   VariantProps<typeof buttonVariants> & {
//     asChild?: boolean;
//   }) {
//   const Comp = asChild ? Slot : "button";

//   return (
//     <Comp
//       data-slot="button"
//       className={cn(buttonVariants({ variant, size, className }))}
//       {...props}
//     />
//   );
// }