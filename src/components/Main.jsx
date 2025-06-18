import React, { useEffect, useRef, useState } from 'react'
import { Topbar } from './Topbar'
import cross from "../assets/cross.png"
import { Earth } from './Earth'
import happy from "../assets/happy.png"
import mic from "../assets/mic.png"
import { GoogleGenAI } from "@google/genai";
import { Loading } from './Loading'
import arrow from "../assets/arrow.svg"

export const Main = () => {
    const [promptText, setpromptText] = useState("")
    const [responseState, setresponseState] = useState(null)
    const [recentPrompt, setrecentPrompt] = useState("")
    const [prevPrompts, setprevPrompts] = useState([])
    const [loading, setloading] = useState(false)
    const inputRef = useRef()
    useEffect(() => {
        sessionStorage.setItem("prev-prompts", JSON.stringify(prevPrompts))
    }, [prevPrompts])
    const closeBox = () => {
        document.querySelector(".box").style.display = "none"
    }

    const ai = new GoogleGenAI({ apiKey: "AIzaSyBVnVQ4pL8_ikSoSrK3kFOH9P7p4JOOEv4" });

    async function runChat(prompt) {
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: prompt,
        });

        let answer = await response.text;

        answer = answer
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") 
            .replace(/\*(.*?)\*/g, "<strong>$1</strong>");     

        const paragraphs = answer.split(/\n\s*\n|<br\s*\/?>/g);

        const fullHTML = paragraphs.map(
            (para) => `<div class="mb-3 text-justify">${para}</div>`
        ).join("");

        const words = fullHTML.split(" ");
        let currentHTML = "";
        let index = 0;

        const interval = setInterval(() => {
            if (index < words.length) {
                currentHTML += words[index] + " ";
                setresponseState(<div dangerouslySetInnerHTML={{ __html: currentHTML }} />);
                index++;
            } else {
                clearInterval(interval);
            }
        }, 30); // adjust speed here
    }


    const run = async () => {
        setpromptText("")
        setloading(true)
        await runChat(promptText)
        setrecentPrompt(promptText)
        setprevPrompts([...prevPrompts, promptText])
        setloading(false)
    }

    useEffect(()=>{
        inputRef.current.focus()
    },[])

    const checkKey = (e) => { 
        if(e.code==="Enter"){
            if(e.shiftKey){
                setpromptText(promptText => promptText + '')
            }
            else{
                run()
            }
        }
     }

    return (
        <>
            <div className='main min-h-screen flex-1 flex flex-col xl:px-10 px-4 pb-5 relative max-h-screen'>
                <div className="topbar">
                    <Topbar />
                </div>

                {/* Notification box under Topbar */}
                <div className="box absolute top-12 left-0 w-full bg-[#21005D] text-white flex justify-between items-center px-7 cursor-pointer py-2 ">
                    <div className='flex-1 text-center'>
                        Gemini was just updated. <span className='underline cursor-pointer'>See update</span>
                    </div>

                    <div>
                        <img src={cross} alt="Close" onClick={closeBox} />
                    </div>
                </div>

                <div className="content flex-1 flex flex-col md:px-20 px-5 pt-10 items-center justify-between">


                    <div className="response max-h-[70vh] h-[80%] w-full overflow-auto">
                        {/* {loading && <div>
                                Loading...
                            </div>} */}

                        {loading ? (
                            <div className='w-full h-full'>
                                <Loading />
                            </div>
                        ) : responseState ? (
                            <div>
                                <h1 className='font-semibold text-3xl py-3'>{recentPrompt}</h1>
                                <div className='block text-justify'>{responseState}</div>
                            </div>
                        ) : (
                            <div className="title flex flex-col md:gap-10 gap-8 pt-10 md:pt-0">
                                <div className="up">
                                    <h1 className="text-6xl font-semibold bg-gradient-to-r from-[#6A89E7] via-[#A9769D] to-[#C66D78] text-transparent bg-clip-text">
                                        Hello, Team
                                    </h1>

                                    <h1 className='text-6xl font-semibold text-[#CAC4D0] leading-19'>How can I help you today?</h1>
                                </div>

                                <div className="earths md:grid xl:grid-cols-[repeat(4,minmax(120px,1fr))] md:grid-cols-2 grid-cols-1 hidden gap-4">
                                    <Earth text={"Generate unit test for following cpp function"} />
                                    <Earth text={"Generate unit test for following cpp function"} />
                                    <Earth text={"Generate unit test for following cpp function"} />
                                    <Earth text={"Generate unit test for following cpp function"} />
                                </div>
                            </div>
                        )}



                    </div>

                    <div className="input flex gap-5 bg-[#E6E0E9] w-full py-2 px-4 rounded-3xl box-border">
                        <input type="text" placeholder='Enter a prompt here' className='px-2 outline-0 w-full'
                            onChange={(e) => { setpromptText(e.target.value) }} value={promptText} ref={inputRef} onKeyDown={checkKey} />
                        {/* <img src={happy} alt="" className='cursor-pointer' /> */}
                        <img src={arrow} alt="" className={`${promptText? "visible" : "invisible"} cursor-pointer hover:bg-gray-400 rounded-3xl p-2 bg-black`} onClick={run}/>
                    </div>
                    {/* <div>Gemini can make mistakes. See important info</div> */}
                </div>
            </div>
        </>
    )
}