import Link from "next/link";
import { NoticePreview } from "@/components/notices/NoticePreview";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { ExamMarkSheetReviewer } from "@/components/results/marksheetShowCase";
// import { CreatorsHero } from "@/components/creators/CreatorsHero";
import { ImportantLinks } from "@/components/home/ImportantLinks";

export default function Home() {
    return (
        <main className="overflow-hidden">
            <HeroSection />
            <StatsSection />
            <section className="py-16 bg-gray-50">
                <div className="flex flex-col items-center">
                    <div className="flex justify-around items-center mb-8 w-[100vw]">
                        <h2 className="text-3xl font-bold">Latest Notices</h2>
                        <Link
                            href="/notices"
                            className="text-primary hover:underline"
                        >
                            View All Notices
                        </Link>
                    </div>
                    <div className="md:w-[70%]">
                        <NoticePreview />
                    </div>
                </div>
            </section>
            <ExamMarkSheetReviewer/>
            <ImportantLinks/>
            <div className="flex justify-center">
                <FeaturesSection />
            </div>
            {/* <CreatorsHero/> */}
        </main>
    );
}
