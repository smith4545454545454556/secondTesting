import React, { useContext, useEffect } from 'react';
import Hero from '../component/Hero';
import Scrolling from '../component/Scrolling';
import Zoom from '../component/Zoom';
import { UserContext } from '../context/UserContext';
import Testimonials from '../component/Testimonial';
import CardSection from '../component/CardSection';

const Home = () => {
    const {
        userContextData, setUserContextData

    } = useContext(UserContext)
    useEffect(() => {
        console.log(userContextData)

    }, [userContextData])
    console.log(userContextData)
    return (
        <>
            <div className=' relative min-h-screen min-w-screen overflow-x-hidden'>

                <Hero />


                <Scrolling />

                <Zoom />
                <Testimonials />
            </div>

        </>




    );
};

export default Home;
