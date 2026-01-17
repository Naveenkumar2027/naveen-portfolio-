
import { Project, SkillGroup, Achievement, Expectation } from './types';

export const SKILLS: SkillGroup[] = [
  {
    category: "Backend",
    items: ["Node.js", "Python (Django/FastAPI)", "Java (Spring Boot)", "PostgreSQL", "Redis", "gRPC"]
  },
  {
    category: "Frontend",
    items: ["React.js", "TypeScript", "Next.js", "Tailwind CSS", "Framer Motion", "Three.js"]
  },
  {
    category: "Systems & AI",
    items: ["Docker", "Kubernetes", "AWS (EC2/S3/Lambda)", "LLM Fine-tuning", "PyTorch", "System Design"]
  }
];

export const PROJECTS: Project[] = [
  {
    title: "Project HyperScale",
    description: "A distributed real-time data processing engine handling 10k+ events/sec.",
    impact: "Reduced data latency by 45% using optimized Redis caching strategies and message queuing.",
    tech: ["Go", "Kafka", "Redis", "ElasticSearch"]
  },
  {
    title: "Neural Vision API",
    description: "Edge-based computer vision system for industrial defect detection.",
    impact: "Deployed on 50+ IoT nodes with a 99.2% accuracy rate in low-light environments.",
    tech: ["Python", "PyTorch", "C++", "Docker"]
  },
  {
    title: "Finance Core",
    description: "High-security payment gateway middleware for cross-border transactions.",
    impact: "Audited and passed enterprise-grade penetration testing; processed over $1M in test volume.",
    tech: ["Java", "Spring Boot", "PostgreSQL", "Azure"]
  }
];

export const EXPECTATIONS: Expectation[] = [
  {
    title: "Algorithmic Precision",
    description: "Ability to optimize code beyond standard libraries and O(n) awareness.",
    strength: "Proven track record in Competitive Programming (Top 5% on LeetCode) and efficient memory management."
  },
  {
    title: "Scalability Thinking",
    description: "Architecting systems that don't just work, but scale gracefully under load.",
    strength: "Hands-on experience with Microservices, Load Balancing, and Database Sharding from scratch."
  },
  {
    title: "Ownership & Execution",
    description: "Taking a feature from abstract concept to production-grade deployment.",
    strength: "Lead Engineer roles in 3 major hackathons, managing end-to-end SDLC and delivery timelines."
  },
  {
    title: "Communication of Complexity",
    description: "Translating deep technical debt or architectural choices into business value.",
    strength: "Mentored 10+ junior developers; authored technical whitepapers on distributed systems."
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  { title: "Smart India Hackathon Finalist", detail: "Top 1% out of 50,000+ teams nationwide for AI-driven logistics solution." },
  { title: "Open Source Contributor", detail: "Critical patches merged into major CNCF projects (Kubernetes ecosystem)." },
  { title: "Academic Excellence", detail: "Maintained 9.5+ CGPA while leading the University Technical Society." }
];
