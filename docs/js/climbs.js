// Load climbs from localStorage or sample data
let climbs = JSON.parse(localStorage.getItem("climbs")) || [
  {
    id: 1,
    name: "Mount Everest",
    picture: "assets/images/everest.jpg",
    height: 8848,
    date: "2025-05-21",
    location: "Nepal/China",
    difficulty: "Extreme",
    distance: 20,
    peopleCount: 3,
    notes: "Reached summit after 8 hours."
  }
];

// DOM
const climbsGrid = document.getElementById("climbsGrid");
const climbModal = document.getElementById("climbModal");
const modalClose = climbModal.querySelector(".modal-close");
const newClimbBtn = document.getElementById("newClimbBtn");

const formModal = document.getElementById("formModal");
const formModalClose = document.getElementById("formModalClose");
const cancelFormBtn = document.getElementById("cancelFormBtn");
const formTitle = document.getElementById("formTitle");
const climbForm = document.getElementById("climbForm");

// Form fields
const fName = document.getElementById("formName");
const fPicture = document.getElementById("formPicture");
const fHeight = document.getElementById("formHeight");
const fDate = document.getElementById("formDate");
const fLocation = document.getElementById("formLocation");
const fDifficulty = document.getElementById("formDifficulty");
const fDistance = document.getElementById("formDistance");
const fPeople = document.getElementById("formPeople");
const fNotes = document.getElementById("formNotes");

let editingId = null;

// Save to localStorage
function saveClimbs() {
  localStorage.setItem("climbs", JSON.stringify(climbs));
}

// Render cards
function renderClimbs() {
  climbsGrid.innerHTML = "";
  climbs.forEach(climb => {
    const card = document.createElement("div");
    card.className = "climb-card";
    card.innerHTML = `
      <img src="${climb.picture}" alt="${climb.name}">
      <div class="card-content">
        <h3>${climb.name}</h3>
        <p><strong>Высота:</strong> ${climb.height} м</p>
        <p><strong>Дата:</strong> ${climb.date}</p>
      </div>
    `;
    card.onclick = () => openDetailModal(climb);
    climbsGrid.appendChild(card);
  });
}

// Detail modal
function openDetailModal(climb) {
  document.getElementById("modalPic").src = climb.picture;
  document.getElementById("modalName").textContent = climb.name;
  document.getElementById("modalDate").textContent = climb.date;
  document.getElementById("modalHeight").textContent = climb.height;
  document.getElementById("modalLocation").textContent = climb.location;
  document.getElementById("modalDifficulty").textContent = climb.difficulty;
  document.getElementById("modalDistance").textContent = climb.distance;
  document.getElementById("modalPeople").textContent = climb.peopleCount;
  document.getElementById("modalNotes").textContent = climb.notes;

  climbModal.querySelector(".edit-btn").onclick = () => openFormModal(climb);
  climbModal.querySelector(".delete-btn").onclick = () => deleteClimb(climb.id);

  climbModal.style.display = "block";
}

// Open form modal
function openFormModal(climb = null) {
  formModal.style.display = "block";
  climbModal.style.display = "none";

  if (climb) {
    formTitle.textContent = "Редактировать восхождение";
    editingId = climb.id;
    fName.value = climb.name;
    fPicture.value = climb.picture;
    fHeight.value = climb.height;
    fDate.value = climb.date;
    fLocation.value = climb.location;
    fDifficulty.value = climb.difficulty;
    fDistance.value = climb.distance;
    fPeople.value = climb.peopleCount;
    fNotes.value = climb.notes;
  } else {
    formTitle.textContent = "Новое восхождение";
    editingId = null;
    climbForm.reset();
  }
}

// Delete
function deleteClimb(id) {
  if (!confirm("Удалить это восхождение?")) return;
  climbs = climbs.filter(c => c.id !== id);
  saveClimbs();
  renderClimbs();
  climbModal.style.display = "none";
}

// Submit form
climbForm.onsubmit = (e) => {
  e.preventDefault();

  const climbData = {
    id: editingId ? editingId : Date.now(),
    name: fName.value,
    picture: fPicture.value,
    height: Number(fHeight.value),
    date: fDate.value,
    location: fLocation.value,
    difficulty: fDifficulty.value,
    distance: Number(fDistance.value),
    peopleCount: Number(fPeople.value),
    notes: fNotes.value
  };

  if (editingId) {
    climbs = climbs.map(c => c.id === editingId ? climbData : c);
  } else {
    climbs.push(climbData);
  }

  saveClimbs();
  renderClimbs();
  formModal.style.display = "none";
};

// Button bindings
newClimbBtn.onclick = () => openFormModal();
modalClose.onclick = () => climbModal.style.display = "none";
formModalClose.onclick = () => formModal.style.display = "none";
cancelFormBtn.onclick = () => formModal.style.display = "none";

window.onclick = (e) => {
  if (e.target === climbModal) climbModal.style.display = "none";
  if (e.target === formModal) formModal.style.display = "none";
};

// Init
renderClimbs();
