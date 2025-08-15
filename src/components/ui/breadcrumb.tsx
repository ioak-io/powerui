import { Breadcrumb as BreadcrumbPrimitive, BreadcrumbEllipsis as BreadcrumbEllipsisPrimitive, BreadcrumbItem as BreadcrumbItemPrimitive, BreadcrumbLink as BreadcrumbLinkPrimitive, BreadcrumbList as BreadcrumbListPrimitive, BreadcrumbPage as BreadcrumbPagePrimitive, BreadcrumbSeparator as BreadcrumbSeparatorPrimitive } from "@/components/ui-library/breadcrumb";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const Breadcrumb = BreadcrumbPrimitive
const BreadcrumbList = BreadcrumbListPrimitive
const BreadcrumbItem = BreadcrumbItemPrimitive
const BreadcrumbLink = BreadcrumbLinkPrimitive
const BreadcrumbPage = BreadcrumbPagePrimitive
const BreadcrumbSeparator = BreadcrumbSeparatorPrimitive
const BreadcrumbEllipsis = BreadcrumbEllipsisPrimitive

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}
