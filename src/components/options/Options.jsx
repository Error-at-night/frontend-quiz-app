import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"

import { QuizContext } from "../../context/Context"

import correct from "../../assets/images/icon-correct.svg"
import incorrect from "../../assets/images/icon-incorrect.svg"

import "./option.scss"

function Options() {

    const navigate = useNavigate()
    
    const [clickedOption, setClickedOption] = useState(null)
    const [submit, setSubmit] = useState(false)
    const [submitAttempted, setSubmitAttempted] = useState(false)

    const { selectedSubject, index, dispatch, answer, toggle } = useContext(QuizContext)

    const selectedAnswer = answer !== null
    const correctAnswer = selectedSubject.questions[index].answer

    const handleOptionClick = (option) => {
        if (!selectedAnswer && !submit) {
            setClickedOption(option)
            setSubmitAttempted(false)
        } else if (submit) {
            setClickedOption(option)
            setSubmitAttempted(false)
            setSubmit(false)
        }
    }

    const handleSubmitAnswer = () => {
        if (clickedOption !== null) {
            dispatch({ type: "answer", payload: clickedOption })

            if (clickedOption === correctAnswer) {
                dispatch({ type: "correctAnswer" })
            } else {
                dispatch({ type: "wrongAnswer" })
            }

            setSubmit(true)
        } else {
            setSubmitAttempted(true)
        }
    }

    const handleNextQuestion = () => {
        dispatch({ type: "nextQuestion" })
        setClickedOption(null)
        setSubmit(false)
        setSubmitAttempted(false)
    }

    const alphabets = ["A", "B", "C", "D"]

    const handleFinishQuizDispatch = () => {
        dispatch({ type: "endOfQuiz" })
        navigate("/endOfQuiz")
    }

    return (
        <>
            {selectedSubject.questions[index].options.map((option, index) => (
                <div key={option} className="cursor-pointer">
                    <button
                        className={`mb-10 py-4 px-3 text-start flex items-center font-bold text-lg w-full outline-none quizOption group cursor-pointer
                            ${clickedOption === option && !submit ? "border-4 border-purple-500" : ""}
                            ${submit && option === clickedOption && option === correctAnswer ? "border-4 border-green-400" : ""}
                            ${submit && option === clickedOption && option !== correctAnswer ? "border-4 border-red-500" : ""}
                            ${!submit ? "hover:border-4 hover:border-purple-500 cursor-pointer" : "cursor-not-allowed"}
                        `}
                        onClick={!submit ? () => handleOptionClick(option) : null}
                    >
                        <span className={`px-3 py-2 ms-2 me-6 alphabets
                                ${clickedOption === option && !submit ? toggle ? "bg-purple-500" : "text-white bg-purple-500" : clickedOption === option && !submit ? "bg-white text-customBlue" : "text-customBlue bg-customLightBlue"}
                                ${submit && option === clickedOption && option === correctAnswer ? "bg-green-300 text-white" : ""}
                                ${submit && option === clickedOption && option !== correctAnswer ? "bg-red-500 text-white" : ""}
                                ${!submit && "group-hover:bg-purple-100 group-hover:text-purple-500"}
                            `}
                        >
                            {alphabets[index]}
                        </span>
                        <span>{option}</span>
                        <span className="ml-auto">
                            {submit && option === correctAnswer && <img src={correct} alt="correct" width={30} height={30}/>}
                            {submit && option === clickedOption && option !== correctAnswer && <img src={incorrect} alt="incorrect" width={30} height={30}/>}
                        </span>
                    </button>
                </div>
            ))}
            <div className="text-center">
            {submit ? (
                index === selectedSubject.questions.length - 1 ? (
                    <button
                        className="mb-10 py-6 px-3 rounded-2xl w-full outline-none cursor-pointer transition-colors ease-in-out duration-200 finishQuiz font-bold text-lg text-white bg-purple-600 hover:bg-purple-400"
                        onClick={handleFinishQuizDispatch}
                    >
                        Finish Quiz
                    </button>
                ) : (
                    <button
                        className="mb-10 py-6 px-3 rounded-2xl w-full outline-none cursor-pointer transition-colors ease-in-out duration-200 nextQuestion font-bold text-lg text-white bg-purple-600 hover:bg-purple-400"
                        onClick={handleNextQuestion}
                    >
                        Next Question
                    </button>
                )
            ) : (
                <button
                    className="mb-10 py-6 px-3 rounded-2xl w-full outline-none cursor-pointer transition-colors ease-in-out duration-200 submitAnswer font-bold text-lg text-white bg-purple-600 hover:bg-purple-400"
                    onClick={handleSubmitAnswer}
                >
                    Submit Answer
                </button>
            )}

            </div>
            {submitAttempted && clickedOption === null && (
                <div className="flex items-center justify-center">
                    <img src={incorrect} alt="incorrect" width={30} height={30}/>
                    <p className="text-red-500 text-center ms-2">Please select an answer</p>
                </div>
            )}
        </>
    )
}

export default Options
