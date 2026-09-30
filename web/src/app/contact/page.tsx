import { CallButton, Em, SectionLabel, SectionTitle, WaButton } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
      <SectionLabel>Contact</SectionLabel>
      <SectionTitle>
        Three ways to <Em>start.</Em>
      </SectionTitle>
      <p className="mt-3 max-w-xl text-muted">
        WhatsApp is fastest. Call if you prefer a voice. Or leave a note and we will follow up.
      </p>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        <div className="rounded-[1.25rem] border border-white/8 bg-espresso p-6">
          <h2 className="font-serif text-2xl text-ivory">WhatsApp</h2>
          <p className="mt-2 text-sm text-muted">Send a photo, room size or piece name.</p>
          <WaButton className="mt-6" pulse />
        </div>
        <div className="rounded-[1.25rem] border border-white/8 bg-espresso p-6">
          <h2 className="font-serif text-2xl text-ivory">Call</h2>
          <p className="mt-2 text-sm text-muted">{site.phoneDisplay}</p>
          <CallButton className="mt-6" />
        </div>
        <div className="rounded-[1.25rem] border border-white/8 bg-espresso p-6">
          <h2 className="font-serif text-2xl text-ivory">Visit / email</h2>
          <p className="mt-2 text-sm text-muted">
            {site.address}
            <br />
            {site.email}
            <br />
            {site.hours}
          </p>
        </div>
      </div>
    </div>
  );
}
