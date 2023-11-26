import React from "react";
import { useNavigate } from "react-router";
import "../css/App.css"

//React icon imports
import { BsGlobe2 } from 'react-icons/bs'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { PiStarDuotone } from 'react-icons/pi'
import { CiLocationArrow1 } from 'react-icons/ci'

//Background image
import Earth from '../static/earth.png'

//Button component
import Button from "../components/Button";

function Information() {
    const navigate = useNavigate();

    return (
        <main className="info-div">
            <img src={Earth} className="earth" />
            <div className="transparent">
                <article className="container">
                    <h1> ROAM </h1>
                    <p> Log your journeys and plan your adventures from the convenience of a web browser. </p>
                    <div className="info-columns">
                        <section className="info-column">
                            <BsGlobe2 fontSize={'25px'} />
                            <h3> Interact with a 3D Globe </h3>

                            <p> Our landing page consists of a globe that the user can interact with by rotating it, zooming in,
                                and clicking on pins of locations they have traveled to.
                            </p>
                        </section>

                        <section className="info-column">
                            <IoIosAddCircleOutline fontSize={'25px'} />
                            <h3> Add every new trip </h3>

                            <p> After completing a trip, mark your memories on the globe by clicking "Add Location" and then
                                searching for the city you visited. Add notes to remember your journey!
                            </p>
                        </section>

                        <section className="info-column">
                            <PiStarDuotone fontSize={'25px'} />
                            <h3> Create a wishlist </h3>
                            <p> Plan your future adventures using our wishlist feature. Add notes of landmarks you plan to visit
                                or sights you plan to see when you go on the trip of your dreams.
                            </p>
                        </section>
                    </div>
                    <br />
                    <Button start={true} onClick={() => navigate('/')}> GET STARTED <CiLocationArrow1 fontSize={'20px'} /> </Button>
                </article>
            </div>
        </main>
    )
}

export default Information;