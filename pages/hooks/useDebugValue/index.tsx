import React, { useEffect, useState, useDebugValue } from 'react';

export default function UseDebugValue() {
  
  const displayName = useDisplayName()
  
  return (
    <div>
      {displayName}
    </div>
  )
  
}

function useDisplayName() {
  const [displayName, setDisplayName] = useState<string>()

  useEffect(() => {
    const data = fetchFromDatabase(1)
    setDisplayName(data.displayName)
  }, [displayName])

  useDebugValue(displayName ?? 'loading...')

  return displayName
}

const fetchFromDatabase = (id) => {
  return {
    displayName: "Display Name"
  }
}