import Link from "next/link";
import type { IUpdateLink } from "@/shared/link"; 

interface AboutPageProps {
  updateLink: IUpdateLink[];
}

export default function AboutPage({ updateLink }: AboutPageProps) {
  return (
    <div>
      {updateLink.map((link) => (
        <div key={link.label}>
          <Link
            href={link.href}
            target="_blank" 
            rel="noopener noreferrer"
          >
            {link.label}
          </Link>
        </div>
      ))}
    </div>
  );
}
