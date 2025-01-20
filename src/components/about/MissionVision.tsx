"use client";

import { motion } from "framer-motion";
import { Target, Eye } from "lucide-react";

export function MissionVision() {
    return (
        <section className="py-24 bg-gradient-to-b from-background to-primary/5">
            <div className="container">
                <div className="flex flex-col md:flex-row justify-center items-center gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-4 flex flex-col items-center"
                    >
                        <div className="inline-flex p-3 rounded-lg bg-primary/10 text-primary">
                            <Target className="h-8 w-8" />
                        </div>
                        <h2 className="text-3xl font-bold">Our Mission</h2>
                        <p className="text-muted-foreground text-center">
                            At Raigaon High School, our mission is to nurture a
                            supportive and inclusive educational environment.
                            Since 1946, we&apos;ve been committed to excellence,
                            offering diverse academic programs in Business
                            Studies, Science, and Humanities. Our goal is to
                            empower students to reach their full potential and
                            become responsible, compassionate members of
                            society.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-4 flex flex-col items-center"
                    >
                        <div className="inline-flex p-3 rounded-lg bg-primary/10 text-primary">
                            <Eye className="h-8 w-8" />
                        </div>
                        <h2 className="text-3xl font-bold">Our Vision</h2>
                        <p className="text-muted-foreground text-center">
                            To create a dynamic and inclusive learning
                            environment where students excel academically,
                            develop their talents, and make meaningful
                            contributions to society. We envision our graduates
                            as well-rounded individuals who are prepared to face
                            the challenges of a rapidly changing world with
                            confidence and integrity.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
