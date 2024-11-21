import { div } from "@tensorflow/tfjs"
import React from "react"
import ParentComponent from "../components/ParentComponent"
import logo from '../assets/logo.png'



function HomePage(){
    return(
        <div className="bg-black w-screen h-auto pb-20">
            <nav className="flex w-full h-[5rem] mt-0 max-[500px]:ml-[25%]">
                <img src={logo} alt="logo"  className="w-[10rem] h-[10rem] mt-4 ml-8 max-[900px]:w-[8rem] max-[900px]:h-[8rem]"/>
            </nav>

            <h1 className="text-center mb-4 mt-16 text-6xl text-white  josefin-sans max-[1100px]:mt-[8rem] max-[900px]:text-4xl max-[900px]:mb-2" >Smile to Watch the Trailer !!</h1>

            <div className="w-full flex justify-center max-[900px]:h-screen max-[900px]:mt-0">
                <ParentComponent></ParentComponent>
            </div>
        </div>
    )
}

export default HomePage;