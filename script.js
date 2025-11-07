const btn = document.getElementById('darkModeToggle');
    btn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      btn.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    });

const reveals = document.querySelectorAll(".reveal");

  function revealOnScroll() {
    const windowHeight = window.innerHeight;
    reveals.forEach((el) => {
      const top = el.getBoundingClientRect().top;
      if (top < windowHeight - 100) {
        el.classList.add("active");
      }
    });
  }
  window.addEventListener("scroll", revealOnScroll);
  window.addEventListener("load", revealOnScroll); // trigger on page load

  window.addEventListener("load", () => {
    const loader = document.getElementById("loader-wrapper");
    loader.style.opacity = "0";
    loader.style.pointerEvents = "none";
    setTimeout(() => loader.style.display = "none", 500);
  });

const chatbotToggle = document.getElementById("chatbot-toggle");
const chatbotWindow = document.getElementById("chatbot-window");
const chatbotClose = document.getElementById("chatbot-close");
const chatbotInput = document.getElementById("chatbot-input");
const chatbotMessages = document.getElementById("chatbot-messages");

// Toggle chatbot window
chatbotToggle.addEventListener("click", () => {
  chatbotWindow.classList.toggle("hidden");
});

chatbotClose.addEventListener("click", () => {
  chatbotWindow.classList.add("hidden");
});

// Predefined Q&A
const answers = {
  "skills": "🧠 My skills include C, C++, Python, HTML, CSS, JavaScript, and MySQL.",
  "projects": "🚀 I’ve worked on a Hospital Management System, TCP Congestion Control project, a responsive Portfolio Website, and a Tic-Tac-Toe game in C, Developed the AHRC Research front-end UI, secure OTP-based login using Twilio and Integrated real-time API communication for Tube Well Automation module using Next.js.",
  "resume": "📄 You can download my resume here: [Resume](https://drive.google.com/file/d/1MiQzedrxMoXH4a0y7qLxo2mC6MXeiHju/view?usp=drivesdk)",
  "portfolio": "🌐 This site is built with HTML, CSS, and JavaScript. It’s responsive, animated, and even features this chatbot!",
  "contact": "📬 You can reach me via LinkedIn, GitHub, or Email—links are in the Contact section below.",
  "education": "🎓 I’m a Computer Science undergraduate passionate about full-stack and DevOps.",
  "hobbies": "🎨 Outside coding, I enjoy music, design, and exploring new tech.",
  "location": "📍 I'm based in India.",
  "goals": "📌 My goal is to build intelligent, scalable software that makes a real-world impact!",
  "experience": "💼 I'm currently a student, but I’ve done multiple hands-on projects and love solving real-world problems."
};

// Message sending logic
chatbotInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter" && chatbotInput.value.trim() !== "") {
    const userInput = chatbotInput.value;
    addMessage("user", "You", userInput);
    chatbotInput.value = "";

    addTypingIndicator();

    setTimeout(() => {
      removeTypingIndicator();
      respondToUser(userInput.toLowerCase());
      chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }, 800);
  }
});

// Add user/chatbot message
function addMessage(sender, label, text) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("chat-message", sender);
  const nameTag = `<strong>${label}:</strong><br>`;
  messageDiv.innerHTML = nameTag + text;
  chatbotMessages.appendChild(messageDiv);
}

// Typing indicator
function addTypingIndicator() {
  const typingDiv = document.createElement("div");
  typingDiv.classList.add("chat-message", "chatbot", "typing");
  typingDiv.id = "typing-indicator";
  typingDiv.innerHTML = `<strong>Chatbot:</strong><br>Typing...`;
  chatbotMessages.appendChild(typingDiv);
}

function removeTypingIndicator() {
  const typingDiv = document.getElementById("typing-indicator");
  if (typingDiv) typingDiv.remove();
}

// Match user input to answers
function respondToUser(input) {
  let matched = false;
  for (let key in answers) {
    if (input.includes(key)) {
      addMessage("chatbot", "Chatbot", answers[key]);
      matched = true;
      break;
    }
  }

  if (!matched) {
    addMessage("chatbot", "Chatbot", "🤖 Sorry, I’m still learning. Try asking about my skills, projects, resume, or education!");
  }
}
