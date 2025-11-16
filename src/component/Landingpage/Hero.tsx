import { Link } from "react-router";
import { Heropng } from "../../assets";

const Hero = () => {
  return (
    <section className="w-full flex flex-col lg:flex-row items-center justify-between gap-10 py-16 px-5">
      
      {/* LEFT SIDE */}
      <div className="flex flex-col gap-5 max-w-xl text-center lg:text-left">
        
        <h1 className="text-2xl lg:text-3xl font-bold leading-tight font-poppins">
          Learn <span className="text-primary-100">Skill</span>.  
          <br className="lg:hidden" />
          Earn <span className="text-secondary-100">Smart</span>
        </h1>

        <p className="text-lg text-gray-600 leading-relaxed font-poppins">
          🚀 Join <span className="font-semibold text-gray-800">500+ learners</span>  
           {" "}transforming their finances through expert-led training and practical guidance.
        </p>

        <Link
          to=""
          className="mt-4 bg-primary-100 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all w-fit mx-auto lg:mx-0"
        >
          Start Learning
        </Link>
      </div>

      {/* RIGHT SIDE IMAGE */}
      <div className="flex justify-center lg:justify-end">
        <img
          src={Heropng}
          alt=""
          className="w-[280px] h-[280px] md:w-[350px] lg:h-[350px] rounded-full object-cover shadow-xl hover:scale-105 transition-all"
        />
      </div>

    </section>
  );
};

export default Hero;
