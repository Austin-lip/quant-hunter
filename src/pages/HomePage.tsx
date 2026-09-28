import Hero from '@/sections/Hero'
import StatsBar from '@/sections/StatsBar'
import FeaturedJobs from '@/sections/FeaturedJobs'
import Specialties from '@/sections/Specialties'
import Cases from '@/sections/Cases'
import Process from '@/sections/Process'
import Faq from '@/sections/Faq'
import RegisterCta from '@/sections/RegisterCta'

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <FeaturedJobs />
      <Specialties />
      <Cases />
      <Process />
      <Faq />
      <RegisterCta />
    </>
  )
}
