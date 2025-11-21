const gallery = document.querySelector(".gallery");
const modal = document.getElementById("articleModal");
const modalTitle = modal.querySelector(".modal-title");
const modalTopic = modal.querySelector(".modal-topic");
const modalDate = modal.querySelector(".modal-date");
const modalBody = modal.querySelector(".modal-body");
const modalClose = modal.querySelector(".modal-close");

articles.forEach(article => {
  const card = document.createElement("div");
  card.classList.add("card");
  
  const span = Math.floor(Math.random() * 10) + 6;
  card.style.setProperty('--row-span', span);
  card.dataset.rowSpan = span;
  
  card.innerHTML = `<h3>${article.title}</h3><p>${article.topic}</p>`;
  
  card.addEventListener("click", () => {
    modalTitle.textContent = article.title;
    modalTopic.textContent = article.topic;
    modalDate.textContent = article.date;
    modalBody.textContent = article.content;
    modal.style.display = "flex";
  });
  
  gallery.appendChild(card);
});

modalClose.addEventListener("click", () => modal.style.display = "none");
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});
