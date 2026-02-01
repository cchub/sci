import React from "react"

import "./Skeleton.scss"

export const PrimarySkeleton = () => {
  return (
    <div className='trade-skeleton-primary'>
      <div className='left-section'>
        <div>
          {" "}
          <div></div>
        </div>
      </div>
      <div className='right-section'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export const SecondarySkeleton = ({ len }) => {
  const arr = Array.from(Array(len).keys())
  return (
    <div className='trade-skeleton-secondary'>
      {arr.map(item => (
        <div key={item} className='card'>
          <div className='top-section'>
            <div></div>
          </div>
          <div className='bottom-section'>
            <div></div>
            <div></div>
          </div>
        </div>
      ))}
    </div>
  )
}

export const CardSkeleton = () => {
  return (
    <div className='report-skeleton'>
      <div className='card'>
        <div className='top-section'>
          <div></div>
        </div>
        <div className='bottom-section'>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  )
}
