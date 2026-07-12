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

// ── Category → colour system (shared by chips, stat gradients & charts) ──
export type CategoryKey = "nlp" | "cv" | "ml" | "embedded" | "ethics"

export const projectCategories: Record<
  CategoryKey,
  { label: string; solid: string; gradient: string; chipBg: string; chipBorder: string }
> = {
  nlp:      { label: "NLP",               solid: "#22d3ee", gradient: "linear-gradient(135deg,#22d3ee,#818cf8)", chipBg: "rgba(34,211,238,0.12)",  chipBorder: "rgba(34,211,238,0.35)" },
  cv:       { label: "Computer Vision",   solid: "#c084fc", gradient: "linear-gradient(135deg,#818cf8,#c084fc)", chipBg: "rgba(192,132,252,0.12)", chipBorder: "rgba(192,132,252,0.35)" },
  ml:       { label: "Machine Learning",  solid: "#34d399", gradient: "linear-gradient(135deg,#34d399,#22d3ee)", chipBg: "rgba(52,211,153,0.12)",  chipBorder: "rgba(52,211,153,0.35)" },
  embedded: { label: "Robotics · Embedded", solid: "#fbbf24", gradient: "linear-gradient(135deg,#fbbf24,#f97316)", chipBg: "rgba(251,191,36,0.12)",  chipBorder: "rgba(251,191,36,0.35)" },
  ethics:   { label: "Responsible AI",    solid: "#fb7185", gradient: "linear-gradient(135deg,#fb7185,#f43f5e)", chipBg: "rgba(251,113,133,0.12)", chipBorder: "rgba(251,113,133,0.35)" },
}

export type ProjectStat = { value: string; label: string; hero?: boolean }
export type ProjectChart =
  | { kind: "hbars"; fig: string; max: number; bars: { label: string; value: number; show: string; hero?: boolean }[] }
  | { kind: "vbars"; fig: string; max: number; unit?: string; bars: { label: string; value: number; show: string; hero?: boolean }[] }

export type FeaturedProject = {
  num: string
  category: CategoryKey
  categoryLabel: string
  context?: string
  title: string
  blurb: string
  pipeline?: { stage: string; detail: string }[]
  stats: ProjectStat[]
  tags: string[]
  chart: ProjectChart | null
  image: { src: string; caption: string }
}

