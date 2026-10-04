import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your furniture shortlist | Home Update",
  alternates: { canonical: "https://homeupdate.co.ke/shortlist/" },
  robots: { index: false, follow: true },
};

export default function ShortlistLayout({ children }: LayoutProps<"/shortlist">) {
  return children;
}
