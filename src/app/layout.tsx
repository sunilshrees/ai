import type { Metadata } from 'next'
import DashboardLayout from '../components/DashboardLayout/Layout'
import './globals.css'
import { API_URLS } from '@/constants/ApiRoutes'

export const metadata: Metadata = {
  metadataBase: new URL('https://kechahiyo.com'),
  title: 'AI. Project',
  description:
    'Explore the majestic beauty of the Himalayas with Target Himalaya! We offer exclusive tourism and trekking packages to breathtaking destinations. Discover top spots, guided tours, and adventure-filled itineraries. Whether you are seeking a serene escape or a thrilling adventure, our customized packages cater to all your travel needs. Book your unforgettable journey today',
  openGraph: {
    title: 'AI. Project - Himalaya Adventures',
    description:
      'Explore the majestic beauty of the Himalayas with Target Himalaya! Book your unforgettable journey today.',
    images: [
      {
        url: '/opengraph-image.png', // Relative to metadataBase
        width: 1200, // Specify dimensions for better previews
        height: 630,
        alt: 'An Open Graph image showing the Himalayas',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI. Project - Himalaya Adventures',
    description:
      'Explore the majestic beauty of the Himalayas with Target Himalaya! Book your unforgettable journey today.',
    images: [
      {
        url: '/opengraph-image.png', // Relative to metadataBase
        alt: 'A Twitter image showing the Himalayas',
      },
    ],
  },
}

async function getContactDetails() {
  try {
    const res = await fetch(`${API_URLS.GET_CONTACT_INFO_API}`, {
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
async function getSocialDetails() {
  try {
    const res = await fetch(`${API_URLS.GET_SOCIAL_INFO_API}`, {
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
async function getServicesDetails() {
  try {
    const res = await fetch(`${API_URLS.GET_SERVICE_API}`, {
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const data = await getContactDetails()
  const socialData = await getSocialDetails()
  const serviceData = await getServicesDetails()

  return (
    <DashboardLayout footerData={{ data, socialData, serviceData }}>
      {children}
    </DashboardLayout>
  )
}
