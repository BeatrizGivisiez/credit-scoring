import { IconButton, Tooltip } from "@mui/material";

import { ButtonIconProps } from "./types";

import PALETTE from "@/styles/_palette";

export const ButtonIcon = ({
  placement,
  title,
  icon: Icon,
  onClick,
  sx,
  weight = "duotone"
}: ButtonIconProps) => {
  return (
    <Tooltip title={title} placement={placement}>
      <IconButton onClick={onClick} sx={sx}>
        <Icon
          size={24}
          style={{ cursor: "pointer" }}
          weight={weight}
          color={PALETTE.PRIMARY_MAIN}
        />
      </IconButton>
    </Tooltip>
  );
};
