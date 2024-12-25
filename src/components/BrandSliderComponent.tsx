'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const images = [
  '/images/brand-1.png',
  '/images/brand-2.png',
  '/images/brand-3.png',
  '/images/brand-4.png',
  '/images/brand-4.png',
  '/images/brand-3.png',
  '/images/brand-2.png',
  '/images/brand-1.png',
]

const BrandSliderComponent = ({ brand }: any) => {
  const [currentPage, setCurrentPage] = useState(0)
  const imagesPerPage = 4

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPage((prevPage) =>
        (prevPage + 1) * imagesPerPage >= brand?.length ? 0 : prevPage + 1,
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const startIndex = currentPage * imagesPerPage
  const selectedImages = brand?.slice(startIndex, startIndex + imagesPerPage)

  return (
    <AnimatePresence key={selectedImages?.length > 0 ? selectedImages?.join() : selectedImages}>
      {selectedImages?.length > 0 && selectedImages?.map((image: any, index: any) => (
        <motion.img
          key={image?.id}
          initial={{ opacity: 0, x: (index + 1) % 2 == 1 ? -10 : 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          src={image?.logo}
          alt={image?.name}
          className="w-[150px] h-[150px] object-contain"
        />
      ))}
    </AnimatePresence>
  )
}

export default BrandSliderComponent
