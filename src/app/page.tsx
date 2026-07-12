import { Navbar } from '@/components/portfolio/navbar'
import { Hero } from '@/components/portfolio/hero'
import { About } from '@/components/portfolio/about'
import { Experience } from '@/components/portfolio/experience'
import { Projects } from '@/components/portfolio/projects'
import { Skills } from '@/components/portfolio/skills'
import { Education } from '@/components/portfolio/education'
import { Volunteering } from '@/components/portfolio/volunteering'
import { Recommendations } from '@/components/portfolio/recommendations'
import { Press } from '@/components/portfolio/press'
import { Contact } from '@/components/portfolio/contact'
import { Footer } from '@/components/portfolio/footer'

export default function Home() {
  return (
    <main className="bg-black">
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Education />
      <Volunteering />
      <Recommendations />
      <Press />
      <Contact />
      <Footer />
    </main>
  )
}
