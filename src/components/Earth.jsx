import React from 'react'
import earth from "../assets/earth.png"

export const Earth = ({text}) => {
  return (
    <div className='bg-[#E6E0E9] p-3 rounded-2xl flex flex-col gap-13'>
      <div className='flex justify-start'>
        <h1 className='font-semibold text-2xl text-[#49454F]'>
            {text}
        </h1>
      </div>

      <div className='flex'>
        <div className='bg-white p-2 rounded-full hover:bg-[#d6d6d6] cursor-pointer flex w-fit ml-auto'>
          <img src={earth} alt="" />
        </div>
      </div>
    </div>
  )
}
