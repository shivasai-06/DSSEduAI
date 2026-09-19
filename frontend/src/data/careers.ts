import type { CareerRequirement } from './careerRequirements';
import type { CareerInformation } from './careerInformation';

export type CareerCategory = 
  | 'AI & Machine Learning' 
  | 'Data & Analytics' 
  | 'Software Development' 
  | 'Cybersecurity' 
  | 'Cloud & DevOps' 
  | 'Design & Product' 
  | 'Emerging Technology';

export interface CareerDef extends CareerInformation, CareerRequirement {
  category: CareerCategory;
  shortDescription: string;
}

export const CAREER_CATALOG: CareerDef[] = [
  // ============================
  // AI & Machine Learning
  // ============================
  {
    id: 'ai-engineer',
    name: 'AI Engineer',
    category: 'AI & Machine Learning',
    shortDescription: 'Build and deploy AI-powered applications.',
    description: 'AI Engineers build, test, and deploy artificial intelligence models and maintain the underlying infrastructure. They bridge the gap between data science and software engineering to create production-ready AI systems.',
    coreResponsibilities: [
      'Design and build AI models using machine learning algorithms and deep learning neural networks.',
      'Deploy AI models into production applications and APIs.',
      'Optimize AI systems for performance, scalability, and cost.',
      'Build data ingestion and transformation pipelines to feed AI models.'
    ],
    importantSkills: ['Python', 'AI/ML', 'Data Structures', 'SQL'],
    expectedSkillLevels: 'Advanced (90%+) proficiency in Python and AI concepts. Strong foundational knowledge in Data Structures and SQL.',
    technologies: ['TensorFlow', 'PyTorch', 'Docker', 'Kubernetes', 'AWS/GCP/Azure', 'FastAPI'],
    title: 'AI Engineer', // for backward compat with CareerRequirement
    requiredSkills: [
      { topic: 'Python', category: 'technical', targetLevel: 90 },
      { topic: 'AI/ML', category: 'technical', targetLevel: 90 },
      { topic: 'Data Structures', category: 'core', targetLevel: 80 },
      { topic: 'SQL', category: 'technical', targetLevel: 60 }
    ]
  },
  {
    id: 'ml-engineer',
    name: 'Machine Learning Engineer',
    category: 'AI & Machine Learning',
    shortDescription: 'Operationalize machine learning models for production.',
    description: 'Machine Learning Engineers focus on the operationalization of machine learning models. They take prototypes created by Data Scientists and scale them for production use.',
    coreResponsibilities: [
      'Implement machine learning algorithms and libraries.',
      'Run machine learning tests and experiments.',
      'Design and architect machine learning systems.',
      'Perform statistical analysis and fine-tuning using test results.'
    ],
    importantSkills: ['Python', 'AI/ML', 'SQL', 'Data Structures'],
    expectedSkillLevels: 'Advanced (90%+) in Python, with Intermediate to Advanced (70-80%+) knowledge of ML algorithms and relational databases.',
    technologies: ['Scikit-Learn', 'Pandas', 'MLflow', 'Airflow', 'Spark', 'SQL'],
    title: 'Machine Learning Engineer',
    requiredSkills: [
      { topic: 'Python', category: 'technical', targetLevel: 90 },
      { topic: 'AI/ML', category: 'technical', targetLevel: 80 },
      { topic: 'SQL', category: 'technical', targetLevel: 70 },
      { topic: 'Data Structures', category: 'core', targetLevel: 70 }
    ]
  },
  {
    id: 'ai-ml-engineer',
    name: 'AI/ML Engineer',
    category: 'AI & Machine Learning',
    shortDescription: 'Hybrid role spanning both artificial intelligence and machine learning pipelines.',
    description: 'A hybrid role focusing on the end-to-end lifecycle of AI and ML models, from data preparation and algorithm selection to deployment and monitoring.',
    coreResponsibilities: [
      'Develop end-to-end AI/ML pipelines.',
      'Research and implement novel AI approaches.',
      'Collaborate with data engineers for data sourcing.'
    ],
    importantSkills: ['Python', 'AI/ML', 'SQL'],
    expectedSkillLevels: 'Advanced (85%+) in Python and AI/ML concepts.',
    technologies: ['Python', 'PyTorch', 'Scikit-Learn'],
    title: 'AI/ML Engineer',
    requiredSkills: [
      { topic: 'Python', category: 'technical', targetLevel: 90 },
      { topic: 'AI/ML', category: 'technical', targetLevel: 85 },
      { topic: 'SQL', category: 'technical', targetLevel: 60 }
    ]
  },
  {
    id: 'generative-ai-engineer',
    name: 'Generative AI Engineer',
    category: 'AI & Machine Learning',
    shortDescription: 'Build applications utilizing generative models and foundation models.',
    description: 'Focuses on integrating and fine-tuning generative models (like LLMs and diffusion models) into business applications.',
    coreResponsibilities: [
      'Fine-tune foundation models on custom datasets.',
      'Build generative AI pipelines.',
      'Implement RAG (Retrieval-Augmented Generation) systems.'
    ],
    importantSkills: ['Python', 'AI/ML', 'Vector Databases (Future Skill)'],
    expectedSkillLevels: 'Advanced in Python and generative ML concepts.',
    technologies: ['LangChain', 'Hugging Face', 'OpenAI API'],
    title: 'Generative AI Engineer',
    requiredSkills: [
      { topic: 'Python', category: 'technical', targetLevel: 90 },
      { topic: 'AI/ML', category: 'technical', targetLevel: 85 },
      { topic: 'Data Structures', category: 'core', targetLevel: 70 },
      { topic: 'Vector Databases', category: 'technical', targetLevel: 70 } // Future skill
    ]
  },
  {
    id: 'llm-engineer',
    name: 'LLM Engineer',
    category: 'AI & Machine Learning',
    shortDescription: 'Specialize in Large Language Models (LLMs) and advanced natural language processing.',
    description: 'Specializes in the training, fine-tuning, and deployment of Large Language Models (LLMs).',
    coreResponsibilities: [
      'Train and fine-tune large language models.',
      'Optimize LLM inference latency.',
      'Build scalable RAG architectures.'
    ],
    importantSkills: ['Python', 'AI/ML'],
    expectedSkillLevels: 'Expert in Python and deep learning architectures.',
    technologies: ['PyTorch', 'Transformers', 'vLLM'],
    title: 'LLM Engineer',
    requiredSkills: [
      { topic: 'Python', category: 'technical', targetLevel: 95 },
      { topic: 'AI/ML', category: 'technical', targetLevel: 90 }
    ]
  },
  {
    id: 'prompt-engineer',
    name: 'Prompt Engineer',
    category: 'AI & Machine Learning',
    shortDescription: 'Design and optimize prompts for AI models to achieve desired outputs.',
    description: 'Specializes in crafting, testing, and refining text prompts to get optimal performance and accurate outputs from generative AI models.',
    coreResponsibilities: [
      'Design robust prompts for various AI tasks.',
      'Test and evaluate AI model outputs.',
      'Build prompt templates for production systems.'
    ],
    importantSkills: ['AI/ML', 'Python', 'Communication (Soft Skill)'],
    expectedSkillLevels: 'Strong understanding of AI behavior and intermediate Python for automation.',
    technologies: ['OpenAI Playground', 'LangChain', 'Python'],
    title: 'Prompt Engineer',
    requiredSkills: [
      { topic: 'AI/ML', category: 'technical', targetLevel: 70 },
      { topic: 'Python', category: 'technical', targetLevel: 50 },
      { topic: 'Prompt Engineering', category: 'technical', targetLevel: 90 } // Future skill
    ]
  },
  {
    id: 'nlp-engineer',
    name: 'NLP Engineer',
    category: 'AI & Machine Learning',
    shortDescription: 'Develop systems that understand and process human language.',
    description: 'Natural Language Processing Engineers create applications that can understand, interpret, and manipulate human language.',
    coreResponsibilities: [
      'Develop NLP models and text processing algorithms.',
      'Implement sentiment analysis and entity recognition.',
      'Train speech-to-text and text-to-speech models.'
    ],
    importantSkills: ['Python', 'AI/ML', 'Data Structures'],
    expectedSkillLevels: 'Advanced Python and deep ML knowledge.',
    technologies: ['spaCy', 'NLTK', 'Transformers', 'Python'],
    title: 'NLP Engineer',
    requiredSkills: [
      { topic: 'Python', category: 'technical', targetLevel: 90 },
      { topic: 'AI/ML', category: 'technical', targetLevel: 85 },
      { topic: 'Data Structures', category: 'core', targetLevel: 75 }
    ]
  },
  {
    id: 'computer-vision-engineer',
    name: 'Computer Vision Engineer',
    category: 'AI & Machine Learning',
    shortDescription: 'Build AI systems that process and analyze visual data.',
    description: 'Focuses on creating algorithms and models that allow computers to extract meaning from digital images and videos.',
    coreResponsibilities: [
      'Develop image recognition and object detection models.',
      'Implement video tracking algorithms.',
      'Optimize models for edge devices.'
    ],
    importantSkills: ['Python', 'AI/ML', 'Data Structures'],
    expectedSkillLevels: 'Advanced Python, strong mathematics, and deep learning expertise.',
    technologies: ['OpenCV', 'PyTorch', 'CUDA'],
    title: 'Computer Vision Engineer',
    requiredSkills: [
      { topic: 'Python', category: 'technical', targetLevel: 90 },
      { topic: 'AI/ML', category: 'technical', targetLevel: 85 },
      { topic: 'Data Structures', category: 'core', targetLevel: 70 }
    ]
  },

  // ============================
  // Data & Analytics
  // ============================
  {
    id: 'data-scientist',
    name: 'Data Scientist',
    category: 'Data & Analytics',
    shortDescription: 'Analyze complex datasets to extract actionable insights.',
    description: 'Data Scientists analyze and interpret complex digital data to help organizations make better business decisions. They use advanced analytics technologies, including machine learning and predictive modeling.',
    coreResponsibilities: [
      'Clean, aggregate, and organize data from multiple sources.',
      'Perform exploratory data analysis to find patterns and trends.',
      'Build predictive models and machine learning algorithms.',
      'Communicate findings through data visualization and reports.'
    ],
    importantSkills: ['Python', 'SQL', 'AI/ML', 'Data Structures'],
    expectedSkillLevels: 'Advanced (80-90%+) in Python and SQL, with strong statistical and ML foundations.',
    technologies: ['Jupyter', 'Pandas', 'NumPy', 'Tableau', 'PowerBI', 'Hadoop'],
    title: 'Data Scientist',
    requiredSkills: [
      { topic: 'Python', category: 'technical', targetLevel: 90 },
      { topic: 'SQL', category: 'technical', targetLevel: 80 },
      { topic: 'AI/ML', category: 'technical', targetLevel: 70 },
      { topic: 'Data Structures', category: 'core', targetLevel: 50 }
    ]
  },
  {
    id: 'data-analyst',
    name: 'Data Analyst',
    category: 'Data & Analytics',
    shortDescription: 'Collect, process, and perform statistical analysis on data.',
    description: 'Data Analysts collect, clean, and interpret data sets in order to answer a question or solve a business problem. They focus heavily on reporting and visualization.',
    coreResponsibilities: [
      'Gather data from primary or secondary data sources.',
      'Filter and "clean" data by reviewing computer reports and performance indicators.',
      'Identify, analyze, and interpret trends in complex data sets.',
      'Create dashboards and reports for stakeholders.'
    ],
    importantSkills: ['SQL', 'Python', 'Data Structures'],
    expectedSkillLevels: 'Advanced (90%+) in SQL and data manipulation, with solid scripting (Python) abilities.',
    technologies: ['Excel', 'SQL', 'Tableau', 'Looker', 'Python'],
    title: 'Data Analyst',
    requiredSkills: [
      { topic: 'SQL', category: 'technical', targetLevel: 90 },
      { topic: 'Python', category: 'technical', targetLevel: 70 },
      { topic: 'Data Structures', category: 'core', targetLevel: 40 }
    ]
  },
  {
    id: 'data-engineer',
    name: 'Data Engineer',
    category: 'Data & Analytics',
    shortDescription: 'Design and build systems for collecting, storing, and analyzing data.',
    description: 'Data Engineers build and maintain the infrastructure and pipelines that allow organizations to collect, store, and analyze massive amounts of data.',
    coreResponsibilities: [
      'Design and build scalable data pipelines.',
      'Manage data warehouse and data lake architecture.',
      'Optimize database queries and ETL processes.'
    ],
    importantSkills: ['SQL', 'Python', 'Java'],
    expectedSkillLevels: 'Expert in SQL, strong in Python/Java, and familiar with cloud data tools.',
    technologies: ['Spark', 'Kafka', 'Airflow', 'Snowflake', 'SQL'],
    title: 'Data Engineer',
    requiredSkills: [
      { topic: 'SQL', category: 'technical', targetLevel: 90 },
      { topic: 'Python', category: 'technical', targetLevel: 80 },
      { topic: 'Java', category: 'technical', targetLevel: 60 },
      { topic: 'Data Engineering', category: 'technical', targetLevel: 80 } // Future skill
    ]
  },

  // ============================
  // Software Development
  // ============================
  {
    id: 'software-engineer',
    name: 'Software Engineer',
    category: 'Software Development',
    shortDescription: 'Design, develop, and maintain software applications and systems.',
    description: 'Software Engineers apply principles of software engineering to the design, development, maintenance, testing, and evaluation of computer software.',
    coreResponsibilities: [
      'Develop, test, and maintain robust software applications.',
      'Write clean, scalable, and efficient code.',
      'Collaborate with cross-functional teams to define and design new features.',
      'Debug and resolve complex technical issues.'
    ],
    importantSkills: ['Java', 'Python', 'Data Structures', 'SQL'],
    expectedSkillLevels: 'Intermediate to Advanced (70-80%+) in primary programming languages (Java/Python) and Data Structures.',
    technologies: ['Git', 'Docker', 'Linux', 'Spring Boot', 'Django', 'PostgreSQL'],
    title: 'Software Engineer',
    requiredSkills: [
      { topic: 'Java', category: 'technical', targetLevel: 80 },
      { topic: 'Python', category: 'technical', targetLevel: 70 },
      { topic: 'Data Structures', category: 'core', targetLevel: 80 },
      { topic: 'SQL', category: 'technical', targetLevel: 60 }
    ]
  },
  {
    id: 'software-developer',
    name: 'Software Developer',
    category: 'Software Development',
    shortDescription: 'Build and modify general computer applications software.',
    description: 'Software Developers are the creative minds behind computer programs, focusing on building applications for users.',
    coreResponsibilities: [
      'Write and test code for new applications.',
      'Update existing software systems.',
      'Create technical documentation.'
    ],
    importantSkills: ['JavaScript', 'Python', 'Data Structures'],
    expectedSkillLevels: 'Strong programming fundamentals.',
    technologies: ['Git', 'JavaScript', 'Python'],
    title: 'Software Developer',
    requiredSkills: [
      { topic: 'JavaScript', category: 'technical', targetLevel: 80 },
      { topic: 'Python', category: 'technical', targetLevel: 70 },
      { topic: 'Data Structures', category: 'core', targetLevel: 70 }
    ]
  },
  {
    id: 'full-stack-developer',
    name: 'Full Stack Developer',
    category: 'Software Development',
    shortDescription: 'Build both the frontend and backend of web applications.',
    description: 'Full Stack Developers are proficient in both frontend and backend development. They can build complete web applications from the user interface to the database.',
    coreResponsibilities: [
      'Develop interactive user interfaces using modern web frameworks.',
      'Design and create robust backend APIs and services.',
      'Manage database schemas and perform query optimization.',
      'Ensure cross-platform optimization for mobile and web.'
    ],
    importantSkills: ['HTML/CSS', 'JavaScript', 'SQL', 'Data Structures'],
    expectedSkillLevels: 'Advanced (90%+) in web technologies (HTML/CSS/JS) with solid Intermediate (70%+) database and backend skills.',
    technologies: ['React', 'Node.js', 'Express', 'TailwindCSS', 'MongoDB', 'TypeScript'],
    title: 'Full Stack Developer',
    requiredSkills: [
      { topic: 'HTML/CSS', category: 'technical', targetLevel: 90 },
      { topic: 'JavaScript', category: 'technical', targetLevel: 90 },
      { topic: 'SQL', category: 'technical', targetLevel: 70 },
      { topic: 'Data Structures', category: 'core', targetLevel: 60 },
      { topic: 'Python', category: 'technical', targetLevel: 50 }
    ]
  },
  {
    id: 'frontend-developer',
    name: 'Frontend Developer',
    category: 'Software Development',
    shortDescription: 'Create interactive user interfaces for websites and applications.',
    description: 'Frontend Developers specialize in the visual and interactive components of a website, ensuring a seamless user experience.',
    coreResponsibilities: [
      'Implement responsive web designs.',
      'Optimize web pages for maximum speed and scalability.',
      'Collaborate with UI/UX designers.'
    ],
    importantSkills: ['HTML/CSS', 'JavaScript'],
    expectedSkillLevels: 'Expert in HTML/CSS and JavaScript.',
    technologies: ['React', 'Vue', 'TailwindCSS'],
    title: 'Frontend Developer',
    requiredSkills: [
      { topic: 'HTML/CSS', category: 'technical', targetLevel: 95 },
      { topic: 'JavaScript', category: 'technical', targetLevel: 90 }
    ]
  },
  {
    id: 'backend-developer',
    name: 'Backend Developer',
    category: 'Software Development',
    shortDescription: 'Build the server-side logic and databases that power applications.',
    description: 'Backend Developers focus on server-side web application logic and integration of the work front-end developers do.',
    coreResponsibilities: [
      'Build and maintain APIs.',
      'Design database schemas.',
      'Implement security and data protection.'
    ],
    importantSkills: ['Java', 'Python', 'SQL', 'Data Structures'],
    expectedSkillLevels: 'Expert in server-side languages and databases.',
    technologies: ['Node.js', 'Spring Boot', 'Django', 'PostgreSQL'],
    title: 'Backend Developer',
    requiredSkills: [
      { topic: 'Java', category: 'technical', targetLevel: 85 },
      { topic: 'Python', category: 'technical', targetLevel: 80 },
      { topic: 'SQL', category: 'technical', targetLevel: 85 },
      { topic: 'Data Structures', category: 'core', targetLevel: 80 }
    ]
  },
  {
    id: 'python-developer',
    name: 'Python Developer',
    category: 'Software Development',
    shortDescription: 'Specialize in backend development and scripting using Python.',
    description: 'A developer focused entirely on the Python ecosystem for web development, scripting, and automation.',
    coreResponsibilities: [
      'Write effective, scalable Python code.',
      'Develop backend components.',
      'Test and debug programs.'
    ],
    importantSkills: ['Python', 'SQL', 'Data Structures'],
    expectedSkillLevels: 'Expert in Python.',
    technologies: ['Django', 'FastAPI', 'Flask'],
    title: 'Python Developer',
    requiredSkills: [
      { topic: 'Python', category: 'technical', targetLevel: 95 },
      { topic: 'SQL', category: 'technical', targetLevel: 70 },
      { topic: 'Data Structures', category: 'core', targetLevel: 75 }
    ]
  },
  {
    id: 'java-developer',
    name: 'Java Developer',
    category: 'Software Development',
    shortDescription: 'Build enterprise-grade applications using the Java ecosystem.',
    description: 'Specializes in the design, development, and management of Java-based applications.',
    coreResponsibilities: [
      'Design and build Java applications.',
      'Ensure high performance and responsiveness.',
      'Identify bottlenecks and bugs.'
    ],
    importantSkills: ['Java', 'SQL', 'Data Structures'],
    expectedSkillLevels: 'Expert in Java and Object-Oriented Programming.',
    technologies: ['Spring Boot', 'Hibernate', 'Maven'],
    title: 'Java Developer',
    requiredSkills: [
      { topic: 'Java', category: 'technical', targetLevel: 95 },
      { topic: 'SQL', category: 'technical', targetLevel: 75 },
      { topic: 'Data Structures', category: 'core', targetLevel: 80 }
    ]
  },
  {
    id: 'javascript-developer',
    name: 'JavaScript Developer',
    category: 'Software Development',
    shortDescription: 'Focus on full-stack or frontend development using JavaScript.',
    description: 'Specializes in JavaScript/TypeScript for both frontend and backend (Node.js) applications.',
    coreResponsibilities: [
      'Write scalable JavaScript/TypeScript code.',
      'Build single-page applications (SPAs).'
    ],
    importantSkills: ['JavaScript', 'HTML/CSS'],
    expectedSkillLevels: 'Expert in JavaScript ecosystem.',
    technologies: ['React', 'Node.js', 'TypeScript'],
    title: 'JavaScript Developer',
    requiredSkills: [
      { topic: 'JavaScript', category: 'technical', targetLevel: 95 },
      { topic: 'HTML/CSS', category: 'technical', targetLevel: 80 }
    ]
  },
  {
    id: 'mobile-app-developer',
    name: 'Mobile App Developer',
    category: 'Software Development',
    shortDescription: 'Create applications for iOS and Android devices.',
    description: 'Specializes in mobile technology such as building apps for Google\'s Android, Apple\'s iOS and Microsoft\'s Windows Phone platforms.',
    coreResponsibilities: [
      'Build native or cross-platform mobile apps.',
      'Ensure mobile performance and UI responsiveness.'
    ],
    importantSkills: ['Java', 'JavaScript', 'Mobile Development (Future Skill)'],
    expectedSkillLevels: 'Strong understanding of mobile SDKs.',
    technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin'],
    title: 'Mobile App Developer',
    requiredSkills: [
      { topic: 'JavaScript', category: 'technical', targetLevel: 80 },
      { topic: 'Java', category: 'technical', targetLevel: 70 },
      { topic: 'Mobile Development', category: 'technical', targetLevel: 85 } // Future Skill
    ]
  },
  {
    id: 'sdet',
    name: 'SDET / Test Automation Engineer',
    category: 'Software Development',
    shortDescription: 'Write code to automate the testing of software applications.',
    description: 'Software Development Engineer in Test (SDET) writes code to test code, focusing on automation frameworks.',
    coreResponsibilities: [
      'Build automated testing frameworks.',
      'Perform continuous testing in CI/CD.',
      'Write script to simulate user behavior.'
    ],
    importantSkills: ['Python', 'Java', 'JavaScript'],
    expectedSkillLevels: 'Strong coding skills for automation.',
    technologies: ['Selenium', 'Cypress', 'JUnit', 'PyTest'],
    title: 'SDET / Test Automation Engineer',
    requiredSkills: [
      { topic: 'Python', category: 'technical', targetLevel: 80 },
      { topic: 'Java', category: 'technical', targetLevel: 70 },
      { topic: 'JavaScript', category: 'technical', targetLevel: 70 }
    ]
  },

  // ============================
  // Cybersecurity
  // ============================
  {
    id: 'cybersecurity-engineer',
    name: 'Cybersecurity Engineer',
    category: 'Cybersecurity',
    shortDescription: 'Design and implement secure network solutions to defend against cyber threats.',
    description: 'Cybersecurity Engineers design and implement secure network solutions to defend against advanced cyber threats and vulnerabilities. They build security systems rather than just analyzing them.',
    coreResponsibilities: [
      'Design, build, and maintain secure IT infrastructure and networks.',
      'Implement advanced encryption and cryptographic systems.',
      'Automate security testing and incident response using Python.',
      'Conduct code reviews for secure coding practices in applications.'
    ],
    importantSkills: ['Cybersecurity', 'Python', 'Data Structures', 'SQL', 'HTML/CSS', 'JavaScript'],
    expectedSkillLevels: 'Expert (90%+) in core cybersecurity architecture, with strong (75%+) Python automation skills and solid CS fundamentals.',
    technologies: ['Python', 'Linux', 'AWS Security', 'HashiCorp Vault', 'Burp Suite', 'Docker Security'],
    title: 'Cybersecurity Engineer',
    requiredSkills: [
      { topic: 'Cybersecurity', category: 'core', targetLevel: 90 },
      { topic: 'Python', category: 'technical', targetLevel: 75 },
      { topic: 'Data Structures', category: 'core', targetLevel: 60 },
      { topic: 'SQL', category: 'technical', targetLevel: 55 },
      { topic: 'HTML/CSS', category: 'technical', targetLevel: 40 },
      { topic: 'JavaScript', category: 'technical', targetLevel: 40 }
    ]
  },
  {
    id: 'cybersecurity-analyst',
    name: 'Cybersecurity Analyst',
    category: 'Cybersecurity',
    shortDescription: 'Protect IT infrastructure and networks from cyber threats.',
    description: 'Cybersecurity Analysts protect IT infrastructure (including networks, hardware, and software) from a range of criminal activity. They monitor networks and systems, detect security threats, and implement security measures.',
    coreResponsibilities: [
      'Monitor network traffic for security incidents and investigate violations.',
      'Install and operate security software (firewalls, encryption programs).',
      'Conduct penetration testing and vulnerability assessments.',
      'Develop company-wide best practices for IT security.'
    ],
    importantSkills: ['Cybersecurity', 'Python', 'SQL', 'Java'],
    expectedSkillLevels: 'Advanced (90%+) in core security concepts, with basic to intermediate scripting and database knowledge.',
    technologies: ['Wireshark', 'Metasploit', 'Splunk', 'Kali Linux', 'SIEM tools'],
    title: 'Cybersecurity Analyst',
    requiredSkills: [
      { topic: 'Cybersecurity', category: 'core', targetLevel: 90 },
      { topic: 'Python', category: 'technical', targetLevel: 60 },
      { topic: 'SQL', category: 'technical', targetLevel: 50 },
      { topic: 'Java', category: 'technical', targetLevel: 40 }
    ]
  },
  {
    id: 'security-engineer',
    name: 'Security Engineer',
    category: 'Cybersecurity',
    shortDescription: 'Build tools and systems to keep organizational data secure.',
    description: 'Focuses on building and integrating security tools, policies, and practices into the company’s infrastructure.',
    coreResponsibilities: [
      'Build security into software and infrastructure.',
      'Manage firewall and network security.',
      'Perform security audits.'
    ],
    importantSkills: ['Cybersecurity', 'Python', 'Data Structures'],
    expectedSkillLevels: 'Expert in system security.',
    technologies: ['Firewalls', 'Python', 'Linux'],
    title: 'Security Engineer',
    requiredSkills: [
      { topic: 'Cybersecurity', category: 'core', targetLevel: 90 },
      { topic: 'Python', category: 'technical', targetLevel: 75 },
      { topic: 'Data Structures', category: 'core', targetLevel: 65 }
    ]
  },
  {
    id: 'soc-analyst',
    name: 'SOC Analyst',
    category: 'Cybersecurity',
    shortDescription: 'Monitor and respond to security alerts in a Security Operations Center.',
    description: 'Frontline responders to cyber attacks, monitoring systems 24/7 for suspicious activity and triaging security alerts.',
    coreResponsibilities: [
      'Monitor SIEM alerts.',
      'Investigate suspicious network activity.',
      'Execute incident response playbooks.'
    ],
    importantSkills: ['Cybersecurity', 'Networking (Future Skill)'],
    expectedSkillLevels: 'Strong analytical and monitoring skills.',
    technologies: ['Splunk', 'CrowdStrike', 'Wireshark'],
    title: 'SOC Analyst',
    requiredSkills: [
      { topic: 'Cybersecurity', category: 'core', targetLevel: 85 },
      { topic: 'Networking', category: 'technical', targetLevel: 75 } // Future skill
    ]
  },
  {
    id: 'ethical-hacker',
    name: 'Ethical Hacker',
    category: 'Cybersecurity',
    shortDescription: 'Identify vulnerabilities in systems by legally hacking them.',
    description: 'Hired to bypass system security and search for weak points that malicious hackers could exploit.',
    coreResponsibilities: [
      'Perform authorized hacks on company networks.',
      'Find and document vulnerabilities.',
      'Suggest security patches.'
    ],
    importantSkills: ['Cybersecurity', 'Python', 'JavaScript'],
    expectedSkillLevels: 'Expert understanding of vulnerabilities and exploits.',
    technologies: ['Kali Linux', 'Metasploit', 'Burp Suite'],
    title: 'Ethical Hacker',
    requiredSkills: [
      { topic: 'Cybersecurity', category: 'core', targetLevel: 95 },
      { topic: 'Python', category: 'technical', targetLevel: 80 },
      { topic: 'JavaScript', category: 'technical', targetLevel: 70 },
      { topic: 'SQL', category: 'technical', targetLevel: 60 }
    ]
  },
  {
    id: 'penetration-tester',
    name: 'Penetration Tester',
    category: 'Cybersecurity',
    shortDescription: 'Conduct simulated cyberattacks to assess security.',
    description: 'Specializes in planning and executing simulated attacks (pen tests) on specific networks, applications, or systems.',
    coreResponsibilities: [
      'Conduct web application pen testing.',
      'Conduct network pen testing.',
      'Write detailed security reports.'
    ],
    importantSkills: ['Cybersecurity', 'Python', 'JavaScript'],
    expectedSkillLevels: 'Expert in attack vectors and scripting.',
    technologies: ['Nmap', 'Burp Suite', 'Python'],
    title: 'Penetration Tester',
    requiredSkills: [
      { topic: 'Cybersecurity', category: 'core', targetLevel: 95 },
      { topic: 'Python', category: 'technical', targetLevel: 85 },
      { topic: 'JavaScript', category: 'technical', targetLevel: 75 }
    ]
  },
  {
    id: 'cloud-security-engineer',
    name: 'Cloud Security Engineer',
    category: 'Cybersecurity',
    shortDescription: 'Secure cloud infrastructure and environments.',
    description: 'Focuses entirely on securing data, applications, and infrastructure deployed in cloud environments.',
    coreResponsibilities: [
      'Implement IAM policies.',
      'Secure AWS/Azure/GCP environments.',
      'Monitor cloud compliance.'
    ],
    importantSkills: ['Cybersecurity', 'Cloud Computing (Future Skill)'],
    expectedSkillLevels: 'Expert in cloud architectures and security protocols.',
    technologies: ['AWS IAM', 'GuardDuty', 'Terraform'],
    title: 'Cloud Security Engineer',
    requiredSkills: [
      { topic: 'Cybersecurity', category: 'core', targetLevel: 90 },
      { topic: 'Cloud Computing', category: 'technical', targetLevel: 85 }, // Future skill
      { topic: 'Python', category: 'technical', targetLevel: 60 }
    ]
  },

  // ============================
  // Cloud & DevOps
  // ============================
  {
    id: 'devops-engineer',
    name: 'DevOps Engineer',
    category: 'Cloud & DevOps',
    shortDescription: 'Bridge software development and IT operations to streamline deployments.',
    description: 'Introduces processes, tools, and methodologies to balance needs throughout the software development life cycle, from coding and deployment, to maintenance and updates.',
    coreResponsibilities: [
      'Build and maintain CI/CD pipelines.',
      'Automate infrastructure provisioning (IaC).',
      'Monitor system health and reliability.'
    ],
    importantSkills: ['Python', 'Linux (Future Skill)', 'Cloud Computing (Future Skill)'],
    expectedSkillLevels: 'Strong scripting and deep knowledge of infrastructure.',
    technologies: ['Docker', 'Kubernetes', 'Jenkins', 'Terraform', 'AWS'],
    title: 'DevOps Engineer',
    requiredSkills: [
      { topic: 'Python', category: 'technical', targetLevel: 85 },
      { topic: 'Linux', category: 'technical', targetLevel: 80 }, // Future skill
      { topic: 'Cloud Computing', category: 'technical', targetLevel: 80 } // Future skill
    ]
  },
  {
    id: 'cloud-engineer',
    name: 'Cloud Engineer',
    category: 'Cloud & DevOps',
    shortDescription: 'Design, build, and maintain cloud infrastructure.',
    description: 'IT professionals responsible for any technological duties associated with cloud computing, including design, planning, management, and maintenance.',
    coreResponsibilities: [
      'Migrate on-premise systems to the cloud.',
      'Architect highly available cloud systems.',
      'Manage cloud billing and resource optimization.'
    ],
    importantSkills: ['Python', 'SQL', 'Cloud Computing (Future Skill)'],
    expectedSkillLevels: 'Expert in at least one major cloud provider (AWS/GCP/Azure).',
    technologies: ['AWS', 'Azure', 'GCP', 'Terraform', 'Python'],
    title: 'Cloud Engineer',
    requiredSkills: [
      { topic: 'Cloud Computing', category: 'technical', targetLevel: 90 }, // Future skill
      { topic: 'Python', category: 'technical', targetLevel: 70 },
      { topic: 'SQL', category: 'technical', targetLevel: 60 },
      { topic: 'Linux', category: 'technical', targetLevel: 75 } // Future skill
    ]
  },

  // ============================
  // Design & Product
  // ============================
  {
    id: 'ui-ux-designer',
    name: 'UI/UX Designer',
    category: 'Design & Product',
    shortDescription: 'Design user interfaces and craft user experiences.',
    description: 'Responsible for the design and implementation of all the experiences a user has when interacting with a digital tool.',
    coreResponsibilities: [
      'Conduct user research and usability testing.',
      'Create wireframes and prototypes.',
      'Design visually appealing user interfaces.'
    ],
    importantSkills: ['HTML/CSS', 'Design (Future Skill)'],
    expectedSkillLevels: 'Expert in design tools, basic understanding of frontend tech.',
    technologies: ['Figma', 'Adobe XD', 'HTML/CSS'],
    title: 'UI/UX Designer',
    requiredSkills: [
      { topic: 'Design', category: 'core', targetLevel: 90 }, // Future skill
      { topic: 'HTML/CSS', category: 'technical', targetLevel: 60 }
    ]
  },
  {
    id: 'product-manager',
    name: 'Product Manager',
    category: 'Design & Product',
    shortDescription: 'Lead the strategy, development, and launch of digital products.',
    description: 'Identifies the customer need and the larger business objectives that a product or feature will fulfill, articulates what success looks like, and rallies a team to turn that vision into a reality.',
    coreResponsibilities: [
      'Define product vision and roadmap.',
      'Gather and prioritize product requirements.',
      'Work closely with engineering, sales, and marketing.'
    ],
    importantSkills: ['Product Management (Future Skill)', 'Data Analysis (Future Skill)'],
    expectedSkillLevels: 'Strong leadership and communication, analytical mindset.',
    technologies: ['Jira', 'Confluence', 'Analytics Tools'],
    title: 'Product Manager',
    requiredSkills: [
      { topic: 'Product Management', category: 'core', targetLevel: 90 }, // Future skill
      { topic: 'SQL', category: 'technical', targetLevel: 50 },
      { topic: 'Data Analysis', category: 'technical', targetLevel: 70 } // Future skill
    ]
  },

  // ============================
  // Emerging Technology
  // ============================
  {
    id: 'database-engineer',
    name: 'Database Engineer',
    category: 'Emerging Technology',
    shortDescription: 'Design, build, and optimize database systems.',
    description: 'Specializes in the architecture, optimization, and scaling of both relational and NoSQL databases.',
    coreResponsibilities: [
      'Design efficient database schemas.',
      'Optimize slow-running queries.',
      'Ensure high availability and data backups.'
    ],
    importantSkills: ['SQL', 'Data Structures', 'Python'],
    expectedSkillLevels: 'Expert in SQL and database internals.',
    technologies: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis'],
    title: 'Database Engineer',
    requiredSkills: [
      { topic: 'SQL', category: 'technical', targetLevel: 95 },
      { topic: 'Data Structures', category: 'core', targetLevel: 80 },
      { topic: 'Python', category: 'technical', targetLevel: 60 }
    ]
  },
  {
    id: 'blockchain-developer',
    name: 'Blockchain Developer',
    category: 'Emerging Technology',
    shortDescription: 'Develop smart contracts and decentralized applications (dApps).',
    description: 'Specializes in developing and implementing architecture and solutions using blockchain technology.',
    coreResponsibilities: [
      'Write and audit smart contracts.',
      'Build decentralized applications.',
      'Integrate blockchain protocols.'
    ],
    importantSkills: ['JavaScript', 'Data Structures', 'Blockchain (Future Skill)'],
    expectedSkillLevels: 'Strong understanding of cryptography and web3.',
    technologies: ['Solidity', 'Web3.js', 'Ethereum', 'Smart Contracts'],
    title: 'Blockchain Developer',
    requiredSkills: [
      { topic: 'Blockchain', category: 'technical', targetLevel: 90 }, // Future skill
      { topic: 'JavaScript', category: 'technical', targetLevel: 80 },
      { topic: 'Data Structures', category: 'core', targetLevel: 75 },
      { topic: 'Cybersecurity', category: 'core', targetLevel: 60 }
    ]
  }
];
