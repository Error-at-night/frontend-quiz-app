import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { QuizContext } from "../../context/Context";

import ToggleButton from "../toggleButton/ToggleButton";

import "./home.scss"

import iconMoonDark from "../../assets/images/icon-moon-dark.svg"
import iconMoonLight from "../../assets/images/icon-moon-light.svg"
import iconSunDark from "../../assets/images/icon-sun-dark.svg"
import iconSunLight from "../../assets/images/icon-sun-light.svg"

function Home() {
  
  const { questions, dispatch, toggle } = useContext(QuizContext)

  const navigate = useNavigate()
  
  const iconBgColors = {
    HTML: "#FFF1E9",
    CSS: "#E0FDEF",
    JavaScript: "#EBF0FF",
    Accessibility: "#F6E7FF",
  }

  const handleDispatch = (question) => {
    dispatch({ type: "selectedSubject", payload: question.id })
    navigate(`/${question.title}`)
    sessionStorage.setItem("question", JSON.stringify(question))
  }

  return (
    <section className={`${toggle ? "dark" : "light"} box-border px-3 sm:px-5 block md:flex justify-evenly items-center relative z-10`}>
      <div className="block md:grid grid-cols-2">
        <div className="col-start-1 col-end-3 flex justify-end mb-10">
          {toggle ? <img src={iconSunLight} className="me-5" /> : <img src={iconSunDark} className="me-5"/>}
          <ToggleButton/>
          {toggle ? <img src={iconMoonLight} className="ms-5" /> : <img src={iconMoonDark} className="ms-5"/>} 
        </div>
        <div className="col-start-1 col-end-2">
          <p className="welcome text-lg">Welcome to the</p>
          <p className="boldText text-lg mt-2">Frontend Quiz!</p>
          <p className="small mt-8 italic mb-10 md:mb-0 text-lg"><small>Pick a subject to get started.</small></p>
        </div>
        <div className="col-start-2 col-end-3">
          {questions.map((question) => (
            <div key={question.id} className=""> 
              <button className="mb-10 py-3 pl-5 md:pr-72 flex items-center w-full md:max-w-sm lg:max-w-lg cursor-pointer quizTitle" 
                onClick={() => handleDispatch(question)}
              >
                <div className="flex items-center">
                  <img src={question.icon} alt={question.title} className="iconBgColors" style={{ backgroundColor: iconBgColors[question.title] }} width={42} height="auto" />
                  <p className="text-white-500 ml-5 uppercase font-bold text-lg">{question.title}</p>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Home
