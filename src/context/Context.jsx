import { useReducer, useEffect, createContext } from "react"
import { reducer } from "../reducer/reducer"

export const QuizContext = createContext()

const initialState = {
  questions: [],
  selectedSubject: [],
  status: "loading",
  error: null,
  index: 0,
  toggle: true,
  answer: null,
  correctAnswer: false,
  wrongAnswer: false,
  storeSelectedAnswers: []
}

function storeToggle(t) {
  const getToggle = localStorage.getItem("toggle")
  return getToggle ? { ...t, toggle: JSON.parse(getToggle) } : t
}

function ContextProvider({ children }) {
    const [{ questions, selectedSubject, status, error, index, toggle, answer, storeSelectedAnswers }, dispatch] = useReducer(reducer, initialState, storeToggle)
    
    useEffect(() => {
        async function fetchQuestions() {
            try {
                const res = await fetch("http://localhost:8000/quizzes")
                const data = await res.json()
                dispatch({ type: "questionsReceived", payload: data })
            } catch (err) {
                dispatch({ type: "error", payload: err.message })
            }
        }
    
        fetchQuestions()
    }, [])

    useEffect(() => {
      localStorage.setItem("toggle", JSON.stringify(toggle))
    }, [toggle])

    return (
      <QuizContext.Provider value={{ questions, selectedSubject, status, error, index, toggle, answer, storeSelectedAnswers, dispatch }}>
        <>
          {children}
        </>
      </QuizContext.Provider>
    )
}

export default ContextProvider
