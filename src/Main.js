import React, { useReducer, useState } from "react";
import BreedList from "./BreedList";
import { DECREMENT_COUNT, INCREMENT_COUTN, LNG_CHANGE, THEME_CHANGE } from "./constants/actionsTypes";
import DispatchContext from "./contexts/DispatchContext";
import LanguageContext from "./contexts/LanguageContext";
import ThemeContext from "./contexts/ThemeContext";
import Header from "./Header";


const i = {
  count: 0,
  lng: "Eng",
  theme: "Ligth"
}

function reducer(state, action) {
  console.log(state, action, "Reducer Called")
  switch (action.type) {
    case LNG_CHANGE:
      return {
        ...state,
        lng: action.payload
      }
    case THEME_CHANGE:
      return {
        ...state,
        theme: state.theme === "Ligth" ? "Dark" : "Ligth"
      }
    case INCREMENT_COUTN:
      return {
        ...state,
        count: state.count + 1
      };
    case DECREMENT_COUNT:
      return {
        ...state,
        count: state.count - 1
      };
    default:
      throw new Error();
  }
}

function Main() {
  const [state, dispatch] = useReducer(reducer, i);

  return (
    <DispatchContext.Provider value={dispatch}>
      <ThemeContext.Provider value={state.theme}>
        <LanguageContext.Provider value={state.lng}>
          <div style={{
            backgroundColor: state.theme === "Ligth" ? "white" : "gray"
          }}>
            <div>
              Count: {state.count}
              <button onClick={() => dispatch({ type: DECREMENT_COUNT })}>-</button>
              <button onClick={() => dispatch({ type: INCREMENT_COUTN })}>+</button>
            </div>
            <Header />
            <BreedList />
          </div>
        </LanguageContext.Provider>
      </ThemeContext.Provider>
    </DispatchContext.Provider>

  )

}

export default Main