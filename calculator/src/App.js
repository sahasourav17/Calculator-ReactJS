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
            if(state.overwrite){
                return {
                    ...state,
                    curOperand: payload.digit,
                    overwrite: false
                }
            }

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

        case ACTIONS.CHOOSE_OPERATION:
            if (state.curOperand == null && state.prevOperand == null){
                return state
            }
            if (state.curOperand == null){
                return {
                    ...state,
                    operation: payload.operation
                }
            }

            if (state.prevOperand == null){
                return{
                    ...state,
                    operation : payload.operation,
                    prevOperand : state.curOperand,
                    curOperand: null
                }
            }
            
            return {
                ...state,
                prevOperand: evaluate(state),
                curOperand : null,
                operation: payload.operation
            }
        
        case ACTIONS.CLEAR:
            return {}

        case ACTIONS.DELETE_DIGIT:
            if (state.overwrite){
                return {
                    ...state,
                    overwrite: false,
                    curOperand: null
                }
            }
            else if(state.curOperand == null){
                return state
            }
            else if(state.curOperand.length === 1){
                return {
                    ...state,
                    curOperand: null
                }
            }
            else{
                return {
                    ...state,
                    curOperand: state.curOperand.slice(0,-1) //remove last digit
                }
            }
        
        case ACTIONS.EVALUATE:
            if (state.operation == null ||
                state.curOperand == null ||
                state.prevOperand == null) {
                    return state
                }
            
            return {
                ...state,
                overwrite:true,
                prevOperand : null,
                operation: null,
                curOperand: evaluate(state)
            }
    }

}

function evaluate({curOperand,prevOperand,operation}) {
    const curr = parseFloat(curOperand);
    const prev = parseFloat(prevOperand);
    if(isNaN(prev) || isNaN(curr)){
        return ""
    }

    let result = "";
    switch(operation){
        case "+":
            result = prev+curr
            break
        case "-":
            result = prev-curr
            break
        case "x":
            result = prev*curr
            break
        case "/":
            if(curOperand !== '0'){
                result = prev / curr
                break
            }
            else{
                result = "Error!!"
            }
    }
    return result.toString()
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us",{
    maximumFractionDigits: 0
})

function formatOperand(operand){
    if (operand == null) return
    const[integer,decimal] = operand.split('.')
    if (decimal == null) return INTEGER_FORMATTER.format(integer)

    return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

function App(){
    
    const [{curOperand,prevOperand, operation }, dispatch] = useReducer(reducer,{})

    return(
        <div className="calculator-grid">
            <div className="output">
                <div className="prev-operand">{formatOperand(prevOperand)} {operation}</div>
                <div className="cur-operand">{formatOperand(curOperand)}</div>
            </div>
            <button className="span-two" onClick={()=>dispatch({
                type : ACTIONS.CLEAR
            })}>AC</button>

            <button onClick={()=>dispatch({
                type : ACTIONS.DELETE_DIGIT
            })}>DEL</button>
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
            <button className="span-two" onClick={()=>dispatch({
                type : ACTIONS.EVALUATE
            })}>=</button>
        </div>
    )
}
export default App