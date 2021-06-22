import React, { forwardRef, useImperativeHandle, useRef } from 'react';

export default function UseImperativeHandle(props, ref) {

  // rarely used

  const myBtn = useRef(null);
  useImperativeHandle(ref, () => ({
    click: () => {
      console.log('button clicked')
      myBtn.current.click()
    }
  }));
  return <button ref={myBtn}></button>
}

forwardRef(UseImperativeHandle);