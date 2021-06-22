import React, { useCallback, useState } from 'react';

export default function UseCallback() {

  // suppose the function is passed to multiple child components
  // especially with big lists
  // useCallback can help reduce unecessary rerenders of children

  const [count, setCount] = useState(60)
  const showCount = useCallback(() => {
    alert(`Count ${count}`)
  }, [count])

  

  return(
    <div></div>
  )
}