import React from "react";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";


function Pagination({ pageNumber, setPageNumber, totalItem, parPage ,showItem}) {
    let totalPage = Math.ceil(totalItem / parPage)
    let startPage = pageNumber

    let dif = totalPage - pageNumber

    if( dif <= showItem){
        startPage = totalPage - showItem
    }

    let endpage = startPage < 0 ? showItem : showItem + startPage

    if( startPage <=0 ){
        startPage = 1
    }

    const createBtn = () => {

        const btns =[]
        for( let i= startPage ; i<endpage ; i++ ){
            btns.push(
                <li onClick={()=>setPageNumber(i) } className={`${pageNumber === i ? 'bg-[#ae88f1] shadow-lg shadow-indigo-300/50 text-white ' : 'bg-[#011a5d] hover:text-white text-[#d0d2d6] '  } w-[33px] h-[33px] rounded-full flex justify-center items-center cursor-pointer `} >
                    {i}


                </li>
            )
        }
        return btns

    }
    return (
        <ul className="flex gap-3" >
            {
                pageNumber > 1 && <li onClick={() => setPageNumber(pageNumber -1) } className="w-[33px] h-[33px] rounded-full flex justify-center items-center bg-slate-300 text-[#000000] cursor-pointer " >
                    <MdKeyboardDoubleArrowLeft />

                </li>
            }
            {
                createBtn()
            }
            {
                pageNumber < totalPage && <li onClick={() => setPageNumber(pageNumber + 1) } className="w-[33px] h-[33px] rounded-full flex justify-center items-center bg-slate-300 text-[#000000] cursor-pointer " >
                   <MdKeyboardDoubleArrowRight />
                </li>
            }
        </ul>
    )
}

export default Pagination;

