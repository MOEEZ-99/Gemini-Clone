import { useState } from "react";
import NavContext from "./NavContext";

const NavProvider = ({children}) => { 
    const [showNav, setshowNav] = useState(false)
    return(
        <NavContext.Provider value={{showNav, setshowNav}}>
            {children}
        </NavContext.Provider>
    )
 }

 export default NavProvider;