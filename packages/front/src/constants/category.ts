import { Category } from "../types/models"

export const CATEGORIES: { value: Category; label: string }[] = [
  { value: "japanese", label: "国語" },
  { value: "math", label: "算数" },
  { value: "science", label: "理科" },
  { value: "social_studies", label: "社会" },
  { value: "english", label: "英語" },
  { value: "toeic", label: "TOEIC" },
  { value: "toefle", label: "TOEFLE" },
]

const CATEGORY_LABELS: Record<Category, string> = {
  japanese: "国語",
  math: "算数",
  science: "理科",
  social_studies: "社会",
  english: "英語",
  toeic: "TOEIC",
  toefle: "TOEFLE",
}

export default CATEGORY_LABELS
