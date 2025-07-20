import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Privacy Policy | Slide",
  description: "Privacy Policy for Slide - Your Instagram Automation Tool"
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Privacy Policy
          </h1>
          <p className="text-gray-400 text-lg">Last Updated: July 20, 2025</p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 sm:p-8 shadow-xl border border-gray-700/50">
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">1. Introduction</h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Welcome to Slide, a portfolio project designed to demonstrate Instagram automation capabilities.
              This Privacy Policy explains how we handle your information when you use our services.
              As a portfolio project, we are committed to transparency about the data we collect and how it's used.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">2. Information We Collect</h2>
            <h3 className="text-xl font-medium mb-2 text-gray-300">2.1 Information You Provide</h3>
            <ul className="list-disc pl-6 mb-6 text-gray-300 space-y-2">
              <li>Basic account information (username, email)</li>
              <li>Profile information you choose to share</li>
              <li>Content you create or provide through our services</li>
            </ul>

            <h3 className="text-xl font-medium mb-2 text-gray-300">2.2 Automatically Collected Information</h3>
            <ul className="list-disc pl-6 mb-6 text-gray-300 space-y-2">
              <li>Log and usage data</li>
              <li>Device information</li>
              <li>Cookies and similar technologies</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">3. How We Use Your Information</h2>
            <p className="text-gray-300 mb-4 leading-relaxed">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-300 space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Develop and test new features and functionality</li>
              <li>Monitor and analyze usage and trends</li>
              <li>Ensure the security and integrity of our services</li>
              <li>Access Instagram data via the Instagram Graph API with your explicit consent to demonstrate automation features</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">4. Data Security</h2>
            <p className="text-gray-300 mb-4 leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal information.
              All data is securely stored using Neon DB, a robust and secure database platform.
              Our services are hosted on secure HTTPS servers to ensure safe transmission of your data.
              However, please be aware that no method of transmission over the internet or electronic storage is 100% secure.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">5. Data Sharing</h2>
            <p className="text-gray-300 mb-4 leading-relaxed">
              We do not share your personal data with any third parties except where required by law or to operate core functionality of this portfolio project.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">6. Your Rights</h2>
            <p className="text-gray-300 mb-4 leading-relaxed">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-300 space-y-2">
              <li>Access your personal information</li>
              <li>Request correction of your information</li>
              <li>Request deletion of your information</li>
              <li>Object to or restrict processing of your information</li>
              <li>Request data portability</li>
              <li>Revoke your consent and disconnect your Instagram account at any time via Instagram settings</li>
            </ul>
            <p className="text-gray-300 mb-4 leading-relaxed">
              To exercise these rights, please contact us using the information below.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">7. Changes to This Policy</h2>
            <p className="text-gray-300 mb-4 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy
              on this page and updating the "Last Updated" date at the top of this policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">8. Contact Us</h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <div className="bg-gray-700/50 p-4 rounded-lg">
              <p className="text-gray-300">Email: talatiharsh19@gmail.com</p>
              <p className="text-gray-300">Address: Pune, Maharashtra, India</p>
            </div>
          </section>

          <div className="mt-12 text-center">
            <Link href="/">
              <Button 
                variant="outline" 
                className="bg-transparent hover:bg-gray-700 text-white border-gray-600 hover:border-blue-400 transition-colors"
              >
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
