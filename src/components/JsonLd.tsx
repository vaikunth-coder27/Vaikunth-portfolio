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
      "https://linkedin.com/in/vaikunth-guruswamy",
      "https://github.com/vaikunthgc",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
