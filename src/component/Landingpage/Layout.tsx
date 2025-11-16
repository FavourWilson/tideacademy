import React from 'react'

const Layout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='px-5 lg:px-30'>{children}</div>
  )
}

export default Layout