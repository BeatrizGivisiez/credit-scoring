"use client";

import { Box, Button as MuiButton } from "@mui/material";
import { useRouter } from "next/navigation";

import { button } from "./styles";
import { ButtonProps } from "./types";

import PALETTE from "@/styles/_palette";

export const Button = ({
  label,
  iconEnd: IconEnd,
  iconStart: IconStart,
  href,
  onClick,
  navigateTo,
  disabled
}: ButtonProps) => {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    if (navigateTo) {
      router.push(navigateTo);
    }
  };

  return (
    <Box>
      <MuiButton
        sx={button}
        variant="contained"
        href={href}
        onClick={handleClick}
        startIcon={IconStart && <IconStart weight="regular" size={24} color={PALETTE.WHITE} />}
        endIcon={IconEnd && <IconEnd weight="regular" size={24} color={PALETTE.WHITE} />}
        disabled={disabled}
      >
        {label}
      </MuiButton>
    </Box>
  );
};
