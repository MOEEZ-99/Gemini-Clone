import React from 'react'
import activity from "../assets/activity.png"
import user from "../assets/userIcon.png"
import burger from "../assets/burger.png"
import NavContext from '../context/NavContext'
import { useContext } from 'react'

export const Topbar = () => {
    const {showNav, setshowNav} = useContext(NavContext)

    return (
        <div className='flex justify-between py-4'>
            <div className='flex gap-8 items-center'>

                <div className='block xl:hidden'><img src={burger} alt="" onClick={()=>{
                    setshowNav(!showNav)
                    console.log(showNav)
                }}/></div>
                <select name="" id="" className='outline-0 cursor-pointer'>
                    <option value="gemini" className='outline-0'>Gemini</option>
                    <option value="gemini" className='outline-0'>Flash</option>
                </select>
            </div>


            <div className='flex gap-4'>
                <img src={activity} alt="" className='cursor-pointer' />
                <img src={user} alt="" className='cursor-pointer' />
            </div>
        </div>
    )
}
