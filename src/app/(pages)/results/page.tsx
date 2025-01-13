"use client";
import MarksheetFinder from "@/components/results/MarksheetFinder";

export default function ResultsPage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
            <div className="max-w-7xl flex flex-col items-center">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4 font-serif">
                        Student Marksheet Portal
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Access and download your academic results with ease.
                        Enter your details below to find your marksheet.
                    </p>
                </div>
                <MarksheetFinder />
            </div>
        </main>
    );
}
