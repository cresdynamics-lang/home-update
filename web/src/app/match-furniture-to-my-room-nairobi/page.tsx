import type { Metadata } from "next";
import MatchMyRoomPageContent from "@/app/match-my-room/page";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("Match Furniture to Your Room in Nairobi | Home Update", "Compare furniture finishes with your room palette and ask Home Update for help choosing sizes and finishes from a room photo or measurements.", "/match-furniture-to-my-room-nairobi/");

export default function MatchFurnitureToRoomNairobiPage() {
  return <MatchMyRoomPageContent />;
}
