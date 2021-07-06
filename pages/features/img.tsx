import React from 'react'

export default function img() {
  return (
    <div>
      <h2>regular img tag</h2>
      <img 
        src={'/assets/images/img1.jpeg'}
        width={500}
        height={500}
      />
      hi
      <img 
        src={'/assets/images/img2.jpeg'}
        width={500}
        height={500}
      />
      <img 
        src={'/assets/images/img3.jpeg'}
        width={500}
        height={500}
      />
    </div>
  )
}