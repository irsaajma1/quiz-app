import React, { useState } from "react";
import QuizData from "./QuizData";
import Timer from "./Timer";
import QuizResult from "./QuizResult";
import './Quiz.css';

const Quiz = () => {
    const [score, setScore] = useState(0);
    const [takeanswer, setTakeAnswer] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [skippedQuestions, setSkippedQuestions] = useState([]);
    const [isShowingSkipped, setIsShowingSkipped] = useState(false);
    const [currentSkippedQuestion, setCurrentSkippedQuestion] = useState(0);
    

    function onClickHandler() {
        updateQuestion();
        if (currentQuestion < QuizData.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setTakeAnswer(0);
            
        } else {
            setShowResult(true);
        }
    }

    const onSkipQuestion = () => {
        // Add the current question index to the skippedQuestions array
        setSkippedQuestions([...skippedQuestions, currentQuestion]);
        // Move to the next question
        if (currentQuestion < QuizData.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setTakeAnswer(0);
        } else {
            // If it's the last question, show the result
            setShowResult(true);
        }
    };

    const updateQuestion = () => {
        console.log(QuizData[currentQuestion].answer);
        if (takeanswer === QuizData[currentQuestion].answer) {
            setScore(score + 1);
        }
    }

    const resetAll = () => {
        setCurrentQuestion(0);
        setScore(0);
        setTakeAnswer(0);
        setSkippedQuestions([]);
        setShowResult(false);
    }

    const timeHandler = () => {
        //check if nextSkippedQuestion is true
        //if true run nextskippedQuestion again
        //if false run onClickHandler
        if(isShowingSkipped)
        {
            nextSkippedQuestion();
        }
        else{
        onClickHandler();
        }
    }

    const showSkippedQuestions = () => {
        setIsShowingSkipped(true);
        setCurrentSkippedQuestion(0);
    }

    const nextSkippedQuestion = () => {
        updateQuestion();
        if(currentSkippedQuestion <skippedQuestions.length-1)
        {
        console.log("insidenextskippedquestion 1st if");
        setCurrentSkippedQuestion(currentSkippedQuestion + 1);
        }
       else if(currentQuestion < QuizData.length-1)
        {
            setIsShowingSkipped(false);
        }
        else{
            console.log("insidenextskippedquestion 3rd if");
            setShowResult(true);
        }
    }

    const getCurrentSkippedQuestion = () => {
        return skippedQuestions[currentSkippedQuestion];
    }

    return (
        <div>
            <div className="container">
           
                {showResult ? (
                    <QuizResult score={score} totalScore={QuizData.length} tryAgain={resetAll} />
                ) : (
                    <> 
                    

                        <p className="heading-text">Quiz APP</p>
                        {isShowingSkipped ? (
                            <div className="question">
                                <Timer duration={3} onTimeUp={timeHandler} />
                                <span id="question-number">{getCurrentSkippedQuestion() + 1}</span>
                                <span id="question-txt">{QuizData[getCurrentSkippedQuestion()].question}</span>
                            </div>
                        ) : (
                            
                            <div className="question">
                                <Timer duration={3} onTimeUp={timeHandler} />
                                <span id="question-number">{currentQuestion + 1}</span>
                                <span id="question-txt">{QuizData[currentQuestion].question}</span>
                            </div>
                        )}
                       
                        <div className="option-container">
                            {isShowingSkipped ? (
                                QuizData[getCurrentSkippedQuestion()].option.map((options, i) => (
                                    <button
                                        className={`option-btn ${takeanswer === i + 1 ? "checked" : null}`}
                                        key={i}
                                        onClick={() => { setTakeAnswer(i + 1) }}
                                    >
                                        {options}
                                    </button>
                                ))
                            ) : (
                                QuizData[currentQuestion].option.map((options, i) => (
                                    <button
                                        className={`option-btn ${takeanswer === i + 1 ? "checked" : null}`}
                                        key={i}
                                        onClick={() => { setTakeAnswer(i + 1) }}
                                    >
                                        {options}
                                    </button>
                                ))
                            )}
                        </div>
                        {!isShowingSkipped && (
                            <>
                                <input type="button" value="Next" id="next-button" onClick={onClickHandler} />
                                <br></br>
                                <input type="button" value="Skip" id="skip-button" onClick={onSkipQuestion} />
                            </>
                        )}
                        {isShowingSkipped && (
                            <input type="button" value="Next skipped" id="next-skipped-button" onClick={nextSkippedQuestion} />
                        )}
                        {!isShowingSkipped && skippedQuestions.length > 0 && (
                            <input type="button" value="Show Skipped Questions" id="show-skipped-button" onClick={showSkippedQuestions} />
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

export default Quiz;