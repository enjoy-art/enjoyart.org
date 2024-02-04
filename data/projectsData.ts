interface Project {
  title: string,
  description: string,
  href?: string,
  imgSrc?: string,
}

const projectsData: Project[] = [
  {
    title: 'EnjoyArt - The Ancient Canvas',
    description: `Dive deep into the art of antiquity with the first volume of "EnjoyArt - The Ancient Canvas." Arnold, your charming guide, escorts you through the enigmatic beginnings of human creativity to the sublime expressions of the Renaissance and Baroque periods. Each page is a portal to the past, revealing the secrets of cave paintings, the grandeur of Egyptian art, and the detailed narratives of classical masterpieces.`,
    imgSrc: '/static/images/10280.jpg',
    href: 'https://www.amazon.com',
  },
  {
    title: 'EnjoyArt - Colors of Modernity',
    description: `Continue your artistic journey with "EnjoyArt - Colors of Modernity," the second volume where art breaks free from tradition. From the trailblazing Impressionists to the avant-garde movements of the 20th century, Arnold guides you through a world where art is reimagined. Witness the burst of color, emotion, and innovation that defines modern art.`,
    imgSrc: '/static/images/10663.jpg',
    href: 'https://www.amazon.com',
  },
]

export default projectsData
