import React, { useRef, useState } from "react";


function Controllers({
    isPlaying,
    handlePlayback,
    currentTime,
    duration,
    onSeek
}){
   

   


    return(
        <div className="flex justify-center flex-col">
        <form action="">
        <input type="range"
            min="0"
            max = {duration||0}
            value = {currentTime||0}
           onChange={(e)=>onSeek(Number(e.target.value))}
           className="w-full
           max-[700px]:mt-0 max-[700px]:mb-4"
            />
        </form>
            

            <button onClick={() =>handlePlayback()} className="bg-white text-black  josefin-sans w-32 h-12 m-auto text-center text-2xl font-bold hover:text-white hover:bg-purple-600 hover:border-4 hover:border-white  transition-all">
                {(isPlaying)?"Pause":"Play"}
            </button>
        </div>
    )
}

export default Controllers