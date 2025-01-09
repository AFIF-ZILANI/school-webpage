"use client";

import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { ResultSearch } from "@/components/results/ResultSearch";
import { ResultCard } from "@/components/results/ResultCard";

export default function ResultsPage() {
    const [results, setResults] = useState([]);
    const [error, setError] = useState("");

    const handleSearch = async (studentId: string) => {
        try {
            const res = await fetch(`/api/results?studentId=${studentId}`);
            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Failed to fetch results");
                setResults([]);
                return;
            }

            if (data.length === 0) {
                setError("No results found");
            } else {
                setError("");
            }

            setResults(data);
        } catch (error) {
            setError("An error occurred");
            setResults([]);
        }
    };

    return (
        <div className="py-8 gap-14 flex flex-col items-center min-h-[90vh] pt-12 ">
            <div className="flex flex-col items-center">
                <PageHeader
                    title="Exam Results"
                    description="View your academic performance"
                />

                <div>
                    <ResultSearch onSearch={handleSearch} />
                    {error && (
                        <p className="mt-4 text-sm text-red-500">{error}</p>
                    )}
                </div>
            </div>

            <div className="grid gap-7 md:grid-cols-3 min-w-[1fr]">
                {results.map((result, index) => (
                    <ResultCard key={index} result={result} />
                ))}
            </div>
        </div>
    );
}
