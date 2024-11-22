import Link from 'next/link'
import React from 'react'

const PolicyPage = () => {
    return (
        <div className="bg-gray-100 py-10 px-6 mx-auto">
            <h1 className="text-2xl font-bold text-slate-800 mb-4 text-center">Terms of Use and Service</h1>
            <div className="max-w-4xl mx-auto bg-white p-6 shadow-lg rounded-lg">
                {/* Terms of Service Section */}
                <section id="terms-of-service">

                    <div className="mb-6">
                        <h3 className="text-xl font-semibold text-primary mb-2">1. Introduction</h3>
                        <p className="text-gray-600">
                            Welcome to Hudhuria. These Terms of Service govern your use of our website and services. By accessing or using our website, you agree to comply with and be bound by these Terms. If you do not agree with any of the Terms, please do not use our website.
                        </p>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-xl font-semibold text-primary mb-2">2. Account Registration</h3>
                        <p className="text-gray-600">To use certain features of the website, you may be required to register an account. You agree to:</p>
                        <ul className="list-disc list-inside text-gray-600 ml-4">
                            <li>Provide accurate, current, and complete information during the registration process.</li>
                            <li>Keep your account information up to date.</li>
                            <li>Maintain the security of your account and password.</li>
                            <li>Notify us immediately if you suspect any unauthorized use of your account.</li>
                        </ul>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-xl font-semibold text-primary mb-2">3. Event Creation and Listing</h3>
                        <p className="text-gray-600">As an event organizer, you can create and list events on our website. By creating an event, you agree to:</p>
                        <ul className="list-disc list-inside text-gray-600 ml-4">
                            <li>Provide accurate and complete information about the event.</li>
                            <li>Ensure that all content (text, images, etc.) does not violate any third-party rights, including intellectual property rights.</li>
                            <li>Honor all ticket sales, pricing, and refund policies as described during event creation.</li>
                        </ul>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-xl font-semibold text-primary mb-2">4. Ticket Purchases</h3>
                        <p className="text-gray-600">As an attendee, you can browse and purchase tickets to events listed on our website. By purchasing a ticket, you agree to:</p>
                        <ul className="list-disc list-inside text-gray-600 ml-4">
                            <li>Pay the ticket price in full through the available payment methods.</li>
                            <li>Understand that the ticketing terms, including cancellation and refunds, are governed by the event organizer&apos;s policy.</li>
                        </ul>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-xl font-semibold text-primary mb-2">5. Refunds and Cancellations</h3>
                        <p className="text-gray-600">Refund and cancellation policies are determined by the event organizers. Please check the specific event listing for details. We are not responsible for processing refunds unless explicitly stated otherwise.</p>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-xl font-semibold text-primary mb-2">6. Prohibited Conduct</h3>
                        <p className="text-gray-600">You agree not to:</p>
                        <ul className="list-disc list-inside text-gray-600 ml-4">
                            <li>Use the website for any illegal or unauthorized purposes.</li>
                            <li>Post or share any false, defamatory, or infringing content.</li>
                            <li>Attempt to disrupt or interfere with the website&apos;s operation or security.</li>
                            <li>Use the website to harm others, including sending unsolicited messages or misrepresenting yourself.</li>
                        </ul>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-xl font-semibold text-primary mb-2">7. Intellectual Property</h3>
                        <p className="text-gray-600">
                            All content on the website, including but not limited to text, images, graphics, and logos, is the property of [hudhuria.com] or its content suppliers and is protected by intellectual property laws. You may not use, copy, or distribute any content without our prior written consent.
                        </p>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-xl font-semibold text-primary mb-2">8. Limitation of Liability</h3>
                        <p className="text-gray-600">
                            We are not responsible for any damages or losses arising from your use of the website or attendance at any events. This includes any inaccuracies in event listings or issues related to the event itself (e.g., cancellations, rescheduling).
                        </p>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-xl font-semibold text-primary mb-2">9. Changes to the Terms</h3>
                        <p className="text-gray-600">
                            We may update these Terms at any time. Changes will be posted on this page, and your continued use of the website after any modifications indicate your acceptance of the revised Terms.
                        </p>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-xl font-semibold text-primary mb-2">10. Contact Information</h3>
                        <p className="text-gray-600">If you have any questions about these Terms, please contact us at  admin@hudhuria.com.</p>
                    </div>
                </section>

                {/* Privacy Policy Section */}
                <div id="privacy-policy" className="mt-10">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Privacy Policy</h2>

                    <div className="mb-6">
                        <h3 className="text-xl font-semibold text-primary mb-2">1. Introduction</h3>
                        <p className="text-gray-600">
                            At [hudhuria.com], we are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and safeguard your personal information when you visit our website or use our services.
                        </p>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-xl font-semibold text-primary mb-2">2. Information We Collect</h3>
                        <p className="text-gray-600">We collect the following types of information:</p>
                        <ul className="list-disc list-inside text-gray-600 ml-4">
                            <li>
                                <strong>Personal Information:</strong> When you register an account, create an event, or purchase a ticket, we may collect personal information such as your name, email address, phone number, and payment details.
                            </li>
                            <li>
                                <strong>Non-Personal Information:</strong> We may collect non-identifiable information such as your browser type, IP address, and usage data to improve our website’s functionality and user experience.
                            </li>
                        </ul>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-xl font-semibold text-primary mb-2">3. How We Use Your Information</h3>
                        <p className="text-gray-600">We use your information for the following purposes:</p>
                        <ul className="list-disc list-inside text-gray-600 ml-4">
                            <li>To provide and improve our services.</li>
                            <li>To process transactions and manage your account.</li>
                            <li>To communicate with you about events, promotions, and updates.</li>
                            <li>To comply with legal requirements.</li>
                        </ul>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-xl font-semibold text-primary mb-2">4. Cookies and Tracking</h3>
                        <p className="text-gray-600">
                            Our website uses cookies and similar tracking technologies to:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 ml-4">
                            <li>Personalize your experience.</li>
                            <li>Analyze website traffic and usage patterns.</li>
                            <li>Improve website performance and functionality.</li>
                        </ul>
                        <p className="text-gray-600">
                            You can choose to disable cookies in your browser settings, but this may limit your ability to use certain features of our website.
                        </p>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-xl font-semibold text-primary mb-2">5. Third-Party Services</h3>
                        <p className="text-gray-600">
                            Our website may contain links to third-party websites or services (e.g., payment gateways). These third parties may have their own privacy policies, and we are not responsible for their practices. We recommend reviewing their policies before using their services.
                        </p>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-xl font-semibold text-primary mb-2">6. Data Security</h3>
                        <p className="text-gray-600">
                            We take the security of your personal information seriously and implement appropriate technical and organizational measures to protect it from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                        </p>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-xl font-semibold text-primary mb-2">7. Your Rights</h3>
                        <p className="text-gray-600">You have the right to:</p>
                        <ul className="list-disc list-inside text-gray-600 ml-4">
                            <li>Access, update, or delete your personal information.</li>
                            <li>Opt out of receiving marketing communications.</li>
                            <li>Request that we stop using your personal information for specific purposes.</li>
                        </ul>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-xl font-semibold text-primary mb-2">8. Changes to the Privacy Policy</h3>
                        <p className="text-gray-600">
                            We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. Any changes will be posted on this page, and we encourage you to review the policy periodically.
                        </p>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-xl font-semibold text-primary mb-2">9. Contact Information</h3>
                        <p className="text-gray-600">If you have any questions or concerns about this Privacy Policy or how we handle your personal information, please contact us at admin@hudhuria.com.</p>
                    </div>
                </div>

                <div className="mt-4 w-full flex justify-center align-middle gap-2 md:gap-4 items-center underline">
                    <Link href="/" className="text-sm hover:text-primary">Home</Link>
                    <Link href="/" className="text-sm hover:text-primary">About us</Link>
                    <Link href="/contact" className="text-sm hover:text-primary">Contact</Link>
                    <Link href="/faqs" className="text-sm hover:text-primary">FAQs</Link>
                </div>
            </div>


        </div>
    )
}

export default PolicyPage