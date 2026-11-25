import { ButtonBase, type ButtonProps } from "./GoldButton";

export function OutlineButton(props: ButtonProps) {
  return <ButtonBase {...(props as Parameters<typeof ButtonBase>[0])} variant="outline" />;
}
