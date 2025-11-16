import { Logo } from "../../assets"

const Sidebar = () => {
  return (
    <div className="hidden lg:block w-1/2 h-screen bg-primary-900 relative">
        <div className="bg-primary-200 translate-y-24 w-[300px] translate-x-36 z-10 blur-3xl h-20 rounded-full -rotate-45 absolute"></div>
        <div className="bg-primary-200 w-[400px] translate-y-72 z-10 translate-x-36  blur-3xl h-20 rounded-full rotate-45 absolute"></div>
        <div className="bg-primary-200 w-[300px] translate-x-28 z-10 blur-3xl translate-y-[500px] h-20 rounded-full -rotate-45 absolute"></div>

        <div className="flex justify-center items-center h-full">
            <img src={Logo} alt="" className="z-50"/>
        </div>
    </div>
  )
}

export default Sidebar