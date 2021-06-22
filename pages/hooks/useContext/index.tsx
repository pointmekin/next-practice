import React, { createContext, useContext } from 'react'

const moods = {
  happy: true,
}

const MoodContext = createContext(moods)

export default function UseContext() {
  return (
    <MoodContext.Provider value={moods}>
      <div>
        {MoodEmoji()}
      </div>
    </MoodContext.Provider>
  )
}

function MoodEmoji() {
  const mood = useContext(MoodContext)
  return (
    <p>{`Is happy: ${mood.happy}`}</p>
  )
}