import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "gold" | "outline";

type BaseProps = {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};
type AsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & { href?: undefined };
type AsLink = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & { href: string };

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-[15px] font-bold transition-transform duration-150 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-55";
const variants: Record<Variant, string> = {
  gold: "gold-gradient text-ink shadow-[0_8px_24px_-8px_rgb(240_177_0/0.55)]",
  outline: "border border-gold/40 bg-surface/70 text-white",
};

/** Tombol dasar untuk GoldButton dan OutlineButton (satu implementasi, PRD §9.5). */
export function ButtonBase(props: AsButton | AsLink) {
  const { variant = "gold", className, children } = props;
  const cls = cn(base, variants[variant], className);
  if (props.href !== undefined) {
    const { variant: _v, className: _c, children: _ch, href, ...rest } = props;
    void _v; void _c; void _ch;
    const external = /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        className={cls}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }
  const { variant: _v, className: _c, children: _ch, ...rest } = props;
  void _v; void _c; void _ch;
  return (
    <button type="button" className={cls} {...rest}>
      {children}
    </button>
  );
}

/** Props tombol tanpa `variant` (union di-omit secara distributif). */
export type ButtonProps =
  | Omit<AsButton, "variant">
  | Omit<AsLink, "variant">;

export function GoldButton(props: ButtonProps) {
  return <ButtonBase {...(props as AsButton)} variant="gold" />;
}
