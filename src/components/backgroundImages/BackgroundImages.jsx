import { useContext } from "react"
import { QuizContext } from "../../context/Context"

import darkDesktopPattern from "../../assets/images/pattern-background-desktop-dark.svg"
import lightDesktopPattern from "../../assets/images/pattern-background-desktop-light.svg"
import darkTabletPattern from "../../assets/images/pattern-background-tablet-dark.svg"
import lightTabletPattern from "../../assets/images/pattern-background-tablet-light.svg"

function BackgroundImages() {
    const { toggle } = useContext(QuizContext)
  return (
    <div>
      <img
        src={darkDesktopPattern}
        alt="pattern img"
        className={`desktop:hidden absolute  inset-0 transition-all duration-300 ${
         toggle ? "opacity-100" : "opacity-0"
        }`}
      />

      <img
        src={lightDesktopPattern}
        alt="pattern img"
        className={`desktop:hidden absolute  inset-0 transition-all duration-300 ${
         toggle ? "opacity-0" : "opacity-100"
        }`}
      />

      <img
        src={lightTabletPattern}
        alt="pattern img"
        className={`desktop:block absolute  inset-0 hidden transition-all duration-300 ${
         toggle ? "opacity-0" : "opacity-100"
        }`}
      />
      <img
        src={darkTabletPattern}
        alt="pattern img"
        className={`desktop:block absolute  inset-0 hidden transition-all duration-300 ${
         toggle ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  )
}

export default BackgroundImages
