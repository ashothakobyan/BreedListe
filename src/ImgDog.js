import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import LanguageContext from "./contexts/LanguageContext";
import ThemeContext from "./contexts/ThemeContext";


function ImgDog() {
  const { breed } = useParams()
  const [src, setSrc] = useState("")

  useEffect(() => cheangSRc(breed), [breed])
  const theme = useContext(ThemeContext)
  const lng = useContext(LanguageContext)

  const cheangSRc = async (breedName) => {
    const res = await fetch(`https://dog.ceo/api/breed/${breedName}/images/random`)
    const data = await res.json()
    setSrc(data.message)
  }

  return (
    <Card sx={{ maxWidth: 345, maxHeight: 400 }}>
      <div>{theme}</div>
      <div>{lng}</div>
      <CardMedia
        component="img"
        height="200"
        image={src}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {breed}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default ImgDog