// ── Six flagship builds — real results, real figures, documented end to end ──
export const featuredProjects: FeaturedProject[] = [
  {
    num: "01",
    category: "cv",
    categoryLabel: "Computer Vision · Robotics",
    context: "B.E. Final-Year Thesis · MIT, Anna University",
    title: "Decentralized Autonomous Vehicle",
    blurb:
      "My undergraduate final-year thesis — a Raspberry Pi self-driving car that cooperates with no central server. It parses a spoken destination, resolves an offline route across a dual-layer Folium + Google-Earth map, and plans motion with the Haversine formula, while a YOLO/Darknet perception stack detects 205 traffic-sign classes (trained on 97K+ images) and a custom model reads traffic lights at 83% accuracy — rerouting in real time on-device.",
    pipeline: [
      { stage: "Perceive", detail: "Camera · 24 FPS" },
      { stage: "Detect", detail: "YOLO · 205 signs" },
      { stage: "Localize", detail: "GPS · Haversine" },
      { stage: "Actuate", detail: "Motor commands" },
    ],
    stats: [
      { value: "205", label: "Sign classes", hero: true },
      { value: "97K", label: "Training images" },
      { value: "83%", label: "Signal accuracy" },
    ],
    tags: ["YOLO · Darknet", "CNN", "Raspberry Pi", "OpenCV", "CUDA", "GPS"],
    chart: null,
    image: { src: "/projects/autonomous-vehicle-det.png", caption: "205-class traffic-sign detector output" },
  },
  {
    num: "02",
    category: "nlp",
    categoryLabel: "NLP",
    context: "MSc · Natural Language Understanding, Edinburgh",
    title: "Attention-based Neural Machine Translation",
    blurb:
      "Built and benchmarked four German→English translation architectures on a low-resource Europarl subset — from an attentional LSTM baseline to a lexical model and a from-scratch Transformer with multi-head attention. The lexical model won decisively, converging in 53 epochs against the baseline's 99.",
    stats: [
      { value: "13.5", label: "Test BLEU", hero: true },
      { value: "24.5", label: "Perplexity" },
      { value: "+24%", label: "vs baseline" },
    ],
    tags: ["LSTM", "Transformer", "Multi-head Attention", "PyTorch", "Beam Search"],
    chart: {
      kind: "hbars",
      fig: "Fig.02 — Test BLEU by architecture",
      max: 15,
      bars: [
        { label: "Baseline", value: 10.89, show: "10.9" },
        { label: "Complex", value: 9.52, show: "9.5" },
        { label: "Lexical", value: 13.5, show: "13.5", hero: true },
        { label: "Transformer", value: 11.39, show: "11.4" },
      ],
    },
    image: { src: "/projects/nmt-attention.png", caption: "German→English attention alignment (Transformer)" },
  },
  {
    num: "03",
    category: "embedded",
    categoryLabel: "Robotics · Embedded",
    context: "B.E. Capstone · Anna University",
    title: "ANT-BOT — Autonomous Maze-Solving Rover",
    blurb:
      "A low-cost ESP32-CAM rover that photographs an unknown maze, solves the shortest escape route with Dijkstra's algorithm over the pixel grid, converts it into a turn-by-turn instruction set, and drives it end to end — validated in a Pygame simulation before hardware deployment.",
    stats: [
      { value: "26", label: "Route steps", hero: true },
      { value: "ESP32", label: "On-device" },
      { value: "0", label: "Human input" },
    ],
    tags: ["Dijkstra", "OpenCV", "ESP32-CAM", "Pygame", "Arduino"],
    chart: null,
    image: { src: "/projects/antbot-maze.png", caption: "Dijkstra shortest-path solved over the maze grid" },
  },
  {
    num: "04",
    category: "nlp",
    categoryLabel: "NLP",
    context: "MSc · Natural Language Understanding, Edinburgh",
    title: "RNN vs GRU Language Modelling",
    blurb:
      "Implemented vanilla RNN and GRU language models from scratch in NumPy — forward pass, backprop and backpropagation-through-time — to study subject–verb agreement. A hidden-state cosine analysis showed the GRU far better preserves long-range syntactic dependencies.",
    stats: [
      { value: "84%", label: "Agreement acc", hero: true },
      { value: "+10pts", label: "GRU vs RNN" },
      { value: "NumPy", label: "From scratch" },
    ],
    tags: ["RNN", "GRU", "BPTT", "NumPy", "Hyperparameter Tuning"],
    chart: {
      kind: "vbars",
      fig: "Fig.04 — Agreement accuracy",
      max: 100,
      unit: "%",
      bars: [
        { label: "RNN", value: 74, show: "74" },
        { label: "GRU", value: 78.1, show: "78" },
        { label: "GRU★", value: 84, show: "84", hero: true },
      ],
    },
    image: { src: "/projects/rnn-gru.png", caption: "GRU validation loss across BPTT depths" },
  },
  {
    num: "05",
    category: "ml",
    categoryLabel: "Machine Learning",
    context: "MSc · Applied Machine Learning, Edinburgh",
    title: "Spotify Hit-Song Prediction",
    blurb:
      "Predicted whether a track would become a lasting chart hit from its audio features alone, across 650K+ rows of Spotify's Top-200. Benchmarked four classifiers plus K-means clustering — Random Forest led decisively, with energy and danceability the strongest drivers of success.",
    stats: [
      { value: "0.823", label: "F1 · Random Forest", hero: true },
      { value: "0.79", label: "ROC-AUC" },
      { value: "652K", label: "Rows analysed" },
    ],
    tags: ["Random Forest", "XGBoost", "K-Means", "scikit-learn", "Keras"],
    chart: {
      kind: "hbars",
      fig: "Fig.05 — F1 by classifier",
      max: 1,
      bars: [
        { label: "Random Forest", value: 0.823, show: "0.82", hero: true },
        { label: "Naive Bayes", value: 0.615, show: "0.62" },
        { label: "Neural Net", value: 0.38, show: "0.38" },
        { label: "Logistic Reg", value: 0.12, show: "0.12" },
      ],
    },
    image: { src: "/projects/spotify-roc.png", caption: "Random Forest ROC (AUC 0.79) + confusion matrix" },
  },
  {
    num: "06",
    category: "nlp",
    categoryLabel: "NLP",
    context: "MSc · Accelerated NLP, Edinburgh",
    title: "Character-Level Language Identification",
    blurb:
      "Built interpolated character-trigram language models from scratch — preprocessing, add-α smoothing and text generation — that identify a document's language purely by perplexity, then extended the study with four neural next-character models. The English model nailed the test document at a fraction of the rivals' perplexity.",
    stats: [
      { value: "8.8", label: "EN perplexity", hero: true },
      { value: "2.5×", label: "Lower than rivals" },
      { value: "0", label: "Toolkits used" },
    ],
    tags: ["N-gram LM", "Perplexity", "Keras / LSTM", "NumPy", "Europarl"],
    chart: {
      kind: "vbars",
      fig: "Fig.06 — Perplexity (lower is better)",
      max: 24,
      bars: [
        { label: "EN", value: 8.8, show: "8.8", hero: true },
        { label: "DE", value: 19.8, show: "19.8" },
        { label: "ES", value: 22.0, show: "22.0" },
      ],
    },
    image: { src: "/projects/langid-trial.png", caption: "Neural LM loss & accuracy (log-bilinear trial)" },
  },
]

