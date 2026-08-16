export type Category = {
  id: string;
  label: string;
};

const STORAGE_KEY = "subintel_categories";

const DEFAULT_CATEGORIES: Category[] = [
  { id: "entertainment", label: "Entertainment" },
  { id: "productivity", label: "Productivity" },
  { id: "design", label: "Design Tools" },
  { id: "development", label: "Development" },
  { id: "music", label: "Music" },
  { id: "cloud", label: "Cloud Storage" },
  { id: "finance", label: "Finance" },
  { id: "education", label: "Education" },
  { id: "health", label: "Health & Fitness" },
  { id: "other", label: "Other" },
];

export function getCategories(): Category[] {
  if (typeof window === "undefined") return DEFAULT_CATEGORIES;
  const raw = localStorage.getItem(STORAGE_KEY);
  const custom: Category[] = raw ? JSON.parse(raw) : [];
  return [...DEFAULT_CATEGORIES, ...custom];
}

export function addCategory(label: string): Category {
  const id = label.toLowerCase().trim().replace(/\s+/g, "-");
  const raw = localStorage.getItem(STORAGE_KEY);
  const custom: Category[] = raw ? JSON.parse(raw) : [];
  const newCat: Category = { id, label };
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...custom, newCat]));
  return newCat;
}