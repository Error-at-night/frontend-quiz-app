import { useContext } from "react"

import { QuizContext } from "./context/Context"

import Home from "./components/home/Home"
import Question from "./components/question/Question"

import "./app.scss"
import "./index.css"
import EndOfQuiz from "./components/endOfQuiz/endOfQuiz"

function App() {

  const { status, toggle } = useContext(QuizContext)

  return (
    <main className={`${toggle ? "dark" : "light"} App pt-20 pb-10 grid grid-cols-1 justify-center items-center`}>
      {status === "ready" && <Home />}
      {status === "selectedSubject" && <Question/>}
      {status === "endOfQuiz" && <EndOfQuiz/>}
    </main>
  )
}

export default App
