import { useContext } from "react"
import { useNavigate } from "react-router-dom"

import { QuizContext } from "../../context/Context"

import ToggleButton from "../toggleButton/ToggleButton"

import iconMoonDark from "../../assets/images/icon-moon-dark.svg"
import iconMoonLight from "../../assets/images/icon-moon-light.svg"
import iconSunDark from "../../assets/images/icon-sun-dark.svg"
import iconSunLight from "../../assets/images/icon-sun-light.svg"

import "./endOfQuiz.scss"

function EndOfQuiz() {
    const navigate = useNavigate()

    const { storeSelectedAnswers, selectedSubject, dispatch, toggle } = useContext(QuizContext)
    
    const calculateScore = () => {
        return selectedSubject.questions.reduce((score, question, index) => {
            return question.answer === storeSelectedAnswers[index] ? score + 1 : score
        }, 0)
    }

    const iconBgColors = {
        HTML: "#FFF1E9",
        CSS: "#E0FDEF",
        JavaScript: "#EBF0FF",
        Accessibility: "#F6E7FF",
    }

    const courseLength = selectedSubject.questions.length

    const handlePlayAgainDispatch = () => {
        dispatch({ type: "playAgain" })
        navigate("/")
    }

    return (
        <section className={`${toggle ? "dark" : "light"} endOfQuiz box-border px-3 sm:px-5 block md:flex justify-evenly items-center`}>
            <div className="block w-full md:max-w-2xl lg:max-w-6xl lg:grid grid-cols-5 lg:gap-x-28">
                <div className="col-start-1 col-end-6 flex justify-between items-center mb-12">
                    <div className="flex items-center">
                        <img src={selectedSubject.icon} alt={selectedSubject.title} style={{ backgroundColor: iconBgColors[selectedSubject.title] }}/>
                        <span className="uppercase ms-5 title font-bold text-xl">{selectedSubject.title}</span>
                    </div>
                    <div className="flex items-center">
                        {toggle ? (<img src={iconSunLight} className="me-5" />) : (<img src={iconSunDark} className="me-5"/>)}
                        <ToggleButton/>
                        {toggle ? (<img src={iconMoonLight} className="ms-5" />) : (<img src={iconMoonDark} className="ms-5"/>)} 
                    </div>
                </div>
                <div className="col-start-1 col-end-3 mb-8 lg:mb-0">
                    <p className="completed text-lg">Quiz Completed</p>
                    <p className="youScored text-lg mt-2">You scored...</p>
                </div>
                <div className="col-start-3 col-end-6">
                    <div className="flex flex-col items-center justify-center backgroundColor mb-8 py-10">
                        <div className="flex items-center mb-8">
                            <img src={selectedSubject.icon} alt={selectedSubject.title} style={{ backgroundColor: iconBgColors[selectedSubject.title] }}/>
                            <span className="uppercase ms-5 title font-bold text-xl">{selectedSubject.title}</span>
                        </div>
                        <p className="text-6xl lg:text-8xl mb-8 font-bold">{calculateScore()}</p>
                        <p className="text-lg">out of {courseLength}</p>
                    </div>
                    <button
                        className="mb-10 py-6 px-3 rounded-2xl w-full cursor-pointer transition-colors ease-in-out duration-200 playAgain font-bold text-lg text-white bg-purple-600 hover:bg-purple-400"
                        onClick={handlePlayAgainDispatch}
                    >
                        Play Again
                    </button>
                </div>
            </div>
        </section>
    )
}

export default EndOfQuiz
