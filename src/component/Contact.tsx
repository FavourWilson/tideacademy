import React, { useState } from "react";
import { Mail, Info } from "lucide-react";

const ContactUs: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <section className="w-full max-w-3xl mx-auto px-4 py-12 text-center">
      
      {/* Heading */}
      <h2 className="text-2xl font-semibold font-poppins">Contact Us</h2>

      <p className="mt-2 text-gray-700 text-sm leading-relaxed">
        💬 <span className="font-medium font-poppins">Got Questions? Let’s Chat.</span>
        <br />
        Whether you're curious about our courses, need help signing up, or just want to talk crypto — we're here for it. Fill out the form or slide into our inbox. We’ll get back to you faster than a bull market breakout 🚀.
      </p>

      {/* Email */}
      <p className="mt-3 text-gray-700 text-sm flex items-center justify-center gap-1 font-poppins">
        <Mail size={16} />
        Email us directly: <span className="font-medium">support@tideacademy.trade</span>
      </p>

      {/* Response Time */}
      <p className="mt-1 text-gray-600 text-xs flex items-center justify-center gap-1 font-poppins">
        <Info size={14} />
        Response time: Within 24 hours (excluding weekends — even traders need a break 😅)
      </p>

      {/* Form */}
      <form className="mt-10 space-y-5">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full px-4 py-3 font-poppins rounded-lg border border-[#74B32A] outline-none focus:ring-2 focus:ring-[#74B32A]"
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          className="w-full px-4 py-3 font-poppins rounded-lg border border-[#74B32A] outline-none focus:ring-2 focus:ring-[#74B32A]"
        />

        <textarea
          name="message"
          placeholder="Message"
          rows={5}
          value={form.message}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg font-poppins border border-[#74B32A] outline-none focus:ring-2 focus:ring-[#74B32A] resize-none"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#74B32A] hover:bg-[#6aa727] font-poppins transition text-white font-medium py-3 rounded-md"
        >
          Send Message
        </button>
      </form>
    </section>
  );
};

export default ContactUs;
