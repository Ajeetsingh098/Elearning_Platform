import React from 'react'

function HighlightText({text}) {
  return (
    <span className='font-bold text-green-500'>
        {" "} 
        {text}
    </span>
  )
}

export default HighlightText
