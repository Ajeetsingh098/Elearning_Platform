import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import {TiStarFullOutline ,TiStarOutline,TiStarHalfOutline} from 'react-icons/ti'

function RatingStar({Review_Count ,Star_Size}) {
    const[starCount, SetStarCount]=useState({
        full:0,
        half:0,
        empty:0,
    })
    useEffect(()=>{
        const wholeStars=Math.floor(Review_Count) ||0
        SetStarCount({
            full:wholeStars,
            half:Number.isInteger(Review_Count) ? 0 :1,
            empty:Number.isInteger(Review_Count) ? 5 -wholeStars :4 -wholeStars,

        })
    } ,[Review_Count])
  return (
    <div className='flex gap-1 text-yellow-100'>
        {[...new Array(starCount.full)].map((_ ,i)=>{
         return <TiStarFullOutline key={i} size={Star_Size || 20}>
         </TiStarFullOutline>
        })}
          {[...new Array(starCount.half)].map((_ ,i)=>{
         return <TiStarHalfOutline key={i} size={Star_Size || 20}>
         </TiStarHalfOutline>
        })}

          {[...new Array(starCount.empty)].map((_ ,i)=>{
         return <TiStarOutline key={i} size={Star_Size || 20}>
         </TiStarOutline>
        })}
      
    </div>
  )
}

export default RatingStar
