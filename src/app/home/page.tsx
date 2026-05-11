import FAQSection from "@/src/components/home/FAQs";
import { TopSelling } from "@/src/components/home/TopSelling";

export default function Home() {
  return (
    <div className="space-y-5">
      <TopSelling />
      <FAQSection />
    </div>
  )
}