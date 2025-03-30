import { Link } from "@tanstack/react-router";
import clsx from "clsx";

const variantStyles = {
  primary:
    "bg-zinc-800 font-semibold text-zinc-100 hover:bg-zinc-700 active:bg-zinc-800 active:text-zinc-100/70 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:active:bg-zinc-700 dark:active:text-zinc-100/70",
  secondary:
    "bg-zinc-50 font-medium text-zinc-900 hover:bg-zinc-100 active:bg-zinc-100 active:text-zinc-900/60 dark:bg-zinc-800/50 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:active:bg-zinc-800/50 dark:active:text-zinc-50/70",
};

type LinkProps = {
  variant?: keyof typeof variantStyles;
  to: string;
} & React.ComponentPropsWithoutRef<typeof Link>;

type NativeButtonProps = {
  variant?: keyof typeof variantStyles;
  to?: undefined;
} & Omit<React.ComponentPropsWithoutRef<"button">, "type"> & {
    type?: "button" | "submit" | "reset";
  };

type ButtonProps = LinkProps | NativeButtonProps;

// Overload signatures
export function Button(props: LinkProps): JSX.Element;
export function Button(props: NativeButtonProps): JSX.Element;

export function Button(props: ButtonProps) {
  const combinedClassName = clsx(
    "inline-flex items-center gap-2 justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none",
    variantStyles[props.variant ?? "primary"],
    props.className,
  );

  console.log(combinedClassName);
  if ("to" in props && props.to !== undefined) {
    return <Link className={combinedClassName} {...props} />;
  } else {
    const { type = "button", ...buttonProps } = props as NativeButtonProps;
    return (
      <button type={type} className={combinedClassName} {...buttonProps} />
    );
  }
}
