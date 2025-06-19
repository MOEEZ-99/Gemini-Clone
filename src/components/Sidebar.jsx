import React, { useEffect, useState } from 'react'
import burger from "../assets/burger.png"
import plus from "../assets/plus.png"
import recent from "../assets/recent.png"
import help from "../assets/help.png"
import activity from "../assets/activity.png"
import settings from "../assets/settings.png"
import NavContext from '../context/NavContext'
import { useContext } from 'react'

export const Sidebar = () => {
    const [extened, setextened] = useState(false)
    const [prevPrompts, setprevPrompts] = useState([])
    const {showNav,setshowNav} = useContext(NavContext) 
    useEffect(()=>{
            setextened(true)
        //  console.log(window.outerWidth<1000)
    },[window.outerWidth<1000])
  return (
    <>
    {/* {showNav &&<div className={`blur bg-gray-300 w-screen h-screen absolute ${showNav? "opacity-[0.8]": "opacity-0"} transition-all duration-[10s]`}></div>} */}
    <div className={`blur bg-gray-300 w-screen h-screen absolute transition-all duration-300 ${showNav ? "opacity-[0.8]" : "opacity-0 pointer-events-none"}`}></div>
    <div className={` menu h-[100dvh] absolute xl:static flex ${showNav? "w-[65%] left-0 flex z-10" : "left-[-100%]"} flex-col justify-between pb-5 pt- px-3 bg-[#F7F2FA] ${extened? "w-[15%]" : "w-auto"} transition-all  duration-300 ease-in-out`}>

        <div className="top flex flex-col gap-5">
            <div className=''>
                <img src={burger} alt="" className='hidden xl:block px-5 cursor-pointer hover:bg-[#d6d6d6] rounded-full py-5' onClick={()=>{setextened(!extened)}}/>
                <img src={burger} alt="" className='xl:hidden block px-5 cursor-pointer hover:bg-[#d6d6d6] rounded-full py-5' onClick={()=>{setshowNav(false)}}/>
                </div>
            <div className='flex items-center gap-2 bg-[#ECE6F0] px-6 text-center py-3 rounded-3xl text-[#625B71] cursor-pointer hover:bg-[#d6d6d6]'><img src={plus} alt="" className=''/>{extened && "New Chat"}</div>
            {extened &&   <div className="recent flex flex-col gap-4">
                <h4 className='text-2xl font-semibold px-3'>Recent</h4>
                <div className='flex gap-2 items-center px-3'>
                    <img src={recent} alt="" className='w-fit h-fit'/>
                    {prevPrompts.map((prev)=>{
                        return <p key={Date.now()}>{prev[5]}{"..."}</p>
                    })}
                </div>
            </div>}
        </div>

        <div className="bottom flex flex-col gap-4 px-2">
            <div className='flex items-center gap-2 hover:bg-[#d6d6d6] rounded-3xl cursor-pointer px-3 py-1'>
                <img src={help} alt="" className='w-6'/>
                {extened && <h4>Help</h4>}
            </div>
            
            <div className='flex items-center gap-2 hover:bg-[#d6d6d6] rounded-3xl cursor-pointer px-3 py-1'>
                <img src={activity} alt="" className='w-6'/>
                {extened && <h4>Activity</h4>}
            </div>

            <div className='flex items-center gap-2 hover:bg-[#d6d6d6] rounded-3xl cursor-pointer px-3 py-1'>
                <img src={settings} alt="" className='w-6'/>
                {extened && <h4>Settings</h4>}
            </div>
        </div>
    </div>
    </>
  )
}
