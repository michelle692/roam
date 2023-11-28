import React, { useEffect, useState } from "react";
import "@fontsource/overpass-mono";
import styled from 'styled-components';
import { AiFillStar } from "react-icons/ai";
import { GetRanking } from "../utils/api";

const RankingsStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  textAlign: "left",
  fontFamily: 'Overpass Mono',
  fontSize: '16px',
  fontWeight: 'normal',
  position: "absolute",
  left: "35px",
  top: "150px",
  color: "rgba(255, 255, 255, 0.7)",
  margin: "0.5rem"
}

const Rankings = () => {
  const [rankings, setRankings] = useState([])
  useEffect(() => {
    GetRanking().then((result) => {
      setRankings(result)
    })
  }, [])

  console.log("rankings: ", rankings)

  return (
    <section>
      <div style={RankingsStyle}>
        <span>OUR USERS' TOP 5 MOST</span>
        <span>VISITED CITIES:</span>
        
        {/* <span> 1. {stateCount}</span>
        <span> 2. {countryCount}</span>
        <span> 3. {cityCount}</span>
        <span> 4. {countryCount}</span>
        <span> 5. {countryCount}</span> */}
      </div>
    </section>
  )
}
export default Rankings;