"use client";

import { Breadcrumbs as MuiBreadcrumbs, Typography } from "@mui/material";
import { CaretRight } from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { breadcrumb__icon, breadcrumb__link } from "./styles";
import { BreadcrumbsProps } from "./types";

import PALETTE from "@/styles/_palette";

export const Breadcrumbs = ({ breadcrumbs }: BreadcrumbsProps) => {
  const router = useRouter();

  const handleBreadcrumbClick = (href: string) => {
    if (href === window.location.pathname) {
      window.location.reload(); // Recarrega a página se clicar na rota atual
    } else {
      router.push(href); // Navega para a rota desejada
    }
  };

  return (
    <MuiBreadcrumbs separator={<CaretRight size={8} />} aria-label="breadcrumb">
      {breadcrumbs.map((item, index) => {
        const isFirst = index === 0;
        const isLast = index === breadcrumbs.length - 1;

        return isLast ? (
          <Typography key={item.key} color={PALETTE.PRIMARY_MAIN} sx={{ fontSize: "16px" }}>
            {item.label}
          </Typography>
        ) : (
          <Link
            style={breadcrumb__link}
            key={item.key}
            href={item.href}
            passHref
            onClick={(e) => {
              e.preventDefault();
              handleBreadcrumbClick(item.href);
            }}
          >
            <Typography sx={breadcrumb__icon}>{isFirst && item.icon}</Typography>
            <Typography color="inherit" sx={{ fontSize: "16px" }}>
              {item.label}
            </Typography>
          </Link>
        );
      })}
    </MuiBreadcrumbs>
  );
};
