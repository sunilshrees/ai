import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Button } from '../../ButtonComponent'
import GetLatestUpdates from '../../GetLatestUpdates'
import Testimonial from './Testimonial'
import { API_URLS } from '@/constants/ApiRoutes'

async function getEmployeeStories() {
  try {
    const res = await fetch(`${API_URLS.GET_STORIES_API}`, {
      cache: 'no-store',
    })
    const response = await res.json()

    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }

    return response?.data
  } catch (error) {
    return null
  }
}
const TestimonailContainer = async () => {
  const storiesList = await getEmployeeStories()

  return <Testimonial data={storiesList} />
}

export default TestimonailContainer
