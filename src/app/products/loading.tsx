import { AnimatedLoader } from '@/components/Loader/Loading'
import React from 'react'

const loading = () => {
  return (
    <main className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <AnimatedLoader />
    </main>
  )
}

export default loading
