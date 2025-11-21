let climbs = JSON.parse(localStorage.getItem("climbs"))

// DOM elements
const climbsGrid = document.getElementById("climbsGrid");
const climbModal = document.getElementById("climbModal");
const modalClose = climbModal.querySelector(".modal-close");
const newClimbBtn = document.getElementById("newClimbBtn");

let editingClimbId = null;

// Render climb cards
function renderClimbs() {
  climbsGrid.innerHTML = "";
  climbs.forEach(climb => {
    const card = document.createElement("div");
    card.classList.add("climb-card");
    card.innerHTML = `
      <img src="${climb.picture}" alt="${climb.name}">
      <div class="card-content">
        <h3>${climb.name}</h3>
        <p><strong>Высота:</strong> ${climb.height} м</p>
        <p><strong>Дата:</strong> ${climb.date}</p>
      </div>
    `;
    card.addEventListener("click", () => openModal(climb));
    climbsGrid.appendChild(card);
  });
}

// Open modal with climb details
function openModal(climb) {
  document.getElementById("modalPic").src = climb.picture;
  document.getElementById("modalName").textContent = climb.name;
  document.getElementById("modalDate").textContent = climb.date;
  document.getElementById("modalHeight").textContent = climb.height;
  document.getElementById("modalLocation").textContent = climb.location;
  document.getElementById("modalDifficulty").textContent = climb.difficulty;
  document.getElementById("modalDistance").textContent = climb.distance;
  document.getElementById("modalPeople").textContent = climb.peopleCount;
  document.getElementById("modalNotes").textContent = climb.notes;

  // Set edit/delete button actions
  const editBtn = climbModal.querySelector(".edit-btn");
  const deleteBtn = climbModal.querySelector(".delete-btn");

  editingClimbId = climb.id;

  editBtn.onclick = () => openAddEditModal(climb); // reuse modal for editing
  deleteBtn.onclick = () => deleteClimb(climb.id);

  climbModal.style.display = "block";
}

// Close modal
modalClose.onclick = () => climbModal.style.display = "none";
window.onclick = (e) => { if (e.target === climbModal) climbModal.style.display = "none"; };

// Save climbs to localStorage
function saveClimbs() {
  localStorage.setItem("climbs", JSON.stringify(climbs));
}

// Delete a climb
function deleteClimb(id) {
  if (confirm("Вы уверены, что хотите удалить это восхождение?")) {
    climbs = climbs.filter(c => c.id !== id);
    saveClimbs();
    renderClimbs();
    climbModal.style.display = "none";
  }
}

// Add/Edit climb modal (simple prompt version)
function openAddEditModal(climb = null) {
  let name = prompt("Название восхождения:", climb ? climb.name : "");
  if (!name) return;
  let picture = prompt("URL изображения:", climb ? climb.picture : "");
  let height = prompt("Высота (м):", climb ? climb.height : "");
  let date = prompt("Дата (YYYY-MM-DD):", climb ? climb.date : "");
  let location = prompt("Локация:", climb ? climb.location : "");
  let difficulty = prompt("Сложность:", climb ? climb.difficulty : "");
  let distance = prompt("Дистанция (км):", climb ? climb.distance : "");
  let peopleCount = prompt("Количество участников:", climb ? climb.peopleCount : "");
  let notes = prompt("Заметки:", climb ? climb.notes : "");

  const newClimb = {
    id: climb ? climb.id : Date.now(),
    name, picture, height, date, location, difficulty, distance, peopleCount, notes
  };

  if (climb) {
    climbs = climbs.map(c => c.id === climb.id ? newClimb : c);
  } else {
    climbs.push(newClimb);
  }

  saveClimbs();
  renderClimbs();
  climbModal.style.display = "none";
}

// New Climb button
newClimbBtn.onclick = () => openAddEditModal();

// Initial render
renderClimbs();
