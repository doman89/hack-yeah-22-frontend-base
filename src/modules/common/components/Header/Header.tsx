import {styled} from "@mui/material";
import {ReactNode} from "react";

type HeaderProps = {
    label?: ReactNode;
};

export function Header({ label }: HeaderProps) {
    return (
        <HeaderWrapper>
            {label}
        </HeaderWrapper>
    );
}

const HeaderWrapper = styled("h1")(({ theme }) => ({
    padding: theme.spacing(1, 1, 2, 0),
    borderBottom: "solid 1px #E8E8E8",
    margin: theme.spacing(0, 0, 2, 1),
    fontSize: '30px',
}));
