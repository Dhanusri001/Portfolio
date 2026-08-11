const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

const projects = [
  {
    type: "AI · Full Stack",
    title: "AI Public Grievance & Citizen Support Copilot",
    overview: "An AI-powered platform that helps citizens submit grievances, classify complaints, assist officers and provide intelligent support using generative AI.",
    problem: "Citizens need a clearer way to submit and track grievances, while officers need structured information to understand and process complaints efficiently.",
    solution: "A full-stack platform combines citizen and officer dashboards with authentication, complaint management and AI-assisted complaint processing.",
    tech: ["React", "FastAPI", "PostgreSQL", "Google Gemini"],
    features: ["AI-assisted complaint processing", "Citizen dashboard", "Officer dashboard", "Authentication", "Complaint management"],
    github: "https://github.com/",
    demo: "#"
  },
  {
    type: "Full Stack · Backend",
    title: "Canteen Bites",
    overview: "A modern digital canteen management and ordering platform designed to simplify food ordering, authentication and canteen operations.",
    problem: "Traditional canteen workflows can make ordering, authentication and role-based operations harder to manage consistently.",
    solution: "A React frontend backed by Spring Boot and PostgreSQL provides authentication, role-based access and a digital canteen workflow.",
    tech: ["React", "Spring Boot", "PostgreSQL", "JWT", "Hibernate/JPA"],
    features: ["User authentication", "Role-based access", "Food ordering", "Digital canteen workflow", "Admin management"],
    github: "https://github.com/",
    demo: "#"
  },
  {
    type: "Multi-Agent AI",
    title: "Autonomous Multi-Agent Research & Fact Verification System",
    overview: "A multi-agent AI system that researches user queries, verifies information using external sources and produces evidence-backed reports.",
    problem: "Researching complex questions manually can be slow, and information from different sources may require verification before it can be trusted.",
    solution: "Specialized AI agents coordinate research, verification and report generation while surfacing source citations and confidence signals.",
    tech: ["React", "FastAPI", "LangGraph", "LangChain", "Google Gemini / LLM", "Search APIs"],
    features: ["Multiple AI agents", "Research orchestration", "Fact verification", "Source citations", "Confidence scoring", "Evidence-backed reports"],
    github: "https://github.com/",
    demo: "#"
  },
  {
    type: "AI · Learning Platform",
    title: "Integrated Smart Learning Platform — LearnWise",
    overview: "An AI-powered learning platform with an LLM tutor, role-based authentication, course management, personalized learning, analytics and real-time doubt resolution.",
    problem: "Learners often need personalized explanations and faster support while instructors need a structured platform for courses and learning analytics.",
    solution: "LearnWise combines course management, an LLM tutor, authentication, personalized learning and chatbot-based doubt resolution in one platform.",
    tech: ["React", "Tailwind CSS", "Python", "Flask", "MySQL", "LLM API"],
    features: ["LLM tutor", "Role-based authentication", "Course management", "Personalized learning", "Analytics", "Real-time chatbot"],
    github: "https://github.com/",
    demo: "#"
  }
];

const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Loader */
window.addEventListener("load", () => {
  setTimeout(() => $("#loader")?.classList.add("loaded"), 500);
});

/* Scroll progress + navbar + back top */
function updateScrollUI() {
  const doc = document.documentElement;
  const max = doc.scrollHeight - window.innerHeight;
  const progress = max > 0 ? (window.scrollY / max) * 100 : 0;
  $("#scrollProgress").style.width = `${progress}%`;
  $("#navbar").classList.toggle("scrolled", window.scrollY > 25);
  $("#backTop").classList.toggle("visible", window.scrollY > 600);
}
window.addEventListener("scroll", updateScrollUI, { passive: true });
updateScrollUI();

/* Mobile menu */
const menuToggle = $("#menuToggle");
const navLinks = $("#navLinks");
function closeMenu() {
  navLinks.classList.remove("open");
  menuToggle.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}
menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.classList.toggle("open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
});
$$(".nav-link").forEach(link => link.addEventListener("click", closeMenu));

/* Active navigation */
const sections = $$("main section[id]");
const navItems = $$(".nav-link");
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(item => item.classList.toggle("active", item.getAttribute("href") === `#${entry.target.id}`));
    }
  });
}, { rootMargin: "-38% 0px -55% 0px", threshold: 0 });
sections.forEach(section => sectionObserver.observe(section));

/* Reveal on scroll */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
$$(".reveal").forEach(el => revealObserver.observe(el));

/* Hero role typing */
const roles = ["Computer Science Engineer", "Full-Stack Developer", "AI/ML Enthusiast"];
const roleText = $("#roleText");
let roleIndex = 0;
let charIndex = roles[0].length;
let deleting = true;

