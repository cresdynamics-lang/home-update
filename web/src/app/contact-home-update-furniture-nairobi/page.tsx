import type { Metadata } from "next";
import ContactPageContent from "@/app/contact/page";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("Contact Home Update Furniture in Nairobi", "Contact Home Update about furniture dimensions, finishes, delivery or current prices. Call 0743 844 362 or send your question on WhatsApp.", "/contact-home-update-furniture-nairobi/");

export default function ContactHomeUpdateNairobiPage() {
  return <ContactPageContent />;
}
