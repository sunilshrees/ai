'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const SearchInput = () => {
  const [input, setInput] = useState('')

  const router = useRouter()

  const handleSearch = () => {
    if (!input?.trim()) {
      return
    } else {
      router.push(`/search?query=${input}`)
    }
  }
  return (
    <>
      <form
        onSubmit={(e: any) => {
          e.preventDefault()
          handleSearch()
        }}
        className="w-full flex rounded-[30px]"
      >
        <input
          type="text"
          value={input}
          className="w-full ring-0 outline-none border-none pl-[20px] pr-[0px] sm:px-[40px] rounded-l-[30px] py-[20px]"
          placeholder="Find the Perfect Trip for you."
          onChange={(e: any) => setInput(e.target.value)}
        />
        <button type="submit" className="">
          <i
            className="bx bx-search text-[20px] cursor-pointer px-[15px] py-[20px] rounded-r-[30px]"
            // onClick={handleSearch}
          ></i>
        </button>
      </form>
    </>
  )
}

export default SearchInput
