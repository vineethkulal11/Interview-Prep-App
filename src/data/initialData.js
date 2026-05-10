export const technologies = [
  {
    id: 'java',
    title: 'Java',
    description: 'Object-oriented programming language',
    icon: 'logo-coffee',
    color: '#E76F00',
  },
  {
    id: 'python',
    title: 'Python',
    description: 'High-level, general-purpose language',
    icon: 'logo-python',
    color: '#3776AB',
  },
  {
    id: 'react',
    title: 'React',
    description: 'JavaScript library for building UIs',
    icon: 'logo-react',
    color: '#61DAFB',
  },
  {
    id: 'html',
    title: 'HTML',
    description: 'Standard markup language for the Web',
    icon: 'logo-html5',
    color: '#E34F26',
  },
  {
    id: 'css',
    title: 'CSS',
    description: 'Style sheet language for HTML',
    icon: 'logo-css3',
    color: '#1572B6',
  }
];

export const categories = [
  { id: 'beginner', title: 'Beginner', icon: 'star-outline', color: '#3B82F6' },
  { id: 'intermediate', title: 'Intermediate', icon: 'star-half', color: '#10B981' },
  { id: 'advanced', title: 'Advanced', icon: 'star', color: '#8B5CF6' },
  { id: 'experience', title: 'Scenario Based (Exp)', icon: 'briefcase-outline', color: '#F59E0B' },
];

export const initialQuestions = {
  java: {
    beginner: [
      { id: 'j_b1', question: 'What is JVM?', answer: 'Java Virtual Machine executes Java bytecode.' }
    ],
    intermediate: [
      { id: 'j_i1', question: 'How does HashMap work?', answer: 'It uses hashing principles with an array of Nodes.' }
    ],
    advanced: [],
    experience: []
  },
  python: {
    beginner: [
      { id: 'p_b1', question: 'What are lists and tuples?', answer: 'Lists are mutable, tuples are immutable.' }
    ],
    intermediate: [],
    advanced: [],
    experience: []
  },
  react: {
    beginner: [
      { id: 'r_b1', question: 'What is JSX?', answer: 'JSX is a syntax extension for JavaScript used with React.' }
    ],
    intermediate: [
      { id: 'r_i1', question: 'What are hooks?', answer: 'Functions that let you hook into React state and lifecycle features from function components.' }
    ],
    advanced: [],
    experience: []
  },
  html: {
    beginner: [
      { id: 'h_b1', question: 'What does HTML stand for?', answer: 'Hyper Text Markup Language.' }
    ],
    intermediate: [],
    advanced: [],
    experience: []
  },
  css: {
    beginner: [
      { id: 'c_b1', question: 'What is CSS?', answer: 'Cascading Style Sheets.' }
    ],
    intermediate: [],
    advanced: [],
    experience: []
  }
};
