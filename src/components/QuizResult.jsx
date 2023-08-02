import './Quiz.css';
const QuizResult=(props)=>{
    return(
        <div>
  <div className="container">
  
    <div className="show-score">
      You Scored:{props.score}<br></br>
       Out of :{props.totalScore}
    </div>
    
    <button type="button" value="Next" id="tryagain-button" onClick={props.tryAgain}> TRY AGAIN</button>
      
  </div>
  </div>
    );
}
export default QuizResult;