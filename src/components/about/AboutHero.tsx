"use client";

import { motion } from "framer-motion";

export function AboutHero() {
    return (
        <section className="relative bg-gradient-to-b from-primary/10 to-background py-24">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl mx-auto text-center"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        Our Story
                    </h1>
                    <p className="text-[1rem] leading-6 px-3  md:text-xl text-muted-foreground">
                        Raigaon High School is the academic institute's official
                        name, as recognised with the education authority. The
                        institute's native or alternate name is রাইগাঁও উচ্চ
                        বিদ্যালয়, which is commonly used in local Bengali
                        contexts. The Directorate of Secondary and Higher
                        Education has granted this institute a unique
                        Educational Institute Identification Number (EIIN) of
                        123336. The institute was formed on January 1, 1946,
                        marking the start of its educational career. The
                        institute has been officially recognised by the
                        competent authorities as Recognised. The institute
                        obtained official recognition on January 1, 1946. It is
                        recognised as secondary, denoting the level or grade of
                        approval. The institute is incorporated in the Monthly
                        Pay Order (MPO) system at Yes, which determines
                        government funding for teacher wages.The institute's
                        official registration number with the MPO facility is
                        8305091301. Secondary institutions include schools,
                        colleges, universities, and vocational training centres.
                        The Rajshahi Board oversees academic standards and
                        examinations at the institute. The institute offers
                        subjects such as Business Studies, Science, and
                        Humanities, catering to a wide range of educational
                        demands and academic streams. The institute is
                        Co-Education (Separate), which indicates whether it is
                        coeducational or serves only one gender. The institute's
                        classes are held during the day, reflecting the
                        operational timetable, which includes morning, day, and
                        evening shifts. Managing oversees the institute's
                        operations and policies. The institute is located in
                        Grameen and belongs to a certain geographical or
                        administrative region.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
