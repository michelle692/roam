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
            <div className="info">
                <h1> ROAM </h1>
                <p> We give you the ability to record your travel at the tip of your fingers. </p>
                <div className="info-columns"> 
                    <div className="info-column">
                        <BsGlobe2 fontSize={'25px'}/>
                        <h3> Interact with a 3D Globe </h3>

                        <p> I'm a paragraph. Click here to add your own text and edit me. It’s easy. 
                            Just click “Edit Text” or double click me to add your own content and make changes to the font.</p>
                    </div>

                    <div className="info-column">
                        <IoIosAddCircleOutline fontSize={'25px'}/>
                        <h3> Add every new trip </h3>

                        <p> I'm a paragraph. Click here to add your own text and edit me. It’s easy. 
                            Just click “Edit Text” or double click me to add your own content and make changes to the font.</p>
                    </div>

                    <div className="info-column">
                        <PiStarDuotone fontSize={'25px'}/>
                        <h3> Create a wishlist </h3>

                        <p> I'm a paragraph. Click here to add your own text and edit me. It’s easy. 
                            Just click “Edit Text” or double click me to add your own content and make changes to the font.</p>
                    </div>
                </div>

                <Button start={true} onClick={() => navigate('/')}> Get Started <CiLocationArrow1 fontSize={'20px'}/> </Button>
            </div>
        </div>
    )
}

export default Information;