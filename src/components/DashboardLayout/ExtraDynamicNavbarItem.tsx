'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const ExtraDynamicNavbarItem = ({
  id,
  name,
  sub_headers,
  setSelected,
  selected,
}: any) => {
  const router = useRouter()

  const [isOpen, setIsOpen] = useState(false)
  const submenuRef = useRef<HTMLDivElement>(null)

  const toggleSubmenu = () => {
    setSelected(id)
    setIsOpen((prev) => !prev)
  }
  const onLeaveMenu = () => {
    setSelected(null)
    setIsOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        submenuRef.current &&
        !submenuRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        setIsOpen(false)
        setSelected(null)
      }
    }
    document.body.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.body.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, setSelected])

  return (
    <button
      className="w-full  cursor-pointer p-[10px] hover:bg-secondary-hover flex justify-center items-center transition-all duration-200 ease-in-out relative hover:text-white text-[14px]"
      onMouseEnter={toggleSubmenu}
      onMouseLeave={onLeaveMenu}
      disabled={isOpen && selected == id}
    >
      <div className="flex justify-between items-center gap-x-2">
        {selected == id ? (
          <i className="bx bx-chevron-left"></i>
        ) : (
          <i className="bx bx-chevron-down"></i>
        )}
        <div>{name}</div>
      </div>

      {sub_headers && (
        <AnimatePresence>
          {isOpen && selected == id && (
            <motion.div
              ref={submenuRef}
              className="absolute top-0 right-[165px] bg-[#FDFDFD] w-[264px] overflow-hidden text-white shadow-lg"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {sub_headers
                ?.sort((a: any, b: any) => a.position - b.position)
                ?.map((subItem: any) => (
                  <Link href={`/packages/${subItem.id}`} key={subItem.id}>
                    <div className="p-[10px] text-[14px] text-black text-left hover:bg-secondary hover:text-white">
                      {subItem.name}
                    </div>
                  </Link>
                ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </button>
  )
}

export default ExtraDynamicNavbarItem
