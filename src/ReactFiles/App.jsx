//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
//import React from 'react'
//import { Chart as ChartJS } from 'chart.js/auto'
//import { Bar } from 'react-chartjs-2'
//import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'

import './style/App.css'
import './style/temp.css'

//import Graph from './graph.jsx'
//import BottomMenu from "./BottomMenu.jsx"
import Humidity from './humidity.jsx'
import GraphTimer from './GraphTimer.jsx'
import TempDay from './TempDay.jsx'
//import TimeSeries from './TimeSeries.jsx' //nesse tem humidade e temperatura
import CarbonMonox from './carbonMonox.jsx'
import CarbonDioxide from './carbonDiox.jsx'
import NoiseSensor from './noiseSensor.jsx'
import DirtyAirSensor from './dirtyAirSensor.jsx'
import LightSensor from './lightSensor.jsx'


function App() {

  return (
  <>
  <div className='App'>

  <GraphTimer/>
  
  <div className='temp'>
    <TempDay/>
  </div>

  <div className='temp'>
      <LightSensor/>
   </div>

  <div className='temp'>
    <Humidity/>
  </div>
  <div className='temp'>
    <CarbonMonox/>
  </div>
    
   <div className='temp'>
      <CarbonDioxide/>
   </div>

   <div className='temp'>
      <NoiseSensor/>
   </div>

   <div className='temp'>
      <DirtyAirSensor/>
   </div>


    </div>  
  </>
  )
}

export default App
