import React, { useState } from 'react'
import {
  Slice,
  VictoryChart,
  VictoryContainer,
  VictoryPie
} from 'victory'

type PieChartDataItem = {
  x: string,
  y: number
}

type Props = {
  pieData: PieChartDataItem[]
}




function PieChart({pieData}: Props) {

  return (
    <div className='flex h-screen  items-center justify-center bg-gray-300 font-black text-4xl flex-col gap-3'>
        <VictoryPie 
      width={200}
      height={200}
      data={pieData}
        colorScale="qualitative"
        cornerRadius={({datum}) => {
          return 5
        }}
        labels={({datum}) => {

          return `${datum.x}: ${datum.y}`
        }}
        innerRadius={5}
        labelRadius={({ innerRadius }) => (innerRadius! as number) + 25 }
        radius={({ datum }) => 75}
        padAngle={5}
        style={{ labels: { fill: "white", fontSize: 5, fontWeight: "bold" } }}
        // events={[
        //   {
        //     target: "data",
        //     eventHandlers: {
        //         onClick: modifyData
        //     }
        //   }
        // ]}

        />
    </div>
  )
}


//getServerSideProps to fetch the data

export async function getServerSideProps() {
  const fetchResult = await fetch("https://courseapi.onrender.com/chart")
  //getTheJson
    const fetchJson = await fetchResult.json()

    return {
      props: {
        pieData: fetchJson.data
      }
    }
  }

export default PieChart