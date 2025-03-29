import React from 'react'

function Search({setParPage ,setSearchValue ,searchValue}) {
  return (
    <div className="flex justify-between items-center ">
    <select
      onChange={(e) => setParPage(parseInt(e.target.value))}
      className="px-4 py-2 hover:border-indigo-500 outline-none bg-[#eeefee]  border border-slate-700 rounded-md text-[#6f6f70] "
    >
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="20">20</option>
    </select>
    <input onChange={(e) => setSearchValue(e.target.value)} value={searchValue}
      className="px-4 py-2 focus:border-[#ae88f1] outline-none bg-[#eeefee]  border border-slate-700 rounded-md text-[#6f6f70] "
      type="text"
      placeholder="search"
    />
  </div>
  )
}

export default Search



