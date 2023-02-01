import React, { useState } from 'react'
import {
  Slice,
  VictoryArea,
  VictoryBar,
  VictoryChart,
  VictoryContainer,
  VictoryLabel,
  VictoryLine,
  VictoryPie
} from 'victory'

type PieChartDataItem = {
  x: string,
  y: number
}

type Props = {
  pieData: PieChartDataItem[]
}


const MOCK_DATA = [
    {x: "FootBall", y: 1500},
    {x: "BasketBall", y: 1000},
    {x: "BaseBall", y: 300},
    {x: "WaterPolo", y: 50}
  ]


const LineGraph = () => {

  return (
    <VictoryChart>
      
      <VictoryArea
      data={[
        {x: 0, y: 90},
        {x: 1, y: 100},
        {x: 2, y: 150},
        {x: 3, y: 75},
        {x: 4, y: 50},
        {x: 5, y: 25},
      ]}
      />
      <VictoryLabel 
      text='Users'
      x={30}
      y={30}
      />
      <VictoryLine 

      labelComponent={<VictoryLabel angle={5}/>}
      data={[
        {x: 0, y: 90},
        {x: 1, y: 100},
        {x: 2, y: 150},
        {x: 3, y: 75},
        {x: 4, y: 50},
        {x: 5, y: 25},
      ]}
      style={{
        data: {
          strokeWidth: '2px',
          stroke: 'red'
        }
      }}
      
      />
    </VictoryChart>
  )
}

function PieChart({pieData}: Props) {

  return (
    <div className='flex 
    h-screen  items-center  bg-gray-300 font-black text-4xl flex-col gap-3'>
      <div className='flex flex-col mt-12 w-full items-center gap-3'>
      <h1 className='text-4xl'>Admin Console</h1>
      <div className='grid ml-24 mr-24 grid-cols-3 grid-rows-2 w-full max-w-6xl gap-3'
      style={{
        gridRow: '.1fr 1fr'
      }}
      > 
      
        <h2 className='text-lg text-center'>Total Users Over Time (Line Graph)</h2>
        <h2 className='text-lg text-center'>Total Users By Type (Pie Chart)</h2>
        <h2 className='text-lg text-center'>User Activity by Day (Bar Graph)</h2>

        <LineGraph />
        <VictoryPie 
        data={[
          {x: "ADMINS", y: 90},
          {x: "MANAGERS", y: 100},
          {x: "CLIENTS", y: 200}
        ]}
        labelRadius={50}
        style={{
          labels: {
            fontSize: 15,
          }
        }}
        colorScale="heatmap"
        />
        <VictoryChart 
        domainPadding={25}>
          <VictoryBar
          data={[
            {x: "MON", y: 90},
            {x: "TUE", y: 100},
            {x: "WED", y: 150},
          ]}
          />
        </VictoryChart>
        
      </div>
      </div>
    </div>
  )
}


//getServerSideProps to fetch the data

// export async function getServerSideProps() {
//   const fetchResult = await fetch("https://courseapi.onrender.com/chart")
//   //getTheJson
//     const fetchJson = await fetchResult.json()

//     return {
//       props: {
//         pieData: fetchJson.data
//       }
//     }
//   }


export default PieChart