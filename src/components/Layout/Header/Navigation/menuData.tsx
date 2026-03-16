import { HeaderItem } from "@/types/menu";

export const headerData: HeaderItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
  {
    label: "Developer Tools",
    href: "#",
    submenu: [
      { label: "Code Tools", href: "/code-tools" },
      // { label: "AI Tools", href: "/ai-tools" },
      { label: "Typing Test", href: "/typing" },
    ],
  },
  {
    label: "Resume Builder",
    href: "/resume-builder",
  },
  { label: "Interview Q&A", href: "/interview-questions" },
  { label: "Contact", href: "/contact" },
];