import React, { useLayoutEffect, useRef } from 'react';


export default function UseLayoutEfect() {
  
  const myBtn = useRef(null)

  useLayoutEffect(() => {
    const rect = myBtn.current.getBoundingClientRect()
    console.log(rect.height)
  })

  return(
    <div>
      <button ref={myBtn}></button>
    </div>
  )
}