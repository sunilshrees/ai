import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import anime from 'animejs'

const SplashScreen = ({ finishLoading }: any) => {
  const [isMounted, setIsMounted] = useState<any>(false)
  const animate = () => {
    const loader = anime.timeline({
      complete: () => finishLoading(),
    })

    loader
      .add({
        targets: '#logo',
        delay: 0,
        rotate: '360deg',
        duration: 500,
        easing: 'easeInOutExpo',
      })
      .add({
        targets: '#logo',
        delay: 0,
        scale: 1,
        duration: 500,
        easing: 'easeInOutExpo',
      })
      .add({
        targets: '#logo',
        delay: 100,
        scale: 1.25,
        duration: 400,
        easing: 'easeInOutExpo',
      })
      .add({
        targets: '#logo',
        delay: 100,
        scale: 1,
        duration: 400,
        easing: 'easeInOutExpo',
      })
      .add({
        targets: '#name',
        translateX: 30,
        opacity: 1,
        delay: anime.stagger(100, { start: 500 }),
        // delay: anime.stagger(100),
      })

    // .add({
    //   targets: '#logo',
    //   delay: 100,
    //   scale: 1.15,
    //   duration: 500,
    //   easing: 'easeInOutExpo',
    // })

    // .add({
    //   targets: '#logo',
    //   delay: 100,
    //   scale: 1,
    //   duration: 500,
    //   easing: 'easeInOutExpo',
    // })
  }

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 10)
    animate()
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div
      className="flex h-screen items-center justify-center"
      // isMounted={isMounted}
    >
      <Image
        id="logo"
        src="/images/logo.svg"
        alt=""
        width={60}
        height={60}
        className="z-10"
      />
      <div
        id="name"
        className="text-white opacity-0 font-clash-display text-[2rem] -ml-[20px]"
      >
        Catech.Ai
      </div>
    </div>
  )
}

export default SplashScreen
