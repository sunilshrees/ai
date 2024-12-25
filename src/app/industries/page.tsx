import IndustriesSection from '@/components/landingpage/IndustriesPage/IndustriesSection'
import { API_URLS } from '@/constants/ApiRoutes'

async function getIndustries() {
  try {
    const res = await fetch(`${API_URLS.GET_INDUSTRY_API}`, {
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
const IndustriesPage = async () => {
  const data = await getIndustries()

  return <IndustriesSection data={data} />
}

export default IndustriesPage
