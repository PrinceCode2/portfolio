export const technologyMeta = {
  GoHighLevel: { mark: 'HL', color: '#f97316', wordmark: true },
  'Make.com': { mark: 'M', color: '#6d28d9', assets: ['make'] },
  n8n: { mark: 'n8n', color: '#ea4b71', assets: ['n8n'] },
  Mailchimp: { mark: 'MC', color: '#f3cc13', assets: ['mailchimp'] },
  React: { mark: 'R', color: '#149eca', assets: ['react'] },
  Tailwind: { mark: 'TW', color: '#06b6d4', assets: ['tailwindcss'] },
  'React + Tailwind': { mark: 'R+TW', color: '#0ea5e9', assets: ['react', 'tailwindcss'] },
  'HTML5 + CSS3 + JavaScript': { mark: 'Web', color: '#f97316', assets: ['html5', 'css', 'javascript'] },
  WordPress: { mark: 'W', color: '#21759b', assets: ['wordpress'] },
  Joomla: { mark: 'J!', color: '#f59e0b', assets: ['joomla'] },
  'PHP + MySQL': { mark: 'DB', color: '#777bb4', assets: ['php', 'mysql'] },
  SEO: { mark: 'SEO', color: '#ea580c' },
  'Meta Business Suite': { mark: 'Meta', color: '#0866ff', assets: ['meta'] },
  'Canva + Photoshop': { mark: 'Design', color: '#31a8ff', assets: ['canva', 'photoshop'] },
  Figma: { mark: 'F', color: '#f24e1e', assets: ['figma'] },
  Postman: { mark: 'PM', color: '#ff6c37', assets: ['postman'] },
  GitHub: { mark: 'GH', color: '#181717', assets: ['github'] },
  Stripe: { mark: 'S', color: '#635bff', assets: ['stripe'] },
  Webchat: { mark: 'Chat', color: '#0f766e' },
  'cPanel + Hosting': { mark: 'Host', color: '#ff6c2c', assets: ['cpanel'] },
  'Content Strategy': { mark: 'CS', color: '#ea580c' },
  Instagram: { mark: 'IG', color: '#c026d3' },
  Facebook: { mark: 'FB', color: '#2563eb' },
  'AI-assisted Design': { mark: 'AI', color: '#7c3aed' },
  'Brand Identity': { mark: 'BI', color: '#ea580c' },
  'Paid Social': { mark: 'Ads', color: '#dc2626' },
  Packaging: { mark: 'Pkg', color: '#a16207' },
  'Workflow Automation': { mark: 'Flow', color: '#ea580c' },
  'Chat/Voice AI': { mark: 'AI', color: '#7c3aed' },
  'Email/SMS Campaigns': { mark: 'MSG', color: '#0f766e' },
  'Hardware + Networks': { mark: 'IT', color: '#2563eb' },
  'POS Systems QA': { mark: 'POS', color: '#ca8a04' },
}

export const featuredOrbitTechnologies = [
  { name: 'GoHighLevel', orbit: 'outer', mobile: true },
  { name: 'React', orbit: 'outer', mobile: true },
  { name: 'Make.com', orbit: 'outer', mobile: true },
  { name: 'GitHub', orbit: 'outer', mobile: false },
  { name: 'n8n', orbit: 'inner', mobile: true },
  { name: 'WordPress', orbit: 'inner', mobile: true },
  { name: 'Postman', orbit: 'inner', mobile: false },
  { name: 'Tailwind', orbit: 'inner', mobile: false },
]

export const marqueeTechnologyRows = [
  ['React + Tailwind', 'HTML5 + CSS3 + JavaScript', 'WordPress', 'Joomla', 'PHP + MySQL', 'GitHub'],
  ['GoHighLevel', 'Make.com', 'n8n', 'Mailchimp', 'Postman', 'Stripe', 'cPanel + Hosting', 'Canva + Photoshop'],
]

export function getTechnologyMeta(name) {
  return technologyMeta[name] ?? {
    mark: name
      .split(/\s|\+/)
      .filter(Boolean)
      .slice(0, 2)
      .map(part => part[0])
      .join('')
      .toUpperCase(),
    color: '#ea580c',
  }
}
