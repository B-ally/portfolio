// ===== 1. ALL SELECTORS FIRST =====
const projectList = document.querySelector("#projectList");
const skillList = document.querySelector("#skillList");
const form = document.querySelector("#contactForm");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const messageInput = document.querySelector("#message");
const formMessage = document.querySelector("#formMessage");

// ===== 2. YOUR PROJECTS: add a new project by copying one block =====
// Leave link as "" if you do not have a live link yet. It will not show.
const projects = [
  {
    title: "Weather App",
    description: "Search any city and see its live temperature and conditions, with suggestions as you type.",
    tags: "HTML, CSS, JavaScript, OpenWeatherMap API",
    live: "https://your-weather-app.netlify.app",
    code: ""
  },
  {
    title: "invoice app",
    description:"make transactions in your business to be so easy and save you time and money ",
    tags:"HTML,CSS, javascript, Paystack API",
    live:"invoice-app-gules-six.vercel.app"
  }
];

// ===== 3. YOUR SKILLS =====
const skills = ["HTML", "CSS", "JavaScript", "Responsive design", "APIs", "Git", "React (learning)"];

// ===== 4. SHOW PROJECTS AND SKILLS ON THE PAGE =====
projectList.innerHTML = projects
  .map((project) => {
    const liveLink = project.live ? `<a href="${project.live}" target="_blank" rel="noopener">Live demo</a>` : "";
    const codeLink = project.code ? `<a href="${project.code}" target="_blank" rel="noopener">Code</a>` : "";

    return `
      <li class="project">
        <h3>${project.title}</h3>
        <div class="links">${liveLink}${codeLink}</div>
        <p>${project.description}</p>
        <p class="tags">${project.tags}</p>
      </li>
    `;
  })
  .join("");

skillList.innerHTML = skills.map((skill) => `<li>${skill}</li>`).join("");

// ===== 5. CONTACT FORM VALIDATION =====
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function showMessage(text, type) {
  formMessage.textContent = text;
  formMessage.className = type;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (nameInput.value.trim() === "") {
    showMessage("Enter your name.", "error");
    return;
  }

  if (!emailPattern.test(emailInput.value.trim())) {
    showMessage("Enter a valid email address, like name@example.com.", "error");
    return;
  }

  if (messageInput.value.trim() === "") {
    showMessage("Write a short message about your project.", "error");
    return;
  }

   showMessage("Sending...", "success");

  try {
    const response = await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(new FormData(form)).toString()
    });

    if (response.ok) {
      showMessage("Thanks, your message was sent. I will reply within 24 hours.", "success");
      form.reset();
    } else {
      showMessage("Something went wrong. Please try again.", "error");
    }
  } catch (error) {
    showMessage("Could not send. Check your connection and try again.", "error");
  }
});