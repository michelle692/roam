import React from "react";
import "../css/App.css"
import { BsGlobe2 } from 'react-icons/bs'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { PiStarDuotone } from 'react-icons/pi'
import { FiArrowRightCircle } from 'react-icons/fi'
import { CiLocationArrow1 } from 'react-icons/ci'

import Earth from '../static/earth.png'
import Button from "../components/Button";
import { useNavigate } from "react-router";

function Information() {
    const navigate = useNavigate();

    return (
        <div className="info-div">
            <img src={Earth} className="earth"/>
            <div className="transparent">
                <h1> ROAM </h1>
                <p> Log your journeys and plan your adventures from the convenience of a web browser. </p>
                <div className="info-columns"> 
                    <div className="info-column">
                        <BsGlobe2 fontSize={'25px'}/>
                        <h3> Interact with a 3D Globe </h3>

                        <p> Our landing page consists of a globe that the user can interact with by rotating it, zooming in,
                            and clicking on pins of locations they have traveled to.
                        </p>
                    </div>

                    <div className="info-column">
                        <IoIosAddCircleOutline fontSize={'25px'}/>
                        <h3> Add every new trip </h3>

                        <p> After completing a trip, mark your memories on the globe by clicking "Add Location" and then
                            searching for the city you visited. Add notes to remember your journey!
                        </p>
                    </div>

                    <div className="info-column">
                        <PiStarDuotone fontSize={'25px'}/>
                        <h3> Create a wishlist </h3>

                        <p> Plan your future adventures using our wishlist feature. Add notes of landmarks you plan to visit
                            or sights you plan to see when you go on the trip of your dreams.
                        </p>
                    </div>
                </div>

                <Button start={true} onClick={() => navigate('/')}> GET STARTED <CiLocationArrow1 fontSize={'20px'}/> </Button>
            </div>
        </div>
    )
}

export default Information;