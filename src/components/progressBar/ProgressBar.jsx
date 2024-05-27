import { useContext } from "react"
import { QuizContext } from "../../context/Context"

import "./progressBar.scss"

function ProgressBar() {
    const { selectedSubject, index, answer } = useContext(QuizContext)

    const totalQuestions = selectedSubject.questions.length

    const progress = (index + Number(answer !== null))

    return (
        <progress value={progress} max={totalQuestions}></progress>
    )
}

export default ProgressBar
