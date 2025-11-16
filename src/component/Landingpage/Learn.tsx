import { LEARN_DATA } from "../../libs";

const Learn = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-6 mt-14 px-4">
      <h1 className="text-3xl font-bold text-center">🔍 What You'll Learn</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl mt-6">
        {LEARN_DATA.map((learn) => (
          <div
            key={learn.id}
            style={{ backgroundColor: learn.color }}
            className="rounded-2xl p-6 flex flex-col items-center text-white font-poppins shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <img
              src={learn.img}
              alt={learn.text}
              className="w-40 h-40 object-cover mb-4"
            />
            <span className="text-lg font-poppins font-semibold text-center">
              {learn.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Learn;
