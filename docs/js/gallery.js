const gallery = document.querySelector(".gallery");
const modal = document.getElementById("articleModal");
const modalImage = modal.querySelector(".modal-image img");
const modalTitle = modal.querySelector(".modal-title");
const modalTopic = modal.querySelector(".modal-topic");
const modalDate = modal.querySelector(".modal-date");
const modalBody = modal.querySelector(".modal-body");
const modalClose = modal.querySelector(".modal-close");

articles.forEach(article => {
  const card = document.createElement("div");
  card.classList.add("card");
  
  card.innerHTML = `
    <div class="card-image">
      <img src="${article.image}" alt="${article.title}">
      <div class="card-content">
        <h3>${article.title}</h3>
      </div>
    </div>
  `;
  
  card.addEventListener("click", () => {
    modalImage.setAttribute("src", article.image)
    modalTitle.textContent = article.title;
    modalBody.textContent = article.content;
    modal.style.display = "flex";
  });
  
  gallery.appendChild(card);
  
});

modalClose.addEventListener("click", () => modal.style.display = "none");
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});
