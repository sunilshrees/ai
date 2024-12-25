import AboutContainer from '@/components/landingpage/Homepage/AboutContainerServer'
import FeaturedContainer from '@/components/landingpage/Homepage/FeaturedContainerServer'
import HeroContainer from '@/components/landingpage/Homepage/HeroContainer'
import TestimonailContainer from '@/components/landingpage/Homepage/TestimonialContainer'

export default function HomePage() {
  return (
    <>
      <HeroContainer />
      <AboutContainer />
      <FeaturedContainer />
      <TestimonailContainer />
    </>
  )
}