export type CatalogueProject = {
  num: string
  title: string
  category: CategoryKey
  summary: string
  stack: string[]
}

// ── The full catalogue — everything else, one click below ──
export const projectCatalogue: CatalogueProject[] = [
  {
    num: "07",
    title: "Slot Labeling for Task-Oriented Dialogue",
    category: "nlp",
    summary: "Improved BIO slot-filling on the NLU++ hotel dataset with word embeddings, a constrained Viterbi decoder and dependency-aware features.",
    stack: ["spaCy", "Logistic Reg", "Viterbi"],
  },
  {
    num: "08",
    title: "Distributed Neural Network Training",
    category: "ml",
    summary: "Edinburgh research review surveying data-parallelism, AllReduce, gradient compression and straggler mitigation for large-scale training.",
    stack: ["PyTorch DDP", "Horovod", "Survey"],
  },
  {
    num: "09",
    title: "AI Ethics · Automated Hiring Bias",
    category: "ethics",
    summary: "Utilitarian and Kantian analysis of algorithmic discrimination in the Mobley v. Workday hiring-AI lawsuit, proposing an audit framework.",
    stack: ["Fairness", "Governance", "Policy"],
  },
  {
    num: "10",
    title: "Vehicle Damage Assessment Portal",
    category: "cv",
    summary: "Flask portal integrating CNN models with IBM Cloud to estimate insurance costs from vehicle damage photos.",
    stack: ["CNN", "Flask", "IBM Cloud"],
  },
  {
    num: "11",
    title: "Chess Engine",
    category: "ml",
    summary: "Reinforcement-learning chess agent with a custom Deep Q-Network, paired with an interactive PyQt5 GUI.",
    stack: ["RL", "DQN", "PyQt5"],
  },
  {
    num: "12",
    title: "Smart Glass Assistant",
    category: "cv",
    summary: "Wearable assistant with real-time object detection, map navigation, translation and a chatbot on a NodeMCU — led as team lead.",
    stack: ["OpenCV", "IoT", "NodeMCU"],
  },
  {
    num: "13",
    title: "Sentiment-Aware Chat-Bot",
    category: "nlp",
    summary: "Multi-platform sentiment chatbot across WhatsApp, Telegram and web, plus a voice-controlled CLI music player.",
    stack: ["NLP", "LSTM", "Telegram API"],
  },
  {
    num: "14",
    title: "Face Detection & Recognition",
    category: "cv",
    summary: "Haar-cascade recognition with OTP email verification for enrolment and automated attendance logging.",
    stack: ["OpenCV", "Haar", "SMTP"],
  },
  {
    num: "15",
    title: "Rangeless Bot",
    category: "embedded",
    summary: "DTMF-controlled Arduino rover operable from any distance over a phone call — built for hostile environments.",
    stack: ["DTMF", "Arduino", "Robotics"],
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
  { label: "Projects", value: "15+" },
  { label: "Tech Stack", value: "20+" },
]
