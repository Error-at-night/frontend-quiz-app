export function reducer(state, action) {
    switch(action.type) {
        case "questionsReceived":
            return {
                ...state,
                questions: action.payload,
                status: "ready"
            }

        case "error":
            return {
                ...state,
                error: action.payload
            }

        case "toggle": 
            return {
                ...state,
                toggle: action.payload
            }

        case "selectedSubject":
            return {
                ...state,
                status: "selectedSubject",
                selectedSubject: state.questions.find((question) => question.id === action.payload)
            }
        
        case "answer":
            const updatedAnswers = [...state.storeSelectedAnswers]
            updatedAnswers[state.index] = action.payload
            
            return {
                ...state,
                answer: action.payload,
                storeSelectedAnswers: updatedAnswers
            };

        case "correctAnswer":
            return {
                ...state,
                correctAnswer: true,
            }
    
        case "wrongAnswer":
            return {
                ...state,
                wrongAnswer: true,
            }

        case "nextQuestion":
            return {
                ...state,
                index: state.index <= 10 ? state.index + 1 : state.index,
                answer: null
            }
        
        case "endOfQuiz":
            return {
                ...state,
                status: "endOfQuiz",
            }

        case "playAgain":
            return {
                ...state,
                selectedSubject: [],
                status: "ready",
                error: null,
                index: 0,
                answer: null,
                correctAnswer: false,
                wrongAnswer: false,
                storeSelectedAnswers: []
            }
        
        default:
            throw new Error("Unknown action")
    }
}