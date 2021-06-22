import React, { useRef, useEffect, useState } from 'react';

export default function UseRef() {

  // can be used when there's a value that can change, like setstate
  // however, it doesn't rerender the dom

  // a common use case of useRef() is to grab a html element from the dom
  const myBtn = useRef(null)
  const clickIt = () => myBtn ? myBtn.current.click() : null

  const onClick = () => {
    console.log('clicked')
  }

  useEffect(() => {
    setInterval(function(){
      clickIt()
    }, 1000);
  }, [])

  return(
    <div>
      <button ref={myBtn} onClick={() => {onClick()}}></button>
    </div>
  )
}