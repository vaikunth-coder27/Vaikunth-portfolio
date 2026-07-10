// Portfolio content — Vaikunth Guruswamy
export const personalInfo = {
  name: "Vaikunth Guruswamy",
  email: "vaikunthgc@gmail.com",
  phone: "+44 7407446796",
  title: "AI Engineer & ML Engineer",
  subtitle: "MSc Artificial Intelligence · University of Edinburgh",
  summary:
    "AI engineer who ships production LLM, computer-vision, and forecasting systems end-to-end. As the founding software engineer at a UK manufacturer, established its software foundation and delivered a range of production AI and full-stack systems — from multi-agent AI pipelines, an LLM payroll assistant, and PCB-defect computer vision to the serverless Azure platform they run on. Comfortable across the stack — LLMOps, backend, cloud, and DevOps — with an MSc in AI from the University of Edinburgh and an Amazon-collaborated dissertation on LLM privacy.",
  github: "https://github.com/vaikunth-coder27",
  linkedin: "https://www.linkedin.com/in/vaikunth-guruswamy-698b3a1b1/",
}

export const experience = [
  {
    company: "ZOT Engineering Ltd",
    role: "Software Application Engineer (Founding Engineer)",
    type: "Full-time · AI & Full-Stack",
    period: "Aug 2025 – Present",
    location: "Edinburgh, United Kingdom",
    description:
      "Scaled the greenfield foundation into a unified, company-wide ERP platform, deploying 15+ production systems on Microsoft Azure. Delivered a broad range of AI and full-stack capabilities: an LLM-powered payroll assistant (prompt caching, multi-tool orchestration), a privacy-first multi-agent recruitment pipeline, natural-language-to-SQL graph inference, 100+ live executive dashboards, computer-vision PCB-defect detection (RANSAC, DETR, DINOv3, SAM2), LayoutLM document intelligence, and Times-FM demand forecasting. Re-architected the backend into serverless Azure Functions (114+ endpoints), integrated three legacy on-premise ERP systems over an encrypted VPN, and owned DevOps and MLOps end-to-end from cloud infrastructure to production. Took the initiative to build a digital manufacturing-traceability system that logs every production step, reducing paper usage by 80% toward paperless operations, and optimised the report-generation pipeline by re-engineering query structures — cutting execution time from 55 seconds to 3.4 seconds.",
    tags: ["LLMOps", "Multi-Agent AI", "Computer Vision", "RAG", "MLOps", "Azure", "Python", "Angular"],
  },
  {
    company: "ZOT Engineering Ltd",
    role: "Software Application Engineer — Intern",
    type: "Internship · Full-Stack",
    period: "Feb 2025 – Jul 2025",
    location: "Edinburgh, United Kingdom",
    description:
      "Joined as the company's first software engineer and established its entire technical foundation. Partnered with stakeholders across three business divisions to map manual workflows and convert requirements into well-defined deliverables. Selected the full technology stack, designed the relational database schema, delivered the public company website, and stood up the first ERP modules and analytics dashboards on an Angular 19 SSR frontend and Python REST API. Standardised a secure, reusable path from database to API to UI — with MSAL/JWT authentication, RBAC, CI/CD, and automated testing at 98% coverage — enabling the rapid delivery of every feature that followed.",
    tags: ["Angular", "Python Flask", "C# WPF", "SQL Server", "MongoDB", "Data Migration", "MSAL"],
  },
  {
    company: "Amazon",
    role: "Industry Collaborated Dissertation",
    type: "MSc Research · Industry Partnership",
    period: "Mar 2024 – Aug 2024",
    location: "Edinburgh, United Kingdom",
    description:
      "MSc thesis, in collaboration with Amazon, investigating memorization in code-based large language models — the verbatim reproduction of training data that drives privacy, PII-leakage, and copyright risk. Evaluated encoder-only, decoder-only, and encoder-decoder models (CodeBERT, CodeGPT, CodeT5) on the CodeSearchNet dataset across four languages (Python, Java, JavaScript, Ruby), designed two data-extraction attacks (masked-token and prefix–suffix generation), and proposed an extended CodeBLEU metric with custom AST-based privacy components. Found identifiers and string literals most memorized (up to 79.3% exact match) and that 8-bit quantization reduces exact memorization while preserving code quality. Awarded a distinction (82%).",
    tags: ["LLM Memorization", "CodeBLEU", "CodeBERT", "CodeT5", "8-bit Quantization", "Few-Shot Learning", "Privacy AI"],
  },
]

export const education = [
  {
    institution: "The University of Edinburgh",
    degree: "Master of Science in Artificial Intelligence",
    grade: "82% — Distinction in Thesis",
    period: "Sep 2023 – Aug 2024",
    location: "Edinburgh, United Kingdom",
    courses: [
      "NLP (Transformers & LLMs)",
      "Data Visualization",
      "Cloud Programming (Docker, Azure)",
      "Machine Learning",
      "Image & Computer Vision",
      "AI Ethics",
    ],
  },
  {
    institution: "Anna University",
    degree: "Bachelor of Engineering in Electronics and Communication",
    grade: "CGPA: 9.50 / 10.0",
    period: "Aug 2019 – Jun 2023",
    location: "Chennai, India",
    courses: [
      "Software Engineering (Agile)",
      "AI and ML",
      "Data Structures & Algorithms",
      "Object-oriented Design",
      "Data Science",
    ],
  },
]

