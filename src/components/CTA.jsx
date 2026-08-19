import { ArrowRight } from 'lucide-react'

export default function CTA() {
  return (
    <section id="contact" className="py-24 px-6 bg-cream dark:bg-black transition-colors relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-orange-500/15 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto bg-white dark:bg-[#0d0d0d] rounded-lg border-hard shadow-hard p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 relative">
        <div>
          <h2 className="font-display uppercase text-3xl md:text-4xl text-black dark:text-white mb-3 leading-tight">
            Ready to <span className="text-orange-600">work together?</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-md">
            Let's talk about your project — content, SEO, or a full website build.
          </p>
        </div>
        <a
          href="mailto:noblezaprince1@gmail.com"
          className="btn-brutal rounded-md flex items-center gap-2 px-8 py-4 bg-orange-600 text-white font-bold uppercase tracking-wide text-sm hover:bg-orange-700 transition-colors whitespace-nowrap"
        >
          Get In Touch <ArrowRight size={18} />
        </a>
      </div>
    </section>
  )
}
