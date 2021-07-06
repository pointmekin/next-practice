import React from 'react'
import Image from 'next/image'

export default function image() {
  return (
    <div>
      <h2>Next JS Image</h2>
      <Image 
        src={'/assets/images/img1.jpeg'
      }
        width={500}
        height={500}
      />
      hi
      <Image 
        src={'/assets/images/img2.jpeg'}
        width={500}
        height={500}
      />
      <Image 
        src={'/assets/images/img3.jpeg'}
        width={500}
        height={500}
      />
    </div>
  )
}