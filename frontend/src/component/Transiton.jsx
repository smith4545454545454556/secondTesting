import React from 'react'
import About from './About'
import { Canvas } from '@react-three/fiber'
import AboutSection from './AboutSection'

const Transiton = () => {
    return (

        <div className=' h-screen w-full flex justify-center items-center'>
            <About />

            <Canvas camera={{
                fov: 44,
                position: [2.3, 1.5, 2.3]
            }}>
                <AboutSection />
            </Canvas>
        </div>)
}

export default Transiton