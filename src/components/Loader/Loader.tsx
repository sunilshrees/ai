import React from 'react'
import { AnimatedLoader } from './Loading'

const Loader = () => {
  return (
    // <div className="w-full flex flex-col items-center justify-center">
    //   <div className="lds-ripple">
    //     <div></div>
    //     <div></div>
    //   </div>
    // </div>
    <div className="w-full flex flex-col items-center justify-center">
      <AnimatedLoader />
    </div>
  )
}

export default Loader
