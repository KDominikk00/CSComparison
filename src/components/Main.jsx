import PlayerSelector from "./PlayerSelector";
import React from 'react'

const Main = () => {
  return (
    <>
      <main className="flex justify-center">
        <PlayerSelector />
        <span className='text-xl text-white mt-32'>VS</span>
        <PlayerSelector />
      </main>
      <div className="text-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded mb-10">Compare</button>
      </div>
    </>
  )
}

export default Main