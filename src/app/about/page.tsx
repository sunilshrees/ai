import AboutHeroSection from '@/components/landingpage/AboutPage/AboutHeroSection'
import AboutMissionSection from '@/components/landingpage/AboutPage/AboutMissionSection'
import AboutTeamSection from '@/components/landingpage/AboutPage/AboutTeamSection'
import { API_URLS } from '@/constants/ApiRoutes'

async function getOverviewData() {
  try {
    const res = await fetch(`${API_URLS.COMPANY_OVERVIEW_LIST_API}`, {
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
async function getTeamData() {
  try {
    const res = await fetch(`${API_URLS.GET_TEAM_API}`, {
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
const About = async () => {
  const data = await getOverviewData()
  const teamData = await getTeamData()

  return (
    <>
      <AboutHeroSection data={data} />
      <AboutMissionSection data={data} />
      {teamData && <AboutTeamSection data={teamData} />}
    </>
  )
}

export default About
