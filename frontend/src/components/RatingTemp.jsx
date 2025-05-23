import React from 'react'
import { CiStar } from 'react-icons/ci'
import { FaStar } from 'react-icons/fa'

function RatingTemp({rating}) {
    if(rating === 5){
        return (
            <>
            <span className='text-[#EDBB0E]' ><FaStar /></span>
            <span className='text-[#EDBB0E]' ><FaStar /></span>
            <span className='text-[#EDBB0E]' ><FaStar /></span>
            <span className='text-[#EDBB0E]' ><FaStar /></span>
            <span className='text-[#EDBB0E]' ><FaStar /></span>
       
            </>
        )
    }
    else if(rating === 4){
        return (
            <>
            <span className='text-[#EDBB0E]' ><FaStar /></span>
            <span className='text-[#EDBB0E]' ><FaStar /></span>
            <span className='text-[#EDBB0E]' ><FaStar /></span>
            <span className='text-[#EDBB0E]' ><FaStar /></span>
            <span className='text-slate-600' ><CiStar /></span>
       
            </>
        )
    }

      else if(rating === 3){
        return (
            <>
            <span className='text-[#EDBB0E]' ><FaStar /></span>
            <span className='text-[#EDBB0E]' ><FaStar /></span>
            <span className='text-[#EDBB0E]' ><FaStar /></span>
            <span className='text-slate-600' ><CiStar /></span>
            <span className='text-slate-600' ><CiStar /></span>
       
            </>
        )
    }

     else if(rating === 2){
        return (
            <>
            <span className='text-[#EDBB0E]' ><FaStar /></span>
            <span className='text-[#EDBB0E]' ><FaStar /></span>
            <span className='text-slate-600' ><CiStar /></span>
            <span className='text-slate-600' ><CiStar /></span>
            <span className='text-slate-600' ><CiStar /></span>
       
            </>
        )
    }

       else if(rating === 1){
        return (
            <>
            <span className='text-[#EDBB0E]' ><FaStar /></span>
           <span className='text-slate-600' ><CiStar /></span>
            <span className='text-slate-600' ><CiStar /></span>
            <span className='text-slate-600' ><CiStar /></span>
            <span className='text-slate-600' ><CiStar /></span>
       
            </>
        )
    }

     else {
        return (
            <>
            <span className='text-slate-600' ><CiStar /></span>
           <span className='text-slate-600' ><CiStar /></span>
            <span className='text-slate-600' ><CiStar /></span>
            <span className='text-slate-600' ><CiStar /></span>
            <span className='text-slate-600' ><CiStar /></span>
       
            </>
        )
    }



 
}

export default RatingTemp