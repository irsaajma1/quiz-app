import React,{useState} from "react";
import  QuizData  from "./QuizData";
import Timer from "./Timer";
import QuizResult from"./QuizResult";
import './Quiz.css';

const Quiz = () => {
     
    const [currentQuestion,setCurrentQuestion]= useState(0);
    const [score,setScore] = useState(0);
    const[takeanswer,setTakeAnswer]= useState(0);
    const [showResult,setShowResult]=useState(false);
   
    function onClickHandler(){
       updateQuestion();
       console.log(currentQuestion);
        if(currentQuestion<QuizData.length-1)
        {
        setCurrentQuestion(currentQuestion+1);
        setTakeAnswer(0);
        }
        else{
           setShowResult(true);
        }

    }

    const updateQuestion=()=>{
     
        console.log(QuizData[currentQuestion].answer);
        if(takeanswer === QuizData[currentQuestion].answer)
        {
           setScore(score+1);
         
        }
    }
   
    const resetAll=()=>
    {
        setCurrentQuestion(0);
        setScore(0);
        setTakeAnswer(0);
        setShowResult(false);
    }

    const timeHandler = () =>
    {
      onClickHandler();
    }
    return(
<div>
   
    <div className="container">
    {showResult ? (<QuizResult score={score} totalScore={QuizData.length} tryAgain={resetAll}/>):(
                <>
        
        <p className="heading-text">Quiz APP</p>
        <div className="question">

        <span id="question-number">{currentQuestion+1}</span>
        <span id="question-txt">{QuizData[currentQuestion].question}</span>
        </div>
        <div className="option-container">
            {QuizData[currentQuestion].option.map((options,i)=>{
               return(
               <buttons className= {`option-btn ${takeanswer == i+1?"checked":null}`}key={i} onClick={()=>{setTakeAnswer(i+1)}}>
                    {options};
                </buttons>
            )})}
        </div>
        <input type="button" value="Next" id="next-button" onClick={onClickHandler}></input>
        <Timer duration={3}  onTimeUp={timeHandler}/>
        </>)}
    </div>

</div>

    )

}
export default Quiz;