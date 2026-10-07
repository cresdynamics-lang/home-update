import type { Metadata } from "next";
import FaqPageContent from "@/app/faqs/page";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("Furniture FAQs | Prices, Delivery, Care & Room Fit", "Answers to common questions about furniture prices, room fit, custom options, fabrics, delivery and care. Confirm current product terms with Home Update.", "/furniture-faqs-prices-delivery-care/");

export default function FurnitureFaqsPage() {
  return <FaqPageContent />;
}
