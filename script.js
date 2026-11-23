// ===== DATA: edit/add careers here =====
const careers = [
  { id: "web", icon: "🌐", title: "Web Developer", cat: "Software",
    desc: "Build websites and web apps people use every day.",
    steps: [
      ["Learn HTML, CSS & JavaScript", "Build 3 small projects"],
      ["Learn Git & GitHub", "Push every project online"],
      ["Learn a framework", "React / Vue"],
      ["Learn backend basics", "Node.js, REST APIs, databases"],
      ["Build a portfolio & apply", "Internships + open source"]],
    roles: ["Frontend Developer", "Full-Stack Developer", "UI Engineer"] },
  { id: "app", icon: "📱", title: "App Developer", cat: "Software",
    desc: "Create Android and iOS apps.",
    steps: [
      ["Learn Java/Kotlin or Dart", "Programming fundamentals"],
      ["Learn Android Studio or Flutter", "Build a to-do app"],
      ["Work with APIs & Firebase", "Login + cloud storage"],
      ["Publish an app", "Play Store"]],
    roles: ["Android Developer", "Flutter Developer", "Mobile Engineer"] },
  { id: "ds", icon: "📊", title: "Data Scientist", cat: "Data & AI",
    desc: "Turn data into insights and predictions.",
    steps: [
      ["Learn Python", "NumPy, Pandas"],
      ["Statistics & maths basics", "Probability, linear algebra"],
      ["Data visualisation", "Matplotlib, Power BI"],
      ["Machine learning", "scikit-learn"],
      ["Kaggle projects", "Build a public portfolio"]],
    roles: ["Data Analyst", "Data Scientist", "ML Engineer"] },
  { id: "ai", icon: "🤖", title: "AI / ML Engineer", cat: "Data & AI",
    desc: "Build intelligent systems and models.",
    steps: [
      ["Python + maths foundation", "Linear algebra, calculus"],
      ["Classical ML", "Regression, trees, clustering"],
      ["Deep learning", "PyTorch / TensorFlow"],
      ["Specialise", "NLP, computer vision, LLMs"],
      ["Deploy models", "APIs, Docker, cloud"]],
    roles: ["AI Engineer", "ML Researcher", "Computer Vision Engineer"] },
  { id: "emb", icon: "🔌", title: "Embedded Systems Engineer", cat: "Electronics",
    desc: "Program the hardware inside smart devices.",
    steps: [
      ["Digital electronics & C programming", "Core of the field"],
      ["Arduino & ESP32 projects", "Sensors, displays, motors"],
      ["Microcontroller concepts", "Timers, interrupts, I2C/SPI/UART"],
      ["Learn RTOS & PCB basics", "FreeRTOS, KiCad"],
      ["Build a full hardware project", "Document it on GitHub"]],
    roles: ["Embedded Engineer", "Firmware Developer", "Hardware Engineer"] },
  { id: "iot", icon: "📡", title: "IoT Engineer", cat: "Electronics",
    desc: "Connect devices to the internet and the cloud.",
    steps: [
      ["Electronics + C/Python", "Basics first"],
      ["ESP32 / Raspberry Pi", "Wi-Fi, Bluetooth, LoRa"],
      ["Protocols", "MQTT, HTTP, REST"],
      ["Cloud dashboards", "ThingSpeak, Firebase, AWS IoT"],
      ["End-to-end smart project", "Sensor → cloud → app"]],
    roles: ["IoT Developer", "Automation Engineer", "Smart Systems Engineer"] },
  { id: "sec", icon: "🔒", title: "Cybersecurity Analyst", cat: "Security",
    desc: "Protect systems and data from attackers.",
    steps: [
      ["Networking & Linux basics", "TCP/IP, command line"],
      ["Security fundamentals", "CIA triad, cryptography"],
      ["Practice legally", "TryHackMe, HackTheBox"],
      ["Certifications", "CompTIA Security+, CEH"],
      ["Specialise", "SOC, pentesting, cloud security"]],
    roles: ["SOC Analyst", "Penetration Tester", "Security Engineer"] },
  { id: "ux", icon: "🎨", title: "UI/UX Designer", cat: "Design",
    desc: "Design products that are easy and enjoyable to use.",
    steps: [
      ["Design principles", "Colour, typography, layout"],
      ["Learn Figma", "Wireframes & prototypes"],
      ["User research basics", "Interviews, personas"],
      ["Build 3 case studies", "Show your process"],
      ["Portfolio website", "Apply for internships"]],
    roles: ["UI Designer", "UX Researcher", "Product Designer"] },
    { id: "vlsi", icon: "💾", title: "VLSI Design Engineer", cat: "Electronics",
    desc: "Design the chips that power phones, computers and cars.",
    steps: [
      ["Digital electronics & Verilog", "Gates, flip-flops, FSMs"],
      ["Learn HDL simulation", "ModelSim or Vivado"],
      ["CMOS & VLSI design basics", "Layout, timing, power"],
      ["Build an FPGA project", "ALU or traffic-light controller"],
      ["Learn verification", "SystemVerilog, UVM basics"]],
    roles: ["VLSI Engineer", "Verification Engineer", "FPGA Developer"] },
  { id: "robo", icon: "🦾", title: "Robotics Engineer", cat: "Electronics",
    desc: "Build machines that sense, think and move.",
    steps: [
      ["Maths, C++ and Python basics", "Linear algebra, programming"],
      ["Sensors and actuators", "Arduino, motors, ultrasonic"],
      ["Learn ROS", "Robot Operating System"],
      ["Control systems & computer vision", "PID control, OpenCV"],
      ["Build a robot", "Line follower or obstacle avoider"]],
    roles: ["Robotics Engineer", "Automation Engineer", "Controls Engineer"] }
];

