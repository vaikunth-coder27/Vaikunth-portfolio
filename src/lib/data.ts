export const personalInfo = {
  name: "Vaikunth Guruswamy",
  email: "vaikunthgc@gmail.com",
  phone: "+44 7407446796",
  title: "AI Researcher & ML Engineer",
  subtitle: "MSc Artificial Intelligence · University of Edinburgh",
  summary:
    "AI-focused researcher with expertise in Machine Learning, Deep Learning, and Natural Language Processing. Skilled in developing and optimizing machine translation models, large-scale multilingual data processing, and deep learning architectures. Strong programming background in Python and C++, with experience in HPC environments.",
  github: "https://github.com/vaikunthgc",
  linkedin: "https://linkedin.com/in/vaikunth-guruswamy",
}

export const experience = [
  {
    company: "Amazon",
    role: "Industry Collaborated Dissertation",
    type: "MSc Research · Industry Partnership",
    period: "Mar 2024 – Aug 2024",
    location: "Edinburgh, United Kingdom",
    description:
      "Developed methods to analyze copyright issues in various code-based LLMs. Extended the CodeBLEU metric and applied Few-Shot Learning and 8-bit quantization, reducing memorization by 17% while maintaining accuracy. Contributed to enhancing the privacy and robustness of AI code generation.",
    tags: ["LLMs", "CodeBLEU", "Few-Shot Learning", "8-bit Quantization", "NLP", "Python"],
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
