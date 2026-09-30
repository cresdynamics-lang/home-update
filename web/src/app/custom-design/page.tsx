import { CustomDesign, MatchRoom } from "@/components/home";

export const metadata = { title: "Custom Design" };

export default function CustomDesignPage() {
  return (
    <div id="match" className="pt-8">
      <CustomDesign />
      <MatchRoom />
    </div>
  );
}
