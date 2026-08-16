import { Package } from "lucide-react";
import {
  SERVICES,
  getServiceIconName,
} from "@/data/services-data";

export {
  SERVICES,
  getServiceIconName,
};

export type { ServiceIconName } from "@/data/services-data";

export function getServiceIcon(name: string) {
  const iconName = getServiceIconName(name);

  if (!iconName) {
    return {
      icon: Package,
      color: "currentColor",
    };
  }

  return SERVICES[iconName];
}