// ===== STATE =====
let activeCat = "All";
let current = null;
const progress = JSON.parse(localStorage.getItem("cp-progress") || "{}");
const $ = id => document.getElementById(id);

// ===== FILTERS =====
const cats = ["All", ...new Set(careers.map(c => c.cat))];
$("filters").innerHTML = cats.map(c =>
  `<button class="chip ${c === "All" ? "active" : ""}" data-cat="${c}">${c}</button>`).join("");
$("filters").addEventListener("click", e => {
  if (!e.target.dataset.cat) return;
  activeCat = e.target.dataset.cat;
  document.querySelectorAll(".chip").forEach(b => b.classList.toggle("active", b === e.target));
  render();
});
$("search").addEventListener("input", render);

// ===== RENDER CARDS =====
function pct(c) {
  const done = (progress[c.id] || []).length;
  return Math.round((done / c.steps.length) * 100);
}
function render() {
  const q = $("search").value.toLowerCase().trim();
  const list = careers.filter(c =>
    (activeCat === "All" || c.cat === activeCat) &&
    (c.title + c.desc + c.cat + c.steps.flat().join(" ") + c.roles.join(" ")).toLowerCase().includes(q));
  $("count").textContent = `${list.length} career${list.length === 1 ? "" : "s"} found`;
  $("grid").innerHTML = list.length ? list.map(c => `
    <article class="card" data-id="${c.id}">
      <div class="icon">${c.icon}</div>
      <h3>${c.title}</h3>
      <p>${c.desc}</p>
      <span class="badge">${c.cat} · ${pct(c)}% done</span>
    </article>`).join("") : `<p class="empty">No careers match your search 😕</p>`;
}
$("grid").addEventListener("click", e => {
  const card = e.target.closest(".card");
  if (card) openModal(card.dataset.id);
});

// ===== MODAL =====
function openModal(id) {
  current = careers.find(c => c.id === id);
  $("mTitle").textContent = `${current.icon} ${current.title}`;
  $("mDesc").textContent = current.desc;
  const done = progress[id] || [];
  $("steps").innerHTML = current.steps.map((s, i) => `
    <li class="${done.includes(i) ? "done" : ""}">
      <input type="checkbox" data-i="${i}" ${done.includes(i) ? "checked" : ""} />
      <span><strong>Step ${i + 1}: ${s[0]}</strong><small>${s[1]}</small></span>
    </li>`).join("");
  $("roles").innerHTML = current.roles.map(r => `<span>${r}</span>`).join("");
  updateBar();
  $("modal").classList.remove("hidden");
}
$("steps").addEventListener("change", e => {
  const i = Number(e.target.dataset.i);
  const set = new Set(progress[current.id] || []);
  e.target.checked ? set.add(i) : set.delete(i);
  progress[current.id] = [...set];
  localStorage.setItem("cp-progress", JSON.stringify(progress));
  e.target.closest("li").classList.toggle("done", e.target.checked);
  updateBar();
  render();
});
function updateBar() {
  $("bar").style.width = pct(current) + "%";
  $("pText").textContent = `Progress: ${pct(current)}%`;
}
function closeModal() { $("modal").classList.add("hidden"); }
$("closeBtn").onclick = closeModal;
$("modal").addEventListener("click", e => { if (e.target.id === "modal") closeModal(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

// ===== DARK MODE =====
if (localStorage.getItem("cp-theme") === "dark") { document.body.classList.add("dark"); $("themeBtn").textContent = "☀️"; }
$("themeBtn").onclick = () => {
  const dark = document.body.classList.toggle("dark");
  $("themeBtn").textContent = dark ? "☀️" : "🌙";
  localStorage.setItem("cp-theme", dark ? "dark" : "light");
};

render();
