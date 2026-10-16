import Nav from './components/Nav'
import Hero from './components/Hero'
import TechnologyMarquee from './components/TechnologyMarquee'
import Problems from './components/Problems'
import Portfolio from './components/Portfolio'
import Tools from './components/Tools'
import ExperienceTimeline from './components/ExperienceTimeline'
import Process from './components/Process'
import FAQ from './components/FAQ'
import CTA from './components/CTA'
import Footer from './components/Footer'
import ChatBot from './components/ChatBot'
import ScrollProgress from './components/ScrollProgress'
import ConstellationBackground from './components/ConstellationBackground'
import SpringCursor from './components/SpringCursor'
import BackgroundMusic from './components/BackgroundMusic'

function App() {
  return (
    <div className="constellation-root relative isolate min-h-screen">
      <ConstellationBackground />
      <SpringCursor />
      <div className="constellation-content">
        <ScrollProgress />
        <Nav />
        <main>
          <Hero />
          <TechnologyMarquee />
          <Problems />
          <ExperienceTimeline />
          <Tools />
          <Portfolio />
          <Process />
          <FAQ />
          <CTA />
        </main>
        <Footer />
        <BackgroundMusic />
        <ChatBot />
      </div>
    </div>
  )
}

export default App