function typeRole() {
  if (prefersReduced) return;
  const current = roles[roleIndex];
  if (!deleting) {
    charIndex++;
    roleText.textContent = current.slice(0, charIndex);
    if (charIndex >= current.length) {
      deleting = true;
      setTimeout(typeRole, 1500);
      return;
    }
  } else {
    charIndex--;
    roleText.textContent = current.slice(0, charIndex);
    if (charIndex <= 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeRole, deleting ? 42 : 75);
}
setTimeout(typeRole, 1800);

/* Magnetic buttons */
if (!prefersReduced && window.matchMedia("(pointer:fine)").matches) {
  $$(".magnetic").forEach(el => {
    el.addEventListener("mousemove", e => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) * .12;
      const y = (e.clientY - (r.top + r.height / 2)) * .12;
      el.style.transform = `translate(${x}px,${y}px)`;
    });
    el.addEventListener("mouseleave", () => { el.style.transform = ""; });
  });
}

/* 3D project tilt */
if (!prefersReduced && window.matchMedia("(pointer:fine)").matches) {
  $$(".project-card").forEach(card => {
    card.addEventListener("mousemove", e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      card.style.transform = `perspective(900px) rotateX(${y * -1.8}deg) rotateY(${x * 2.2}deg)`;
    });
    card.addEventListener("mouseleave", () => card.style.transform = "");
  });
}

/* Timeline */
const timeline = $(".timeline");
const timelineFill = $("#timelineFill");
function updateTimeline() {
  if (!timeline) return;
  const r = timeline.getBoundingClientRect();
  const visible = Math.min(Math.max((window.innerHeight * .78 - r.top) / r.height, 0), 1);
  timelineFill.style.height = `${visible * 100}%`;
  $$(".timeline-item", timeline).forEach(item => {
    const ir = item.getBoundingClientRect();
    item.classList.toggle("visible", ir.top < window.innerHeight * .72);
  });
}
window.addEventListener("scroll", updateTimeline, { passive: true });
updateTimeline();

/* Project modal */
const modal = $("#projectModal");
const modalTitle = $("#modalTitle");
const modalType = $("#modalType");
const modalOverview = $("#modalOverview");
const modalProblem = $("#modalProblem");
const modalSolution = $("#modalSolution");
const modalTech = $("#modalTech");
const modalFeatures = $("#modalFeatures");
const modalGithub = $("#modalGithub");
const modalDemo = $("#modalDemo");
let lastFocused = null;

function openModal(index) {
  const p = projects[index];
  lastFocused = document.activeElement;
  modalType.textContent = p.type;
  modalTitle.textContent = p.title;
  modalOverview.textContent = p.overview;
  modalProblem.textContent = p.problem;
  modalSolution.textContent = p.solution;
  modalTech.innerHTML = p.tech.map(t => `<span>${t}</span>`).join("");
  modalFeatures.innerHTML = p.features.map(f => `<li>${f}</li>`).join("");
  modalGithub.href = p.github;
  modalDemo.href = p.demo;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  $("#modalClose").focus();
}
function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  lastFocused?.focus();
}
$$(".project-card").forEach(card => {
  card.addEventListener("click", e => {
    if (e.target.closest("a")) return;
    openModal(Number(card.dataset.project));
  });
});
$("#modalClose").addEventListener("click", closeModal);
$$("[data-close-modal]").forEach(el => el.addEventListener("click", closeModal));
document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    closeMenu();
    if (modal.classList.contains("open")) closeModal();
  }
});

/* Back to top */
$("#backTop").addEventListener("click", () => window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" }));

/* Contact form: frontend-only mail composer */
$("#contactForm").addEventListener("submit", e => {
  e.preventDefault();
  const form = e.currentTarget;
  const name = $("#name"), email = $("#email"), message = $("#message"), status = $("#formStatus");
  [name, email, message].forEach(input => input.classList.remove("invalid"));
  let valid = true;
  if (!name.value.trim()) { name.classList.add("invalid"); valid = false; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) { email.classList.add("invalid"); valid = false; }
  if (!message.value.trim() || message.value.trim().length < 10) { message.classList.add("invalid"); valid = false; }
  if (!valid) { status.textContent = "Please check the highlighted fields."; return; }
  const subject = encodeURIComponent(`Portfolio enquiry from ${name.value.trim()}`);
  const body = encodeURIComponent(`Name: ${name.value.trim()}\nEmail: ${email.value.trim()}\n\n${message.value.trim()}`);
  status.textContent = "Opening your email client…";
  window.location.href = `mailto:dhanusri0206@gmail.com?subject=${subject}&body=${body}`;
});

/* Make project buttons explicit keyboard targets */
$$(".details-btn").forEach(btn => btn.addEventListener("click", e => e.stopPropagation()));
