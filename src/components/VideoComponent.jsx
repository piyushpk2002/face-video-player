import React, { useRef, useState } from "react";
//import Controllers from './ParentComponent';

function VideoPlayer({videoRef
    ,src,
    width,
    
   
    
}){
    

    return(
        
        <div className="">
           
            <video 
            width = {width}
            ref = {videoRef}
            src={src || null}
            className="z-0"
            ></video>
        </div>
        
        
    )
}

export default VideoPlayer;