import type { LearningModule } from '../types/roadmap';

export interface TopicCurriculum {
  topic: string;
  modules: LearningModule[];
  project: string;
}

export const learningCurriculum: Record<string, TopicCurriculum> = {
  'Python': {
    topic: 'Python',
    modules: [
      {
        id: 'py-mod-1',
        title: 'Python Fundamentals',
        topics: ['Variables', 'Data Types', 'Operators', 'Conditions', 'Loops', 'Functions']
      },
      {
        id: 'py-mod-2',
        title: 'Intermediate Python',
        topics: ['Lists', 'Dictionaries', 'Sets', 'Tuples', 'File Handling', 'Exception Handling']
      },
      {
        id: 'py-mod-3',
        title: 'Advanced Python',
        topics: ['Object-Oriented Programming', 'Modules', 'Decorators', 'Generators']
      }
    ],
    project: 'Build a CLI calculator and a file-based task manager.'
  },
  'Java': {
    topic: 'Java',
    modules: [
      {
        id: 'java-mod-1',
        title: 'Java Basics',
        topics: ['JVM/JDK/JRE', 'Variables', 'Control Flow', 'Basic Syntax']
      },
      {
        id: 'java-mod-2',
        title: 'Object-Oriented Java',
        topics: ['Classes', 'Objects', 'Constructors', 'Methods', 'Inheritance', 'Polymorphism']
      },
      {
        id: 'java-mod-3',
        title: 'Advanced Java Concepts',
        topics: ['Interfaces', 'Exceptions', 'Collections Framework', 'Generics']
      }
    ],
    project: 'Build a banking system console application using OOP principles.'
  },
  'SQL': {
    topic: 'SQL',
    modules: [
      {
        id: 'sql-mod-1',
        title: 'SQL Fundamentals',
        topics: ['SELECT', 'WHERE', 'ORDER BY', 'INSERT/UPDATE/DELETE']
      },
      {
        id: 'sql-mod-2',
        title: 'Intermediate SQL',
        topics: ['JOINs (INNER, LEFT, RIGHT)', 'GROUP BY', 'Aggregate Functions']
      },
      {
        id: 'sql-mod-3',
        title: 'Database Design',
        topics: ['Primary Keys', 'Foreign Keys', 'Normalization', 'Constraints']
      }
    ],
    project: 'Design and build a normalized student enrollment database.'
  },
  'HTML/CSS': {
    topic: 'HTML/CSS',
    modules: [
      {
        id: 'html-mod-1',
        title: 'HTML Essentials',
        topics: ['HTML Elements', 'Semantic HTML', 'Forms', 'Attributes']
      },
      {
        id: 'html-mod-2',
        title: 'CSS Styling',
        topics: ['CSS Selectors', 'Box Model', 'Colors and Typography']
      },
      {
        id: 'html-mod-3',
        title: 'Modern Layouts',
        topics: ['Flexbox', 'CSS Grid', 'Positioning', 'Responsive Design']
      }
    ],
    project: 'Build a fully responsive personal portfolio landing page.'
  },
  'JavaScript': {
    topic: 'JavaScript',
    modules: [
      {
        id: 'js-mod-1',
        title: 'JavaScript Basics',
        topics: ['Variables', 'let/const', 'Functions', 'Data Types']
      },
      {
        id: 'js-mod-2',
        title: 'Data Structures & DOM',
        topics: ['Arrays', 'Objects', 'DOM Manipulation', 'Event Listeners']
      },
      {
        id: 'js-mod-3',
        title: 'Modern JS & Async',
        topics: ['ES6+ Features', 'Promises', 'Async/Await', 'Fetch API']
      }
    ],
    project: 'Build an interactive weather dashboard fetching data from a public API.'
  },
  'Data Structures': {
    topic: 'Data Structures',
    modules: [
      {
        id: 'ds-mod-1',
        title: 'Linear Data Structures',
        topics: ['Arrays', 'Linked Lists', 'Stacks', 'Queues']
      },
      {
        id: 'ds-mod-2',
        title: 'Non-Linear Data Structures',
        topics: ['Trees', 'Binary Search Trees', 'Graphs', 'Hashing']
      },
      {
        id: 'ds-mod-3',
        title: 'Algorithms',
        topics: ['Sorting Algorithms', 'Searching Algorithms', 'Time Complexity (Big O)']
      }
    ],
    project: 'Implement a custom stack, queue, and a sorting visualizer.'
  },
  'Cybersecurity': {
    topic: 'Cybersecurity',
    modules: [
      {
        id: 'sec-mod-1',
        title: 'Security Fundamentals',
        topics: ['CIA Triad', 'Authentication', 'Authorization']
      },
      {
        id: 'sec-mod-2',
        title: 'Cryptography & Networks',
        topics: ['Encryption', 'Hashing', 'Firewalls', 'Network Security']
      },
      {
        id: 'sec-mod-3',
        title: 'Threats & Attacks',
        topics: ['Phishing', 'Malware', 'SQL Injection', 'XSS']
      }
    ],
    project: 'Perform a basic vulnerability assessment and secure a mock login portal.'
  },
  'AI/ML': {
    topic: 'AI/ML',
    modules: [
      {
        id: 'ai-mod-1',
        title: 'AI/ML Foundations',
        topics: ['AI vs ML', 'Supervised Learning', 'Unsupervised Learning']
      },
      {
        id: 'ai-mod-2',
        title: 'Machine Learning Models',
        topics: ['Classification', 'Regression', 'Training/Testing Data', 'Overfitting', 'Evaluation Metrics']
      },
      {
        id: 'ai-mod-3',
        title: 'Advanced AI',
        topics: ['Neural Networks', 'Deep Learning Basics', 'Generative AI Concepts']
      }
    ],
    project: 'Build a simple prediction model and a Gemini-powered AI application.'
  }
};
