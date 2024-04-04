import React from 'react'
import { FaStar,FaStarHalfAlt,FaRegStar  } from "react-icons/fa";

const Stars = ({stars,showNumber}) => {
    let s = [0, 0, 0, 0, 0];
    let floor = Math.floor(stars);
    let left = stars - floor;

    for(var i=0;i<floor;i++) {
        s[i] = 2;
    }
    if(left > 0) {
        s[i] = 1;
    }

  return (
    <div className='flex flex-row items-center justify-start'>
        {stars==0&&<div className='flex items-center justify-center border rounded-md border-yellow-400 py-1 px-2'>
            <span className='text-yellow-400 text-sm'>Novo</span>
        </div>}
        {stars>0&&s.map((i, k)=>(
            <div key={k}>
                {i === 0 && <FaRegStar className='text-yellow-400' size={18}/>}
                {i === 1 && <FaStarHalfAlt className='text-yellow-400' size={18}/>}
                {i === 2 && <FaStar className='text-yellow-400' size={18}/>}
            </div>
        ))}
        {showNumber&&<span className="mx-2 text-sm text-gray-500 dark:text-gray-400">{stars.length === 1 ? stars+'.0':stars}</span>}
    </div>
  )
}

export default Stars