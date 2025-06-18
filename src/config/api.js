 import { GoogleGenAI } from "@google/genai";
 
 const ai = new GoogleGenAI({ apiKey: "AIzaSyBVnVQ4pL8_ikSoSrK3kFOH9P7p4JOOEv4" });

  async function runChat(prompt) {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });
    let answer = await response.text
    let newArray = answer.split("**")
    console.log(prompt)
    console.log(newArray)
    // console.log(response.text);
  }

  export default runChat