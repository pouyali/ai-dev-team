'use client';

import Link from 'next/link';
import { Users, Heart, ArrowRight } from 'lucide-react';

/**
 * VolunteerConnect home – entry point to volunteer portal and other roles
 */
export default function Home(): JSX.Element {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Logo / Brand */}
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-2xl bg-gray-900 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">VC</span>
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">VolunteerConnect</h1>
          <p className="text-gray-500 mt-1">Connect volunteers with seniors who need assistance</p>
        </div>

        {/* Primary CTA – Volunteer Portal */}
        <Link
          href="/volunteer"
          className="flex items-center justify-center gap-2 w-full py-4 px-6 rounded-xl bg-gray-900 text-white font-semibold hover:bg-gray-800 transition-colors"
        >
          <Users className="w-5 h-5" />
          Enter Volunteer Portal
          <ArrowRight className="w-5 h-5" />
        </Link>

        {/* Secondary links */}
        <div className="flex flex-wrap justify-center gap-4 pt-4 border-t border-gray-200">
          <Link
            href="/senior"
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
          >
            <Heart className="w-4 h-4" />
            Senior view
          </Link>
          <Link
            href="/admin"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Admin
          </Link>
        </div>
      </div>
    </main>
  );
}
