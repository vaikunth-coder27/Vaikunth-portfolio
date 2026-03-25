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
          text: "Vaikunth Guruswamy is an AI Researcher and ML Engineer based in the UK. He holds an MSc in Artificial Intelligence (Distinction, 82%) from the University of Edinburgh and is currently a Full-Stack Software Engineer at ZOT, UK.",
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
    url: "https://www.vaikunthguruswamy.uk",
    jobTitle: "Full-Stack Software Engineer",
    description:
      "AI Researcher and ML Engineer with MSc AI (Distinction) from the University of Edinburgh. Currently Full-Stack Software Engineer at ZOT, UK. Specialising in Machine Learning, Deep Learning, and NLP.",
    email: "vaikunthgc@gmail.com",
    nationality: {
      "@type": "Country",
      name: "United Kingdom",
    },
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

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
