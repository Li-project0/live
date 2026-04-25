import Hero from '@/components/Hero'
import InfoSection from '@/components/InfoSection'
import MediaSection from '@/components/MediaSection'
import MemberCarousel from '@/components/MemberCarousel'
import RsvpForm from '@/components/RsvpForm'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Hero />
      <InfoSection />
      <MediaSection />
      <MemberCarousel />
      <RsvpForm />
      <Footer />
    </main>
  )
}
