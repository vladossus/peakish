let climbs = JSON.parse(localStorage.getItem("climbs")) || [];

let editingId = null;
let currentEditImage = "";

const climbsGrid = document.getElementById("climbsGrid");
const climbModal = document.getElementById("climbModal");
const modalClose = climbModal.querySelector(".modal-close");

const formModal = document.getElementById("formModal");
const formModalClose = document.getElementById("formModalClose");
const cancelFormBtn = document.getElementById("cancelFormBtn");
const formTitle = document.getElementById("formTitle");
const climbForm = document.getElementById("climbForm");

const newClimbBtn = document.getElementById("newClimbBtn");

// form fields
const fName       = document.getElementById("formName");
const fPicture    = document.getElementById("formPicture");
const fHeight     = document.getElementById("formHeight");
const fDate       = document.getElementById("formDate");
const fLocation   = document.getElementById("formLocation");
const fDifficulty = document.getElementById("formDifficulty");
const fDistance   = document.getElementById("formDistance");
const fPeople     = document.getElementById("formPeople");
const fNotes      = document.getElementById("formNotes");

const FALLBACK_IMAGE = "assets/images/climb-placeholder.webp";

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function saveClimbs() {
  localStorage.setItem("climbs", JSON.stringify(climbs));
}

function renderClimbs() {
  climbsGrid.innerHTML = "";

  climbs.forEach(climb => {
    const card = document.createElement("div");
    card.className = "climb-card";

    const imgSrc = climb.picture || FALLBACK_IMAGE;

    card.innerHTML = `
      <img src="${imgSrc}" alt="${climb.name}">
      <div class="card-content">
        <h3>${climb.name}</h3>
        <p>
          <img src="assets/icons/mountain.svg" class="card-icon" alt="Высота">
          <strong>Высота:</strong> ${climb.height} м
        </p>
        <p>
          <img src="assets/icons/calendar.svg" class="card-icon" alt="Дата">
          <strong>Дата:</strong> ${climb.date}
        </p>
      </div>
    `;

    card.addEventListener("click", () => openDetailModal(climb));
    climbsGrid.appendChild(card);
  });
}

// modals
function openDetailModal(climb) {
  document.getElementById("modalPic").src = climb.picture || FALLBACK_IMAGE;
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

function openFormModal(climb = null) {
  formModal.style.display = "block";
  climbModal.style.display = "none";

  if (climb) {
    formTitle.textContent = "Редактировать восхождение";
    editingId = climb.id;

    currentEditImage = climb.picture || "";

    fPicture.value = "";
    fName.value = climb.name;
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
    currentEditImage = "";
    climbForm.reset();
  }
}

// delete
function deleteClimb(id) {
  if (!confirm("Удалить это восхождение?")) return;

  climbs = climbs.filter(c => c.id !== id);
  saveClimbs();
  renderClimbs();

  climbModal.style.display = "none";
}

// submit
climbForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const isEditing = Boolean(editingId);

  let imageBase64 = currentEditImage;
  const file = fPicture.files[0];
  if (file) {
    imageBase64 = await fileToBase64(file);
  }

  const climbData = {
    id: editingId ?? Date.now(),
    name: fName.value.trim(),
    picture: isEditing
      ? (imageBase64 || currentEditImage)
      : (imageBase64 || FALLBACK_IMAGE),
    height: Number(fHeight.value) || 0,
    date: fDate.value,
    location: fLocation.value.trim(),
    difficulty: fDifficulty.value,
    distance: Number(fDistance.value) || 0,
    peopleCount: Number(fPeople.value) || 0,
    notes: fNotes.value.trim()
  };

  if (isEditing) {
    climbs = climbs.map(c => (c.id === editingId ? climbData : c));
  } else {
    climbs.push(climbData);
  }

  saveClimbs();
  renderClimbs();

  formModal.style.display = "none";
});

// events
newClimbBtn.onclick = () => openFormModal();
modalClose.onclick = () => (climbModal.style.display = "none");
formModalClose.onclick = () => (formModal.style.display = "none");
cancelFormBtn.onclick = () => (formModal.style.display = "none");

window.onclick = (e) => {
  if (e.target === climbModal) climbModal.style.display = "none";
  if (e.target === formModal) formModal.style.display = "none";
};

// init
renderClimbs();
