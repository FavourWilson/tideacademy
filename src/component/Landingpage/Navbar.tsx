import { useState } from 'react'
import { Logo } from '../../assets'
import { NavLink } from 'react-router'
import { Menu } from 'lucide-react'
import { NAV_LINK } from '../../libs'

const Navbar = () => {
    const [open, setOpen] = useState(false)

    const handleNav =()=>{
        setOpen(!open)
    }
  return (
    <>
        <div className='flex justify-between items-center gap-5'>
        <NavLink to="/">
            <img src={Logo} className='w-30 h-30'/>
        </NavLink>
        <div className='hidden lg:flex lg:gap-5'>
           {
            NAV_LINK.map((nav)=>(
                 <NavLink className={'font-semibold text-lg'} to={''}>{nav.name}</NavLink>
            ))
           }
            
        </div>

        <div className='hidden lg:flex'>
            <NavLink to={'/sign-in'} className={'rounded-tl-xl rounded-br-xl bg-primary-100 font-bold font-poppins w-40 text-center py-3 px-2'}>Get Started</NavLink>
        </div>
        <div className='flex lg:hidden'>
            <Menu size={24} className='' onClick={handleNav} />
        </div>
    </div>

    {
        open && <div className=''>
            <div className='flex flex-col gap-2 justify-center items-center'>
            <NavLink to={''}>Learn</NavLink>
            <NavLink to={''}>About Us</NavLink>
            <NavLink to={''}>WHy Join Us</NavLink>
            <NavLink to={''}>Testimonials</NavLink>
            <NavLink to={''}>FAQ</NavLink>
            <NavLink to={'/sign-in'} className={'rounded-tl-xl rounded-br-xl bg-primary-100 font-bold font-poppins w-40 text-center py-3 px-2'}>Get Started</NavLink>
        </div>

        </div>
    }
    </>
  )
}

export default Navbar