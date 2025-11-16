import { JOIN_US_DATA } from "../../libs";

const JoinUs = () => {
  return (
    <section className="w-full py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center">Why Join Us</h2>
        <p className="font-normal text-lg text-center mb-12">
          💡 What Makes Our Tech Academy Different?
        </p>

        <div className="grid md:grid-cols-1 gap-10">
          {JOIN_US_DATA.map((item) => (
            <div
              key={item.id}
              className={`flex flex-col items-center md:flex-row lg:items-start gap-6 p-6 rounded-2xl hover:shadow-xl transition 
                ${item.id % 2 !== 0 ? "md:flex-row-reverse" : ""}`}
            >
              {/* Image */}
              <div className="m-w-[120px] md:w-1/2 flex justify-center">
                <img
                  src={item.img}
                  alt={item.title}
                  className="object-contain max-w-[200px]"
                />
              </div>

              {/* Text */}
              <div className="w-full md:w-1/2">
                <h3 className="text-xl text-center lg:text-start  font-semibold mb-1 font-poppins">{item.title}</h3>
                <p className="text-sm text-center lg:text-start font-medium text-blue-600 mb-2 font-poppins">
                  {item.subheader}
                </p>
                <p className="text-gray-700 text-center lg:text-start leading-relaxed font-poppins">{item.text}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default JoinUs;
