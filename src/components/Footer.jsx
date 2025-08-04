import React from 'react'

const Footer = () => {
    return (
        <div className='bg-slate-800 min-h-[20px] py-2 px-4 text-white text-center flex flex-col items-center justify-center'>
            <h2 className='text-lg sm:text-xl md:text-2xl font-bold leading-tight'>
                <span className="text-green-500">&lt;</span>
                Pass
                <span className="text-green-500">Op/ &gt;</span>
            </h2>
            <div className='text-xs sm:text-sm md:text-base mt-1'>
                Created With 💖💖 By Pawan Bhatt
            </div>
        </div>
    )
}

export default Footer