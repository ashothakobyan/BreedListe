import React, { useContext, useEffect, useState } from "react";
import "./BreedList.css";
import CircularProgress from '@mui/material/CircularProgress';
import { Card, CardContent, CardMedia, List, ListItemButton, ListItemText, TextField, Typography } from "@mui/material";
import Collapse from '@mui/material/Collapse';
import { maxHeight } from "@mui/system";
import { Link, Routes, Route } from "react-router-dom";
import ImgDog from "./ImgDog";
import ThemeContext from "./contexts/ThemeContext";
import LanguageContext from "./contexts/LanguageContext";



function BreedList() {
  const [breedNames, setBreedNames] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, SetIsOpen] = useState({})
  const [searchText, setSearchText] = useState("")
  const theme = useContext(ThemeContext)
  const lng = useContext(LanguageContext)

  const getDAta = async () => {
    setIsLoading(true)
    const res = await fetch("https://dog.ceo/api/breeds/list/all")
    const data = await res.json()
    setBreedNames(data.message)
    setIsLoading(false)
  }
  useEffect(() => getDAta(), [])

  const cheangBreedListOpen = (el) => {
    let prop = { ...isOpen }
    prop[el] = !prop[el]
    SetIsOpen(prop)
  }

  const bredlist = Object.keys(breedNames)
  return (
    <div style={{
      display: "flex",


    }}>
      <div>{theme}</div>
      <div>"         "</div>
      <div>{lng}</div>
      {isLoading ? <CircularProgress /> : <List style={{ height: 500, overflowY: "auto" }}>
        <TextField id="outlined-basic" label="Outlined" variant="outlined" onChange={(e) => { setSearchText(e.target.value) }} value={searchText} />
        {bredlist.filter((el) => el.includes(searchText)).map((el) =>
          <React.Fragment key={el}>
            <Link to={`/Breed/${el}`}
              style={{
                cursor: "pointer",
                color: breedNames[el].length ? "red" : "black"
              }}><ListItemText style={{ margin: 30 }} primary={el} />
            </Link>
            {
              breedNames[el].length ? (

                < Collapse in={isOpen[el]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {breedNames[el].map((subBreed) => {
                      return (
                        <div></div>
                        // <ListItemButton key={subBreed} onClick={() => { cheangSRc(el + "/" + subBreed) }} key={subBreed} sx={{ pl: 4 }}>
                        //   <ListItemText primary={subBreed} />
                        // </ListItemButton>
                      )
                    })}
                  </List>
                </Collapse>

              ) : null
            }
          </React.Fragment>
        )}
      </List>}
      <Routes>
        <Route path={`/Breed/:breed`} element={<ImgDog />} />
      </Routes>


    </div >
  )


}

export default BreedList