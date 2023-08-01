import React,{useState, useEffect,useRef} from "react";
const Timer=(props)=>{
    const [counter,setCounter]=useState(0); 
      const intervalRef =useRef();

      useEffect(()=>{
      intervalRef.current= setInterval(()=>{
        setCounter((cur)=> cur+1);
      },1000);
     
      return()=> clearInterval(intervalRef.current);

    },[ ]);

    useEffect(()=>{
         if(counter === props.duration)
        { 
           clearInterval(intervalRef.current);
            setInterval(() =>{
              props.onTimeUp();
             
            },3000);
  
        }
     },[counter]);
    return(
        <div>
         
        </div>
    )
 
}
export default Timer;