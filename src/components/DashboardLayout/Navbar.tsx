'use client'

import CloseIcon from '@mui/icons-material/Close'
import MenuIcon from '@mui/icons-material/Menu'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import React, { useMemo, useState } from 'react'
import NavbarItem from './NavbarItem'
import NavbarItemMobile from './NavbarItemMobile'
import { NavItem } from './NavItem'
import { Button } from '../ButtonComponent'

const Navbar = () => {
  const [selected, setSelected] = useState<any>(null)
  const [open, setOpen] = useState<any>(false)

  return (
    <div className="sticky top-0 !z-[999999]  bg-black text-primary-text-color pt-[0.5rem] lg:pt-[1rem]">
      <div className="h-[80px] w-full hidden lg:block  relative">
        <div className="absolute w-full h-[90px] blur-[30px] bg-black "></div>
        <div
          className="border max-w-screen-ml 2xl:max-w-screen-xl px-[1.25rem] py-[1.875rem]  w-full h-full mx-auto flex justify-between items-center"
          style={{
            borderRadius: '10px',
            border: '1px solid #000',
            background: '#000',
            boxShadow: '0px 0px 10px 0px #0F284C inset',
            backdropFilter: 'blur(18.5px)',
          }}
        >
          <Link href="/" className="flex items-center gap-[0.5rem]">
            <div className="w-[35px] h-[35px] relative overflow-hidden !z-20 cursor-pointer">
              <Image
                src={'/images/logo.svg'}
                alt="logo"
                fill
                className="w-full h-full object-cover object-center aspect-video"
              />
            </div>
            <div>Catech.Ai</div>
          </Link>
          <div className="max-w-screen-2xl h-full mx-auto flex justify-end items-center gap-x-0 lg:gap-x-[20px] text-primary-text-color transition-all duration-200 ease-in-out">
            {NavItem.map((item, index) => (
              <NavbarItem
                key={item.label}
                {...item}
                setSelected={setSelected}
                selected={selected}
              />
            ))}
          </div>
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        </div>
        <div className="h-[80px] blur-[30px] bg-black"></div>
      </div>

      <div
        className="bg-secondary shadow-md h-[60px] sticky top-0 !z-[999999]  w-full block lg:hidden "
        style={{
          borderRadius: '10px',
          border: '1px solid #000',
          background: '#000',
          boxShadow: '0px 0px 10px 0px #0F284C inset',
          backdropFilter: 'blur(18.5px)',
        }}
      >
        <div className="absolute w-full h-[20px] blur-[20px] bg-black top-[4rem]"></div>

        <div className="max-w-screen-2xl w-full h-full mx-auto flex justify-between items-center px-4 text-light-text-color transition-all duration-200 ease-in-out ">
          <Link href="/" className="flex items-center gap-[0.5rem]">
            <div className="w-[35px] h-[35px] relative overflow-hidden  cursor-pointer">
              <Image
                src={'/images/logo.svg'}
                alt="logo"
                fill
                className="w-full h-full object-cover object-center aspect-video"
                priority
              />
            </div>
            <div>Catech.Ai</div>
          </Link>
          <div onClick={() => setOpen((prev: any) => !prev)}>
            {open ? <CloseIcon /> : <MenuIcon />}
          </div>
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{
                  y: -100,
                }}
                animate={{
                  y: 0,
                }}
                exit={{
                  y: -800,
                  opacity: 0,
                }}
                transition={{ duration: 0 }}
                className="absolute top-[58px] py-1 !-z-10 left-0 w-full h-auto bg-[#000] rounded-b-md shadow-lg"
              >
                <div className="flex flex-col justify-start items-start  pl-3 py-2 ">
                  {NavItem.map((item, index) => (
                    <NavbarItemMobile
                      key={item.label}
                      {...item}
                      setSelected={setSelected}
                      selected={selected}
                      setOpen={setOpen}
                      open={open}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default Navbar
