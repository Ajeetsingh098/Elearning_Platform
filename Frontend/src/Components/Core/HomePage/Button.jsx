import React from 'react'
import { Link } from 'react-router-dom'

function Button({children,active,linkto}) {
  return (
    <Link to={linkto}>
    <div className={`text-center text-[13px] px-6 py-3 rounded-xl font-bold
        ${active ? "bg-yellow-300 text-black ":" bg-slate-600"}
        hover:scale-95 transition-all duration-200
        `}>
        {children}
    </div>
    
    </Link>
  )
}

export default Button
