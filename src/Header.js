import { Switch } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useContext, useReducer, useState } from "react";
import { LNG_CHANGE, THEME_CHANGE } from "./constants/actionsTypes";
import DispatchContext from "./contexts/DispatchContext";
import LanguageContext from "./contexts/LanguageContext";
import ThemeContext from "./contexts/ThemeContext";

const useStyles = makeStyles({
  header: {
    height: 100,
    display: "flex"
  },
});


// const initialState = { count: 0 };



function Header() {

  const theme = useContext(ThemeContext)
  const lng = useContext(LanguageContext)
  const dispatch = useContext(DispatchContext)
  const classesForComponent = useStyles()


  const handleChange = (event) => {
    // setTheme(event.target.checked ? "Dark" : "Ligth")
    dispatch({ type: THEME_CHANGE })

  };

  const lnghandleChange = (event) => {
    // setLng(event.target.checked ? "Arm" : "Eng")
    dispatch({ type: LNG_CHANGE, payload: event.target.checked ? "Arm" : "Eng" })
  }
  return (
    <div className={classesForComponent.header}>
      Ligth
      <Switch
        checked={theme === "Dark"}
        onChange={handleChange}
      />
      Dark
      <div style={{ width: 100 }}></div>
      Eng
      <Switch
        checked={lng === "Arm"}
        onChange={lnghandleChange}
      />
      Arm
    </div>
  )
}

export default Header

