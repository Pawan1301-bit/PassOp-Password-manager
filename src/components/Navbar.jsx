import React from 'react'

const Navbar = () => {
  return (
    <div>
      <nav className='bg-slate-800'>

        <div className='mycontainer flex justify-between items-center h-14 px-4 sm:px-8 md:px-16 lg:px-24 py-5'>

          <div className="logo text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white font-bold">
            
          <h1>
          <span className="text-green-500">&lt;</span>
            Pass
            <span className="text-green-500">Op/ &gt;</span> 
          </h1>
          </div>

          {/* <p className="text-green-700">Your own Password manager</p> */}

          {/* <ul className='flex gap-4 text-white'>
            <li title='currently unavailable' className='hover:border-b-2 border-white duration-50'>Home</li>
            <li title='currently unavailable' className='hover:border-b-2 border-white duration-50'>About</li>
            <li title='currently unavailable' className='hover:border-b-2 border-white duration-50'>Contact</li>
          </ul> */}

          <div className="git">
            <button  className='ring-1 border-white h-[30px] w-[70px] sm:h-[35px] sm:w-[80px] md:h-[40px] md:w-[90px] m-1 px-2 py-2  text-white font-bold text-lg sm:text-xl md:text-2xl bg-green-400 rounded-full border hover:ring-2 ring-white duration-50'>
             <a href="https://github.com/Pawan1301-bit/PassOp-Password-manager"  target='_blank'> <img src="Icons/githun.png" alt="GitHub" /> </a>
            </button>
          </div>

        </div>

      </nav>
    </div>
  )
}

export default Navbar