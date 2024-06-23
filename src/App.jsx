import { useContext } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import { QuizContext } from "./context/Context"

import Home from "./components/home/Home"
import Question from "./components/question/Question"
import EndOfQuiz from "./components/endOfQuiz/endOfQuiz"

import "./app.scss"
import "./index.css"

function App() {

  const { selectedSubject, toggle } = useContext(QuizContext)

  return (
    <main className={`${toggle ? "dark" : "light"} App pt-20 pb-10 grid grid-cols-1 justify-center items-center`}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home/>}/>
          <Route path={`${selectedSubject.title}`} element={<Question/>}/>
          <Route path="endOfQuiz" element={<EndOfQuiz/>}/>
        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App
