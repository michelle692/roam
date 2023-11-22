import { createContext } from "react";

// EVERY FIELD SHOULD BE EMPTY. DO NOT MAKE API CALLS IN HERE, SET THE VALUES IN THE APPROPRIATE EVENT.
export const RoamContext = createContext({
  username: "",
  name: "",
  user_id: "",

  citiesVisited: [{
    date: "10/17/23",
    city: "Atlanta",
    country: "United States",
    note: "Visited the Georgia Tech Campus",
    lat: 33.47,
    lng: -84.20
  },
  {
    date: "9/04/22",
    city: "Madrid",
    country: "Spain",
    note: "Visited my family to celebrate a birthday!",
    lat: 40.42,
    lng: -3.7
  }],

  wishlist: [],

  cityCount: 0,
  stateCount: 0,
  countryCount: 0,
  continentCount: 0
}
)