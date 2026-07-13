export function FaqJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Who is Vaikunth Guruswamy?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Vaikunth Guruswamy is an AI Engineer and MLOps Engineer based in Edinburgh, Scotland, UK. He holds an MSc in Artificial Intelligence (Distinction, 82%) from the University of Edinburgh and is the founding software engineer at ZOT, UK, where he builds production LLM, computer-vision, and full-stack systems.",
        },
      },
      {
        "@type": "Question",
        name: "What does Vaikunth Guruswamy specialise in?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Vaikunth specialises in Machine Learning, Deep Learning, Natural Language Processing (NLP), Large Language Models (LLMs), and full-stack software engineering using Python, PyTorch, TensorFlow, React, Angular, and Azure.",
        },
      },
      {
        "@type": "Question",
        name: "Where did Vaikunth Guruswamy study?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Vaikunth Guruswamy completed his MSc in Artificial Intelligence at the University of Edinburgh (2023–2024), graduating with Distinction (82%). He also holds a BE in Electronics and Communication from Anna University (CGPA 9.5/10).",
        },
      },
      {
        "@type": "Question",
        name: "What is Vaikunth Guruswamy's research experience?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Vaikunth collaborated with Amazon on his MSc dissertation, researching copyright and memorisation issues in code-based Large Language Models. He extended the CodeBLEU metric and applied Few-Shot Learning with 8-bit quantisation, achieving a 17% reduction in memorisation while maintaining model accuracy.",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function PersonJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://www.vaikunthguruswamy.uk/#person",
    name: "Vaikunth Guruswamy",
    alternateName: "Vaikunth G C",
    url: "https://www.vaikunthguruswamy.uk",
    jobTitle: ["AI Engineer", "MLOps Engineer", "Full-Stack Software Engineer"],
    description:
      "AI Engineer and MLOps Engineer based in Edinburgh, UK, with an MSc in Artificial Intelligence (Distinction) from the University of Edinburgh. Builds production LLM, computer-vision, and full-stack systems. Specialising in Machine Learning, Deep Learning, NLP, LLMs, and MLOps.",
    email: "vaikunthgc@gmail.com",
    nationality: {
      "@type": "Country",
      name: "United Kingdom",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Edinburgh",
      addressRegion: "Scotland",
      addressCountry: "GB",
    },
    homeLocation: {
      "@type": "Place",
      name: "Edinburgh, Scotland, United Kingdom",
    },
    workLocation: {
      "@type": "Place",
      name: "Edinburgh, Scotland, United Kingdom",
    },
    hasOccupation: [
      {
        "@type": "Occupation",
        name: "AI Engineer",
        occupationLocation: {
          "@type": "City",
          name: "Edinburgh, Scotland, United Kingdom",
        },
        skills:
          "Machine Learning, Deep Learning, NLP, Large Language Models, LLMOps, Computer Vision, Python, PyTorch",
      },
      {
        "@type": "Occupation",
        name: "MLOps Engineer",
        occupationLocation: {
          "@type": "City",
          name: "Edinburgh, Scotland, United Kingdom",
        },
        skills:
          "MLOps, LLMOps, Azure, Docker, CI/CD, serverless, model deployment, monitoring",
      },
    ],
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "University of Edinburgh",
        url: "https://www.ed.ac.uk",
      },
      {
        "@type": "CollegeOrUniversity",
        name: "Anna University",
        url: "https://www.annauniv.edu",
      },
    ],
    worksFor: {
      "@type": "Organization",
      name: "ZOT",
    },
    knowsAbout: [
      "Machine Learning",
      "Deep Learning",
      "Natural Language Processing",
      "Large Language Models",
      "Transformers",
      "Computer Vision",
      "Artificial Intelligence",
      "Full-Stack Development",
      "Python",
      "PyTorch",
      "TensorFlow",
      "React",
      "Next.js",
      "Azure",
    ],
    sameAs: [
      "https://www.linkedin.com/in/vaikunth-guruswamy-698b3a1b1/",
      "https://github.com/vaikunth-coder27",
    ],
  };

  const profilePage = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": "https://www.vaikunthguruswamy.uk/#profilepage",
    url: "https://www.vaikunthguruswamy.uk",
    name: "Vaikunth Guruswamy | AI Engineer & MLOps Engineer in Edinburgh",
    mainEntity: jsonLd,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePage) }}
    />
  );
}
