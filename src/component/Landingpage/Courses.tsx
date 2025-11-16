import { Course_DATA } from "../../libs"

const Courses = () => {
  return (
    <div className="flex flex-col justify-center lg:grid lg:grid-cols-1 lg:justify-between items-center">
        <h1 className="text-3xl font-bold text-center ">Our Courses</h1>
        <p className="font-semibold text-xl text-center mb-10">Explore Our Core Learning Tracks</p>
        <div className='grid md:grid-cols-1 gap-10'>
           {Course_DATA.map((item) => (
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
                             className="object-cover max-w-[250px]"
                           />
                         </div>
           
                         {/* Text */}
                         <div className="w-full md:w-1/2">
                           <h3 className="text-xl text-center lg:text-start font-semibold mb-1 font-poppins">{item.title}</h3>
                           <p className="text-sm text-center lg:text-start font-medium text-blue-600 mb-2 font-poppins">
                             {item.subtitle}
                           </p>
                           <p className="text-gray-700 text-center lg:text-start leading-relaxed font-poppins">{item.text}</p>
                         </div>
                       </div>
                     ))}
        </div>
    </div>
  )
}

export default Courses