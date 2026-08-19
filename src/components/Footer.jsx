import { ArrowRight, Download } from 'lucide-react'
import logo from '../assets/logo.png'
import { GitHubIcon, FacebookIcon, InstagramIcon, LinkedInIcon } from './SocialIcons'

const socials = [
  { href: 'https://github.com/PrinceCode2', label: 'GitHub', Icon: GitHubIcon },
  { href: 'https://www.facebook.com/share/1B9HEvJqWJ/', label: 'Facebook', Icon: FacebookIcon },
  {
    href: 'https://www.instagram.com/prince_noblezaaa?igsh=a2k3OWZ3NmRmdGZx&igsi=a2k3OWZ3NmRmdGZx',
    label: 'Instagram',
    Icon: InstagramIcon,
  },
  {
    href: 'https://www.linkedin.com/in/prince-john-nobleza-145618294?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    label: 'LinkedIn',
    Icon: LinkedInIcon,
  },
]

const quickLinks = [
  { href: '#top', label: 'Home' },
  { href: '#projects', label: 'Work' },
  { href: '#tools', label: 'Tools' },
  { href: '#faq', label: 'FAQs' },
  { href: '#contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="bg-cream dark:bg-black border-t-2 border-black/10 dark:border-white/10 text-gray-600 dark:text-gray-400 pt-16 pb-8 px-6 transition-colors">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
        <div>
          <img src={logo} alt="Prince Nobleza" className="h-14 w-auto mb-4" />
          <p className="text-sm leading-relaxed max-w-xs">
            Automation Specialist and Web Developer helping brands streamline CRM workflows,
            build websites, and grow with strategy-driven content and SEO.
          </p>
          <div className="flex gap-3 mt-5">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 flex items-center justify-center rounded-full border-2 border-black/10 dark:border-white/15 text-gray-600 dark:text-gray-400 hover:text-orange-600 hover:border-orange-500 transition-colors"
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="font-bold text-sm uppercase tracking-widest text-black dark:text-white mb-4">
            Quick Links
          </p>
          <ul className="space-y-2.5 text-sm">
            {quickLinks.map(link => (
              <li key={link.href}>
                <a href={link.href} className="hover:text-orange-600 transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-bold text-sm uppercase tracking-widest text-black dark:text-white mb-4">
            Let's Work Together
          </p>
          <p className="text-sm mb-5 max-w-xs">
            Have a project in mind? Send a message and let's talk about how I can help.
          </p>
          <div className="flex flex-col gap-3 items-start">
            <a
              href="mailto:noblezaprince1@gmail.com"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-orange-600 text-white text-sm font-bold hover:bg-orange-700 transition-colors"
            >
              Let's Talk <ArrowRight size={16} />
            </a>
            <a
              href="/Prince-Nobleza-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-black dark:text-white hover:text-orange-600 transition-colors"
            >
              <Download size={16} /> Download Resume
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto border-t-2 border-black/10 dark:border-white/10 mt-12 pt-6 text-sm text-center">
        © 2026 Prince John Nobleza. All rights reserved.
      </div>
    </footer>
  )
}
