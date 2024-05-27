import { useContext } from "react"

import { QuizContext } from "../../context/Context"

import ToggleButton from "../toggleButton/ToggleButton"
import Options from "../options/Options"
import ProgressBar from "../progressBar/ProgressBar"

import iconMoonDark from "../../assets/images/icon-moon-dark.svg"
import iconMoonLight from "../../assets/images/icon-moon-light.svg"
import iconSunDark from "../../assets/images/icon-sun-dark.svg"
import iconSunLight from "../../assets/images/icon-sun-light.svg"

import "./question.scss"

function Question() {
  
  const { selectedSubject, index, toggle } = useContext(QuizContext)

  console.log(selectedSubject)

  const iconBgColors = {
    HTML: "#FFF1E9",
    CSS: "#E0FDEF",
    JavaScript: "#EBF0FF",
    Accessibility: "#F6E7FF",
  }

  const courseLength = selectedSubject.questions.length

  return (
    <section className={`${toggle ? "dark" : "light"} box-border px-3 sm:px-5 block md:flex justify-evenly items-center`}>
      <div className="block w-full md:max-w-2xl lg:max-w-6xl lg:grid grid-cols-5 lg:gap-x-28">
        <div className="col-start-1 col-end-6 flex justify-between items-center mb-10">
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
          <p className="mb-8 italic number text-lg">Question {[index + 1]} of {courseLength}</p>
          <p className="w-full max-w-xl text-2xl font-bold">{selectedSubject.questions[index].question}</p>
          <div className="mt-8">
            <ProgressBar/>
          </div>
        </div>
        <div className="col-start-3 col-end-6">
          <Options />
        </div>
      </div>
    </section>
  )
}

export default Question
