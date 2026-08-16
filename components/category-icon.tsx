import {
  Tv,
  Briefcase,
  Palette,
  Code2,
  Music,
  Cloud,
  DollarSign,
  GraduationCap,
  HeartPulse,
  Tag,
  type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  entertainment: Tv,
  productivity: Briefcase,
  design: Palette,
  development: Code2,
  music: Music,
  cloud: Cloud,
  finance: DollarSign,
  education: GraduationCap,
  health: HeartPulse,
  other: Tag,
};

export function CategoryIcon({
  categoryId,
  className,
}: {
  categoryId: string;
  className?: string;
}) {
  const Icon = ICON_MAP[categoryId] ?? Tag;
  return <Icon className={className} />;
}