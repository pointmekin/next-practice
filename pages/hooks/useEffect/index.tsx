import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react'
import Reddit from './reddit'
import Top from './top'

export default function UseEffect() {

  // 2 pieces of state: one to hold the input value,
  // another to hold the current subreddit.
  const [inputValue, setValue] = useState("reactjs");
  const [subreddit, setSubreddit] = useState(inputValue);
  const [time, setTime] = useState(new Date)
  // Update the subreddit when the user presses enter
  const handleSubmit = e => {
    e.preventDefault();
    setSubreddit(inputValue);
  };

  // This method isn't good because there's a delay before the function is executed and is renderred
  useEffect(() => {
    setTimeout(() => {
      setTime(new Date)
    }, 1000);
  })

  return (
    <div>

      {/* using useEffect to update repeatedly after set time */}
      <p>{time.toString()}</p>

      {/* setup useEffect to run once with dependency array [] */}
      <Clock />

      {/* useEffect runs when the input is submitted */}
      <form onSubmit={handleSubmit}>
        <input
          value={inputValue}
          onChange={e => setValue(e.target.value)}
        />
      </form>
      <Reddit subreddit={subreddit}/>
      <Top/>
    </div>
  )
}

export const Clock = () => {
  const requestRef = useRef(0)
  const previousTimeRef = useRef(new Date())
  const [day, setDay] = useState<String>(moment().format('dddd'))
  const [date, setDate] = useState<String>(moment().format('Do MMMM YYYY'))
  const [time, setTime] = useState<String>(moment().format('h:mm:ss a'))

  const tick = () => {
    //change display time every second
    previousTimeRef.current = new Date()
    requestRef.current = requestAnimationFrame(tick)
    setDay(moment().format('dddd'))
    setDate(moment().format('Do MMMM YYYY'))
    setTime(moment().format('h:mm:ss a'))
  }
  useEffect(() => {
      requestRef.current = requestAnimationFrame(tick)
      return () => cancelAnimationFrame(requestRef.current)
  }, [])

  return (
    <div className="mx-4 my-2 justify-self-end">
      <p>{day} {date}</p>
      <p suppressHydrationWarning>{time}</p>
    </div>
  )

}
