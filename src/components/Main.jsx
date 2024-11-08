import PlayerSelector from "./PlayerSelector";

import React from 'react'

const Main = () => {
  return (
    <main className="flex justify-center">
      <PlayerSelector />
      <span className='text-xl text-white mt-32'>VS</span>
      <PlayerSelector />
    </main>
  )
}

export default Main