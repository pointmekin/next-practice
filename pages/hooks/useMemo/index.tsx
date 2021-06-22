import React, { useMemo, useState } from 'react';

export default function UseMemo() {
  // useMemo() can be used to optimize performance
  
  /*
  useMemo will only recompute the memoized value when one of the 
  dependencies has changed. This optimization helps to avoid expensive 
  calculations on every render.
  */
 
  const [count, setCount] = useState(70)

  const expensiveCount = useMemo(() => {
    return count ** 2
  }, [count])

  return (
    <div>
      {count}
    </div>
  )
}