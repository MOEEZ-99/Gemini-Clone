import React, { useEffect, useState } from 'react'
import burger from "../assets/burger.png"
import plus from "../assets/plus.png"
import recent from "../assets/recent.png"
import help from "../assets/help.png"
import activity from "../assets/activity.png"
import settings from "../assets/settings.png"

export const Sidebar = () => {
    const [extened, setextened] = useState(false)
    const [prevPrompts, setprevPrompts] = useState([])
    useEffect(()=>{
         const prevPrompts = JSON.parse(sessionStorage.getItem("prev-prompts"))
         setprevPrompts(prevPrompts)
    },[])
    const [show, setshow] = useState(false)
    const showMenu = () => { 
        setshow(true)
        document.querySelector(".menu").style.display = "flex"
        console.log(showMenu)
        console.log(document.querySelector(".menu").classList)

     }
  return (
    <div className={`xl:flex menu hidden h-screen absolute xl:static ${show? "left-0 flex" : "left-[-100%] hiddden"} flex-col justify-between pb-5 pt- px-3 bg-[#F7F2FA] ${extened? "w-[15%]" : "w-auto"}`}>

        <div className="top flex flex-col gap-5">
            <div className=''><img src={burger} alt="" className='px-5 cursor-pointer hover:bg-[#d6d6d6] rounded-full py-5' onClick={()=>{setextened(!extened)}}/></div>
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
  )
}
