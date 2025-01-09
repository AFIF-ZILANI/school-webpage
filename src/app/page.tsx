import Link from "next/link";
import { NoticePreview } from "@/components/notices/NoticePreview";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <StatsSection />
      <section className="py-16 bg-gray-50">
        <div className="container flex flex-col items-center">
          <div className="flex justify-around items-center mb-8 w-[100vw]">
            <h2 className="text-3xl font-bold">Latest Notices</h2>
            <Link 
              href="/notices"
              className="text-primary hover:underline"
            >
              View All Notices
            </Link>
          </div>
          <NoticePreview />
        </div>
      </section>
      <div className="flex justify-center">
      <FeaturesSection />
      </div>
    </main>
  );
}