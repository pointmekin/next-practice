import React, { useEffect, useState } from 'react'

export default function Top() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Top rendered");
  });

  return (
    <div>
      <div onClick={() => setCount(count + 1)}>Top Level {count}</div>
      <Middle />
    </div>
  );
}

function Middle() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Middle rendered");
  });

  return (
    <div>
      <div onClick={() => setCount(count + 1)}>Middle Level {count}</div>
      <Bottom />
    </div>
  );
}

function Bottom() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Bottom rendered");
  });

  return <div onClick={() => setCount(count + 1)}>Bottom Level {count}</div>;
}

/* 
Notice, though, that React renders from the bottom up! In this case: Bottom, 
then Middle, then Top. It’s recursive – the parent is not “done” until all of 
its children have rendered, and the useEffect will only run after the render 
of a component is complete.
*/