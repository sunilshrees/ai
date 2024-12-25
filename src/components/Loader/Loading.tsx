'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export function AnimatedLoader() {
  const logoVariants: any = {
    hidden: { opacity: 0, scale: 0.5, rotate: -360 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
    pulse: {
      scale: [1, 1.3, 1],
      opacity: [1, 0.8, 1],
      transition: {
        duration: 1,
        repeat: Infinity,
        repeatType: 'reverse',
      },
    },
  }

  return (
    <motion.div
      initial="hidden"
      animate={['visible', 'pulse']}
      variants={logoVariants}
      className="inline-block"
    >
      <Image
        src={'/images/logo.svg'}
        alt={'logo'}
        width={50}
        height={50}
        className="object-contain"
      />
    </motion.div>
  )
}
