import { useContext } from "react"
import { QuizContext } from "../../context/Context"
import "./toggleButton.scss"

function ToggleButton() {
  const { toggle, dispatch } = useContext(QuizContext)

  const toggleMode = () => {
    dispatch({ type: "toggle", payload: !toggle})
  }

  return (
    <label className="switch">
      <input type="checkbox" defaultChecked={toggle ? true : false} onChange={toggleMode}/>
      <span className="slider round"></span>
    </label>
  )
}

export default ToggleButton
