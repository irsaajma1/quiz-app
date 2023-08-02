import React,{useState, useEffect,useRef} from "react";
const Timer=(props)=>{
    const [counter,setCounter]=useState(0); 
      const intervalRef =useRef();

      useEffect(()=>{
      intervalRef.current= setInterval(()=>{
        setCounter((cur)=> cur+1);
      },1000);
     return ()=> clearInterval(intervalRef.current);

    },[]);

    useEffect(()=>{
        if(counter>4.7)
        {
            setCounter((cur)=> cur=0);
           
        }
         if(counter===props.duration)
        { 
            console.log(counter);
            console.log(props.duration);
            setTimeout(() =>{
              props.onTimeUp();
             
            },300);
  
        }},[counter]);
    return(
        <div>
         
        </div>
    )
 
}
export default Timer;