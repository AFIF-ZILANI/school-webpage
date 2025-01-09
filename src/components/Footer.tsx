import Link from "next/link";
import {
    Facebook,
    Twitter,
    Instagram,
    Mail,
    Phone,
    MapPin,
} from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-4">
                            Raigaon High School
                        </h3>
                        <p className="text-gray-400">
                            Nurturing minds, building futures since 1946
                        </p>
                        <div className="flex space-x-4 mt-4">
                            <Link href="https://www.facebook.com/profile.php?id=100063663932638&mibextid=ZbWKwL" className="hover:text-blue-400">
                                <Facebook className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="hover:text-blue-400">
                                <Twitter className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="hover:text-blue-400">
                                <Instagram className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">
                            Quick Links
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/about"
                                    className="hover:text-blue-400"
                                >
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/notices"
                                    className="hover:text-blue-400"
                                >
                                    Notices
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/results"
                                    className="hover:text-blue-400"
                                >
                                    Results
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/gallery"
                                    className="hover:text-blue-400"
                                >
                                    Gallery
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">
                            Contact Info
                        </h3>
                        <ul className="space-y-2">
                            <li className="flex items-center space-x-2">
                                <Mail className="h-5 w-5" />
                                <span>info@raigonhigh.edu</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <Phone className="h-5 w-5" />
                                <span>+880 1721704507</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <MapPin className="h-5 w-5" />
                                <span>
                                    Barshil - Matagihat Rd, Mataji Hat,
                                    Mohadevpur, Naogaon
                                </span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">
                            School Hours
                        </h3>
                        <ul className="space-y-2 text-gray-400">
                            <li>Sunday - Thusday</li>
                            <li>10:00 AM - 4:00 PM +6 GTM</li>
                            <li>Office Hours:</li>
                            <li>09:30 AM - 4:30 PM +6 GTM</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                    <p>
                        © {new Date().getFullYear()} Raigaon High School. All
                        rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
