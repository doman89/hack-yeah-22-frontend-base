import { ElementType, ReactNode } from "react";
import styled from "styled-components";

export type SideMenuButtonProps = {
  children?: ReactNode;
  component?: ElementType;
  to?: string;
  onClick?(event: MouseEvent): void;
};

export function SideMenuButton({ children, component, ...restProps }: SideMenuButtonProps) {
  return (
    <Wrapper as={component} {...restProps}>
      <FlexCenter>{children}</FlexCenter>
    </Wrapper>
  );
}

const Wrapper = styled("button")(({ theme }) => ({
  width: "100%",
  height: 48,
  border: "1px solid #ffffff",
  color: "#ffffff",
  cursor: "pointer",

  "&:hover": {
    backgroundColor: "#aaaaaa",
  },
}));

const FlexCenter = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
});
