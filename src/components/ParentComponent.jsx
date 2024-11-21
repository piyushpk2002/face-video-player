import React, { useEffect, useRef, useState } from "react";
import Controllers from "./Controllers";
import VideoPlayer from "./VideoComponent"; 
import * as faceapi from "face-api.js";
import test_video from '../assets/test_video.mp4'
import { div } from "@tensorflow/tfjs";
import smiley from "../assets/smiley2.png"

function ParentComponent(){
    const [currTime, setcurrTime] = useState(0);
    const videoRef = useRef();
    const [isPlaying, setPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [ismodelLoaded, setmodeLoaded] = useState(false);
    const videoRef2 = useRef();
    const [captureVideo, setCaptureVideo] = useState(false);
    const [isbtn, setisBtn] = useState(false);


    useEffect(()=>{

        //load models
        
        const loadModels = async ()=>{
            const MODEL_URL = `${import.meta.env.VITE_PUBLIC_URL}`;

           await Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
                faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
                faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
                faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
                faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL) 
            ])
            .then(setmodeLoaded(true))
            .catch(console.log("model not loaded"));
        }

        //execute loadModels function to load models every time the component re renders
         loadModels();

        
        //This interval runs at an interval of every 1 second and updates the currentTime which makes the progress bar progress
        if(captureVideo){
                
            const interval = setInterval(async () => {
    
                setDuration(videoRef?.current?.duration);
                setcurrTime(videoRef?.current?.currentTime);
    
               
    
                //detecting face
                const detection = await faceapi.detectSingleFace(videoRef2.current).withFaceExpressions();
                detection.expressions.happy>0.7?console.log("happy"):console.log("sad");
                console.log(captureVideo);
                
                if(captureVideo && detection.expressions.happy>0.7){
                    
                        videoRef.current.play();
                        setPlaying(true);
                        console.log(isbtn);
                    
                }else{
                    videoRef.current.pause();
                    setPlaying(false);
                }
    
              },2000);
             
              //This clears the previous interval berfore executing the new interval
              //if not done, each time useEffect renders it registers a new interval which can cause performance issues
              //The other thing we can do is to remove the dependency array, but then we have to do unnecessary duration updates
              
              return()=> clearInterval(interval);
        }

    }, [captureVideo, isPlaying])

    const  startVideo = async () => {
        setCaptureVideo(true);
        navigator.mediaDevices
          .getUserMedia({ video: { width: 300 } })
          .then(stream => {
            let video = videoRef2.current;
            video.srcObject = stream;
            video.play();
          })
          .catch(err => {
            console.error("error:", err);
          });
      }

    

    const handlePlayback  =  async () =>{
       await startVideo();
       

        //play pause button logic
        // if(isPlaying){
        //     videoRef.current.pause();
        //     setPlaying(false);
        // }
        // else{
        //     videoRef.current.play();
        //     setPlaying(true);
        //    // console.log(isPlaying);
        // }
    }

    const onSeek = (value)=>{
        videoRef.current.currentTime = value;
        setcurrTime(value);
    }

    

    return(
        <div className = 'flex justify-center flex-col static max-[900px]:h-[500px] max-[700px]:h-[350px]'>

            <div className="border-4 rounded-sm
             border-purple-700 shadow-[0px_0px_100px_200px_rgba(102,51,153,0.4)] relative w-[800px] m-auto max-[850px]:w-[600px] max-[700px]:w-[400px] max-[450px]:w-[350px]">
                {isPlaying?null:<img src={smiley} alt="Smile to Watch the video" width="400rem"  className="z-20 absolute top-[16%] right-[25%] max-[850px]:w-[20rem]
                max-[630px]:bottom-[38%] max-[630px]:w-[10rem] max-[700px]:right-[28%] max-[450px]:right-[26%]" />}
                <VideoPlayer 
                width="800px"
                videoRef = {videoRef}
                src = {test_video} 
                
                />
            </div>
                <div>
                    <Controllers
                    isPlaying = {isPlaying} 
                    handlePlayback = {handlePlayback}
                    currentTime = {currTime}
                    duration = {duration} 
                    onSeek={onSeek}           
                    ></Controllers>
                </div>
            

            <div className={`relative z-10 ${isPlaying?("border-4 border-green-500"):"border-4 border-red-600"} 
            bottom-[30%] left-[78%] w-[150px]  max-[850px]:w-[100px] max-[850px]:left-[80%]
            max-[630px]:w-[60px] max-[630px]:bottom-[38%] max-[450px]:bottom-[42%] max-[450px]:h-[50px] overflow-hidden`}>
                <VideoPlayer videoRef = {videoRef2} width = "150px" />
            </div>
        </div>
    )
}

export default ParentComponent;