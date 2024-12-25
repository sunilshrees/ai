'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const NavbarItemMobile = ({
  label,
  path,
  subItems,
  setSelected,
  selected,
  setOpen,
  open,
}: any) => {
  const router = useRouter()

  const submenuRef = useRef<HTMLDivElement>(null)

  const toggleSubmenu = () => {
    if (label == selected) {
      setSelected(null)
    } else {
      setSelected(label)
    }
  }

  const redirectLink = (path: string) => {
    setOpen(false)
    router.push(path)
  }

  return (
    <button
      className="cursor-pointer p-[10px]  flex flex-col justify-start items-start transition-all duration-200 ease-in-out relative"
      onClick={toggleSubmenu}
    >
      {subItems ? (
        <div className="flex justify-between items-center gap-x-2">
          <div>{label}</div>
          {open && selected == label ? (
            <i className="bx bx-chevron-down"></i>
          ) : (
            <i className="bx bx-chevron-right"></i>
          )}
        </div>
      ) : (
        <div className="" onClick={() => redirectLink(path)}>
          {label}
        </div>
      )}
      <div>
        {subItems && (
          <AnimatePresence>
            {selected == label && (
              <motion.div
                ref={submenuRef}
                className="  w-[264px] overflow-hidden text-white "
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {subItems.map((subItem: any) => (
                  <div
                    key={subItem.label}
                    className="my-[20px] px-[20px] text-[13px] text-white text-left"
                    onClick={() => redirectLink(subItem.path)}
                  >
                    {subItem.label}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </button>
  )
}

export default NavbarItemMobile
