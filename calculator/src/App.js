import React, { useReducer } from "react";
import "./styles.css";
import DigitBtn from "./DigitBtn";
import OperationBtn from "./OperationBtn";

export const ACTIONS = {
    ADD_DIGIT : 'add-digit',
    CHOOSE_OPERATION : 'choose-operation',
    CLEAR :'clear',
    DELETE_DIGIT : 'delete-digit',
    EVALUATE : 'evaluate'
}
function reducer(state, {type,payload}){
    switch(type) {
        case ACTIONS.ADD_DIGIT:
            if (payload.digit === "0" && state.curOperand === "0"){
                return state
            }
            if (payload.digit === "." && state.curOperand.includes(".")){
                return state
            }
            return {
                ...state,
                curOperand: `${state.curOperand || ""}${payload.digit}`
            }
        case ACTIONS.CLEAR:
            return {}
    }

}

function App(){
    const [{curOperand,prevOperand, operation }, dispatch] = useReducer(reducer,{})
    // dispatch({
    //     type :ACTIONS.ADD_DIGIT,
    //     payload : {digit: 1}
    // })

    return(
        <div className="calculator-grid">
            <div className="output">
                <div className="prev-operand">{prevOperand} {operation}</div>
                <div className="cur-operand">{curOperand}</div>
            </div>
            <button className="span-two" onClick={()=>dispatch({
                type : ACTIONS.CLEAR
            })}>AC</button>

            <button>DEL</button>
            <OperationBtn operation="/" dispatch={dispatch}/>
            <DigitBtn digit="1" dispatch={dispatch}/>
            <DigitBtn digit="2" dispatch={dispatch}/>
            <DigitBtn digit="3" dispatch={dispatch}/>
            <OperationBtn operation="x" dispatch={dispatch}/>
            {/* <operationBtn /> */}
            <DigitBtn digit="4" dispatch={dispatch}/>
            <DigitBtn digit="5" dispatch={dispatch}/>
            <DigitBtn digit="6" dispatch={dispatch}/>
            <OperationBtn operation="+" dispatch={dispatch}/>
            <DigitBtn digit="7" dispatch={dispatch}/>
            <DigitBtn digit="8" dispatch={dispatch}/>
            <DigitBtn digit="9" dispatch={dispatch}/>
            <OperationBtn operation="-" dispatch={dispatch}/>
            <DigitBtn digit="." dispatch={dispatch}/>
            <DigitBtn digit="0" dispatch={dispatch}/>
            <button className="span-two">=</button>
        </div>
    )
}
export default App