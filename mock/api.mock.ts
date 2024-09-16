// example/mock/es.mock.ts

import type { MockHandler } from "vite-plugin-mock-server";

const fakePosts = [
  {
    title: "The Future of Electric Vehicles",
    id: 1,
    previewSnippet:
      "Discover the latest advancements and challenges in the electric vehicle industry.",
    image: "https://example.com/electric_vehicles.jpg",
    body: "As climate change concerns grow, the automotive industry is undergoing a significant transformation towards electric vehicles (EVs). This post explores the current state of EV technology, including advancements in battery technology, charging infrastructure, and government initiatives promoting EV adoption. Additionally, it discusses the challenges facing widespread EV adoption, such as range anxiety and the need for further infrastructure development.",
  },
  {
    title: "Healthy Eating Habits for Busy Professionals",
    id: 2,
    previewSnippet:
      "Learn practical tips for maintaining a healthy diet despite a hectic lifestyle.",
    image: "https://example.com/healthy_eating.jpg",
    body: "Maintaining a nutritious diet can be challenging for busy professionals, but it's essential for overall well-being and productivity. This post offers practical advice for incorporating healthy eating habits into a hectic schedule. It covers topics such as meal prepping, choosing nutritious snacks, and making smart choices when dining out. By implementing these strategies, busy individuals can prioritize their health and fuel their bodies for success.",
  },
  {
    title: "The Impact of Social Media on Mental Health",
    id: 3,
    previewSnippet:
      "Explore the complex relationship between social media usage and mental well-being.",
    image: "https://example.com/social_media_mental_health.jpg",
    body: "While social media platforms offer numerous benefits, such as connecting with others and accessing information, excessive usage can have detrimental effects on mental health. This post delves into the various ways in which social media impacts mental well-being, including increased feelings of loneliness, anxiety, and depression. It also discusses strategies for maintaining a healthy relationship with social media, such as setting boundaries and taking regular breaks.",
  },
  {
    title: "The Art of Sustainable Fashion",
    id: 4,
    previewSnippet:
      "Discover how the fashion industry is embracing sustainability to protect the planet.",
    image: "https://example.com/sustainable_fashion.jpg",
    body: "With growing awareness of environmental issues, the fashion industry is undergoing a paradigm shift towards sustainability. This post explores the concept of sustainable fashion, including eco-friendly materials, ethical production practices, and the rise of second-hand and vintage clothing markets. By adopting sustainable fashion practices, consumers can reduce their environmental footprint and contribute to a more ethical and eco-conscious industry.",
  },
  {
    title: "The Power of Mindfulness Meditation",
    id: 5,
    previewSnippet:
      "Learn about the benefits of mindfulness meditation for reducing stress and improving well-being.",
    image: "https://example.com/mindfulness_meditation.jpg",
    body: "In today's fast-paced world, mindfulness meditation has emerged as a powerful tool for managing stress and enhancing overall well-being. This post explores the science behind mindfulness meditation, including its effects on the brain and nervous system. It also discusses practical tips for incorporating mindfulness into daily life, such as mindful breathing exercises and body scans. By practicing mindfulness meditation regularly, individuals can cultivate greater resilience and inner peace.",
  },
  {
    title: "The Rise of Remote Work: Opportunities and Challenges",
    id: 6,
    previewSnippet:
      "Examine the growing trend of remote work and its impact on the future of work.",
    image: "https://example.com/remote_work.jpg",
    body: "The COVID-19 pandemic has accelerated the adoption of remote work, transforming the way we work and live. This post discusses the opportunities and challenges associated with remote work, including increased flexibility, reduced commuting stress, and the importance of work-life balance. It also addresses common challenges such as communication barriers, isolation, and maintaining productivity. By embracing remote work, individuals and organizations can unlock new opportunities for collaboration and innovation.",
  },
  {
    title: "The Science of Sleep: Optimizing Your Sleep Routine",
    id: 7,
    previewSnippet:
      "Learn evidence-based strategies for improving sleep quality and overall health.",
    image: "https://example.com/sleep_science.jpg",
    body: "Quality sleep is essential for optimal health and well-being, yet many people struggle to get enough restful sleep. This post explores the science of sleep, including the sleep-wake cycle, the stages of sleep, and the importance of circadian rhythms. It provides evidence-based strategies for improving sleep quality, such as establishing a consistent sleep schedule, creating a relaxing bedtime routine, and optimizing sleep environment. By prioritizing sleep hygiene, individuals can enhance their overall health and vitality.",
  },
  {
    title: "The Future of Artificial Intelligence in Healthcare",
    id: 8,
    previewSnippet:
      "Discover how AI is revolutionizing healthcare delivery and patient outcomes.",
    image: "https://example.com/ai_healthcare.jpg",
    body: "Artificial intelligence (AI) has the potential to transform every aspect of healthcare, from diagnosis and treatment to patient care and administrative tasks. This post explores the current applications of AI in healthcare, including medical imaging, predictive analytics, and personalized medicine. It also discusses the ethical considerations and challenges associated with AI adoption in healthcare, such as data privacy and algorithm bias. By harnessing the power of AI, healthcare providers can improve patient outcomes and enhance the efficiency of healthcare delivery.",
  },
  {
    title: "The Joy of Outdoor Adventures",
    id: 9,
    previewSnippet:
      "Experience the thrill of outdoor activities and reconnect with nature.",
    image: "https://example.com/outdoor_adventures.jpg",
    body: "In today's technology-driven world, spending time outdoors has become more important than ever for our physical and mental well-being. This post celebrates the joy of outdoor adventures, from hiking and camping to kayaking and rock climbing. It highlights the numerous benefits of spending time in nature, including stress reduction, increased creativity, and improved mood. Whether you're exploring local trails or embarking on a wilderness expedition, outdoor adventures offer endless opportunities for exploration and discovery.",
  },
];

export default (): MockHandler[] => [
  {
    pattern: "/api/posts",
    method: "GET",
    handle: (req, res) => {
      const data = {
        url: req.url,
        params: req.params,
        query: req.query,
        body: req.body,
      };

      const posts = req.query?.fields
        ? fakePosts.map((post) => {
            const newPost = {};
            req.query?.fields.split(",").forEach((field) => {
              newPost[field] = post[field];
            });
            return newPost;
          })
        : fakePosts;

      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify(
          posts.map((post) => {
            return {
              ...post,
              publishedAt: new Date().toISOString(),
            };
          }),
        ),
      );
    },
  },
  {
    pattern: "/api/posts/{postId}",
    handle: (req, res) => {
      const data = {
        url: req.url,
        params: req.params,
        query: req.query,
        body: req.body,
      };

      const post = fakePosts.find(
        (post) => post.id === parseInt(req.params?.postId || ""),
      );

      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({
          ...post,
          publishedAt: new Date().toISOString(),
        }),
      );
    },
  },
];
