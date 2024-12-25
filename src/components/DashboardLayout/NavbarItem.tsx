'use client'

import { usePathname, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

interface NavItem {
  label: string
  path: string
  subItems?: NavItem[]
  setSelected?: any
  selected?: any
}
const NavbarItem: React.FC<NavItem> = ({ label, path, subItems }) => {
  const router = useRouter()

  const pathname = usePathname()

  return (
    <button
      className="cursor-pointer flex justify-center items-center transition-all duration-200 ease-in-out relative text-[0.75rem] 2xl:text-[1rem]"
      onClick={() => {
        if (!subItems) {
          router.push(path)
        }
      }}
    >
      {label}

      {((path !== '/' && pathname.startsWith(path)) ||
        (pathname == '/' && path == '/')) && (
        <motion.div
          initial={{
            opacity: 0,
            x: 10,
            visibility: 'hidden',
          }}
          animate={{
            opacity: 1,
            x: 0,
            visibility: 'visible',
          }}
          transition={{ duration: 0.4 }}
          className="w-full h-[4px] bg-blue-600 absolute -bottom-2 active_path_gradient"
        ></motion.div>
      )}
    </button>
  )
}

export default NavbarItem
