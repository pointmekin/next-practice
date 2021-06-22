import React, { useEffect, useState } from 'react'


export default function UseState() {
  // ========================== useState hook ==========================

  const [count, setCount] = useState(0)
  const [buttonClicks, setButtonClicks] = useState(0)

  // ========================== useEffect hook ==========================

  /* 
    Runs Once
  */

  useEffect(() => {
    console.log('I am called once')
  }, [])

  /* 
    Runs after every rerender
  */

  useEffect(() => {
    console.log('render!')
    return () => console.log('unmounting...')
  })

  /* 
    Runs when the dependency state changes
  */

  useEffect(() => {
    setButtonClicks(buttonClicks + 1)
    return () => {}
  }, [count])


  return (
    <div>
      <p>{`Counter ${count}`}</p>
      <button onClick={() => {setCount(count + 1)}}>Increment</button>
      <p>{`Button is renderred ${buttonClicks} times`}</p>
    </div>
  ) 
}