'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const DynamicNavMobileItem = ({
  id,
  name,
  sub_headers,
  setSelected,
  selected,
  setOpen,
  open,
}: any) => {
  const router = useRouter()

  const [isOpen, setIsOpen] = useState(false)
  const submenuRef = useRef<HTMLDivElement>(null)

  const toggleSubmenu = () => {
    if (id == selected) {
      setSelected(null)
    } else {
      setSelected(id)
    }
  }

  const redirectLink = (path: string) => {
    setOpen(false)
    router.push(path)
  }
  return (
    <button
      className="cursor-pointer p-[10px] flex flex-col justify-start items-start transition-all duration-200 ease-in-out relative"
      onClick={toggleSubmenu}
    >
      <div className="flex justify-between items-center gap-x-2">
        <div>{name}</div>
        {open && selected == id ? (
          <i className="bx bx-chevron-down"></i>
        ) : (
          <i className="bx bx-chevron-right"></i>
        )}
      </div>

      {sub_headers && (
        <AnimatePresence>
          {selected == id && (
            <motion.div
              ref={submenuRef}
              className="  w-[264px] overflow-hidden text-white "
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {sub_headers
                ?.sort((a: any, b: any) => a.position - b.position)
                ?.map((subItem: any) => (
                  <div
                    key={subItem.id}
                    className="my-[20px] px-[20px] text-[13px] text-white text-left"
                    onClick={() => redirectLink(`/packages/${subItem.id}`)}
                  >
                    {subItem.name}
                  </div>
                ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </button>
  )
}

export default DynamicNavMobileItem
