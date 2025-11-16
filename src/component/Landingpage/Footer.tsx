import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { Logodark } from "../../assets";

const Footer = () => {
  return (
    <footer className="w-full bg-primary-100 py-10 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT SECTION */}
        <div className="space-y-4">
          <img 
            src={Logodark} 
            alt="TIDE Academy Logo" 
            className="w-40"
          />

          <p className="text-white text-sm leading-relaxed max-w-md font-poppins">
            TIDE ACADEMY aims to revolutionize financial literacy among the young and older 
            generations by providing a comprehensive online education platform focused on digital 
            currencies, trade & investments and cybersecurity while uplifting the power of AI. Our 
            mission is to equip the next generation with the knowledge and skills necessary to 
            navigate the rapidly evolving digital financial landscape.
          </p>

          {/* SOCIAL ICONS */}
          <div className="flex items-center gap-4 text-white text-xl">
            <a href="#" className="hover:text-gray-200">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-gray-200">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-gray-200">
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="p-6 rounded-lg shadow-md max-w-sm ml-auto">
          <h3 className="text-lg font-semibold mb-4 font-poppins">
            Subscribe To Our Newsletter
          </h3>

          <form className="space-y-3">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-green-300"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-green-300"
            />

            <button
              type="submit"
              className="w-full bg-primary-900 font-poppins text-white py-2 rounded-md font-medium hover:bg-primary-900 transition"
            >
              Subscribe
            </button>
          </form>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