export const projects = [
  {
    title: "Attention-based Neural Machine Translation",
    description:
      "Developed a LSTM-based lexical mechanism and Transformer-based multi-head attention for German-English NMT. Evaluated performance using BLEU score, perplexity, and training loss.",
    tags: ["LSTM", "Transformer", "Multi-head Attention", "NumPy", "BLEU Score"],
    category: "NLP",
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    title: "Level 4 Autonomous Vehicle Prototype",
    description:
      "Designed and implemented an optimized neural network for traffic sign and lane detection, reinforcement learning for vehicle navigation, and a web-based visualization interface. Achieved 1ms response time for obstacle detection.",
    tags: ["Spatial CNN", "YOLO v3", "DarkNet-53", "DQN", "TensorFlow", "CUDA"],
    category: "Computer Vision",
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    title: "RNN & GRU Language Modelling",
    description:
      "Investigated GRU effectiveness vs RNNs for subject-verb agreement tasks. Demonstrated GRU superiority in capturing long-range dependencies through comparative analysis with hyperparameter tuning.",
    tags: ["RNN", "GRU", "PyTorch", "Hyperparameter Tuning", "NLP"],
    category: "NLP",
    color: "from-green-500/20 to-emerald-500/20",
  },
  {
    title: "Vehicle Damage Assessment Portal",
    description:
      "Python-Flask damage assessment portal integrating CNN models and IBM Cloud to estimate insurance costs. Collaborated with IBM, led with Agile methodologies.",
    tags: ["CNN", "Flask", "IBM Cloud", "Python", "Agile"],
    category: "Computer Vision",
    color: "from-orange-500/20 to-yellow-500/20",
  },
  {
    title: "Spotify Hit Song Predictor",
    description:
      "Built and evaluated ML models to predict hit songs by analyzing Spotify data using custom algorithms to assist music producers in decision-making.",
    tags: ["scikit-learn", "Python", "Data Analysis", "ML", "Pandas"],
    category: "Machine Learning",
    color: "from-green-400/20 to-teal-500/20",
  },
  {
    title: "Smart Glass Assistant",
    description:
      "Multi-functional wearable assistant with real-time object detection, map navigation, music player, chatbot, and text translation using node MCU. Led as Team Lead.",
    tags: ["OpenCV", "Object Detection", "IoT", "Node MCU", "Python"],
    category: "Computer Vision",
    color: "from-red-500/20 to-rose-500/20",
  },
  {
    title: "Chess Engine",
    description:
      "Developed an optimized chess engine using Reinforcement Learning with a custom Agent and Deep Q-Network Architecture (DQNA), paired with an interactive GUI built in PyQt5.",
    tags: ["Python", "Reinforcement Learning", "DQN", "Neural Networks", "PyQt5"],
    category: "Machine Learning",
    color: "from-amber-500/20 to-orange-500/20",
  },
  {
    title: "Autonomous Navigation Transporter",
    description:
      "Built a maze-solving bot that processes maze images, autonomously traverses through the maze, and reaches the destination. Hardware implementation using ESP32 Camera module and NodeMCU.",
    tags: ["Python", "Arduino IDE", "ESP32", "NodeMCU", "Image Processing"],
    category: "Computer Vision",
    color: "from-teal-500/20 to-cyan-500/20",
  },
  {
    title: "Chat-Bot",
    description:
      "Designed a sentiment-aware chatbot deployed on WhatsApp, Telegram, and web pages using NLP and LSTM. Also built a voice-controlled CLI music player application.",
    tags: ["Python", "NLP", "LSTM", "WhatsApp API", "Telegram API"],
    category: "NLP",
    color: "from-indigo-500/20 to-violet-500/20",
  },
  {
    title: "Face Detection & Recognition",
    description:
      "Face detection and recognition system using Haarcascade Frontal Face Algorithm, with OTP email verification for face registration/removal and automated attendance tracking.",
    tags: ["Python", "OpenCV", "Haarcascade", "Deep Learning", "SMTP"],
    category: "Computer Vision",
    color: "from-pink-500/20 to-rose-500/20",
  },
  {
    title: "Rangeless Bot",
    description:
      "Built a DTMF-controlled Arduino bot deployable in hostile environments, controllable from any location regardless of the user's physical position.",
    tags: ["DTMF", "Arduino", "Python", "Embedded Systems", "Robotics"],
    category: "Machine Learning",
    color: "from-lime-500/20 to-green-500/20",
  },
]

export const skills = {
  "Languages & Frameworks": [
    "Python", "C++", "JavaScript", "SQL", "MongoDB",
    "PyTorch", "TensorFlow", "Keras", "NumPy", "Pandas",
    "Scikit-learn", "OpenCV", "NLTK", "spaCy", "XGBoost",
  ],
  "Cloud & DevOps": ["Docker", "Azure", "AWS", "MySQL", "HPC"],
  "AI Specializations": [
    "Machine Learning", "Deep Learning", "Computer Vision",
    "Natural Language Processing", "Large Language Models", "Transformers",
    "Generative AI", "MLOps", "LLMOps", "Agentic AI", "RAG",
  ],
}

export const stats = [
  { label: "MSc GPA", value: "82%" },
  { label: "BE CGPA", value: "9.5/10" },
  { label: "Projects", value: "10+" },
  { label: "Tech Stack", value: "20+" },
]
