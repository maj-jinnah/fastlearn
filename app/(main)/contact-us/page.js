'use client';

import emailjs from '@emailjs/browser';
import { Send } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from 'sonner';
// import { toast } from "react-toastify";


const ContactUsPage = () => {

    const formRef = useRef(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            if (formRef.current) {
                await emailjs.sendForm(
                    process.env.NEXT_PUBLIC_SERVICE_ID,
                    process.env.NEXT_PUBLIC_TEMPLATE_ID,
                    formRef.current,
                    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
                );

                toast.success(<div>
                    <p className="font-semibold text-white mb-2">Message sent successfully!</p>
                    <p className="text-sm text-gray-300">Thanks for reaching out. I&apos;ll get back to you soon.</p>
                </div>);

                setFormData({ name: "", email: "", message: "" });
            } else {
                throw new Error("Form not found");
            }
        } catch (error) {
            console.error("Error sending email:", error);
            toast.error(<div>
                <p className="font-semibold text-white mb-2">Error sending message</p>
                <p className="text-sm text-gray-300">Please try again later or contact me directly.</p>
            </div>);

        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <div className="min-h-screen bg-white text-gray-800 py-16 px-4 mt-10">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold mb-4">
                        Let&apos;s Work <span className="text-cyan-400">Together</span>
                    </h1>
                    <div className="w-16 h-1 bg-cyan-400 mx-auto mb-6"></div>
                    <p className="text-gray-800 text-lg max-w-2xl mx-auto">
                        Have a project in mind? Let&apos;s discuss how we can bring your ideas to life. I&apos;m always excited to work on new
                        challenges.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-8">
                        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Send me a message</h2>

                        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-800 mb-2">Your Name</label>
                                <input
                                    type="text"
                                    placeholder="Your name"
                                    className="w-full px-3 py-3 bg-white border border-gray-200 shadow-xs rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-800 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    // placeholder="maj.jinnah1999@gmail.com"
                                    placeholder="your@email.com"
                                    className="w-full px-3 py-3 bg-white border border-gray-200 shadow-xs rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-800 mb-2">Message</label>
                                <textarea
                                    placeholder="Tell me about your project..."
                                    rows={6}
                                    className="w-full px-3 py-3 bg-white border border-gray-200 shadow-xs rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors resize-none"
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-cyan-400 hover:bg-cyan-500 text-gray-700 font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <div className="w-5 h-5 border-2 border-gray-700 rounded-full animate-spin"></div>
                                ) : (
                                    <Send className="w-5 h-5" />
                                )}
                                {isSubmitting ? "Sending..." : "Send Message"}
                            </button>
                        </form>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Get in touch</h2>
                            <p className="text-gray-800 mb-8">
                                I&apos;m currently available for freelance work and new opportunities. Whether you have a question or just
                                want to say hi, I&apos;ll do my best to get back to you!
                            </p>
                        </div>

                        <div className="space-y-6">
                            {/* Email */}
                            <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-cyan-400/10 rounded-lg flex items-center justify-center">
                                        <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800">Email</h3>
                                        <p className="text-gray-800">maj.jinnah1999@gmail.com</p>
                                    </div>
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-cyan-400/10 rounded-lg flex items-center justify-center">
                                        <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800">Phone</h3>
                                        <p className="text-gray-800">+88015 5341 2880</p>
                                    </div>
                                </div>
                            </div>

                            {/* Location */}
                            <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-cyan-400/10 rounded-lg flex items-center justify-center">
                                        <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800">Kushtia, Bangladesh</h3>
                                        <p className="text-gray-800">Janipur, Khoksa, Kushtia</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Why work with me */}
                        <div>
                            <h3 className="text-xl font-semibold mb-4 text-gray-800">Why work with me?</h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-5 h-5 bg-cyan-400 rounded-full flex items-center justify-center flex-shrink-0">
                                        <svg className="w-3 h-3 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <p className="text-gray-800">Fast response times and clear communication</p>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-5 h-5 bg-cyan-400 rounded-full flex items-center justify-center flex-shrink-0">
                                        <svg className="w-3 h-3 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <p className="text-gray-800">High-quality, scalable solutions</p>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-5 h-5 bg-cyan-400 rounded-full flex items-center justify-center flex-shrink-0">
                                        <svg className="w-3 h-3 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <p className="text-gray-800">Collaborative approach to development</p>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-5 h-5 bg-cyan-400 rounded-full flex items-center justify-center flex-shrink-0">
                                        <svg className="w-3 h-3 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <p className="text-gray-800">Post-launch support and maintenance</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUsPage;