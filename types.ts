
export interface Project {
  title: string;
  description: string;
  impact: string;
  tech: string[];
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface Achievement {
  title: string;
  detail: string;
}

export interface Expectation {
  title: string;
  description: string;
  strength: string;
}
