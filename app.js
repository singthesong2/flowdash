window.addEventListener("DOMContentLoaded", () => {
  const openModalBtns = document.querySelectorAll(".add-work");
  const todoModal = document.querySelector(".new-dial");
  const closeModalBtn = document.querySelector(".dial-cancle-btn");
  const todoForm = document.querySelector(".add-dial");

  const todoList = document.querySelector(".todo-list");
  const todoCount = document.querySelector(".todo-count");

  if (openModalBtns.length > 0 && todoModal) {
    openModalBtns.forEach((btn) => {
      btn.onclick = () => {
        todoModal.showModal();
      };
    });
  }

  if (closeModalBtn && todoModal && todoForm) {
    closeModalBtn.onclick = () => {
      todoModal.close();
      todoForm.reset();
    };
  }

  if (todoForm) {
    todoForm.onsubmit = (e) => {
      e.preventDefault();

      const titleInput = todoForm.querySelector('input[type="text"]');
      const dateInput = todoForm.querySelector('input[type="date"]');
      const prioSelect = todoForm.querySelector(".prio-dial select");

      const titleValue = titleInput ? titleInput.value.trim() : "";
      const dateValue = dateInput ? dateInput.value : "";
      const prioValue = prioSelect ? prioSelect.value : "낮음";

      if (!titleValue) {
        alert("내용을 입력하세요");
        return;
      }

      const newCard = document.createElement("div");
      newCard.className = "todo-item";

      newCard.style.backgroundColor = "#ffffff";
      newCard.style.padding = "12px";
      newCard.style.borderRadius = "8px";
      newCard.style.marginTop = "10px";
      newCard.style.border = "1px solid #dfe4ec";

      newCard.innerHTML = `
        <h3 style="margin: 0 0 6px 0; font-size: 15px; font-weight: bold;">${titleValue}</h3>
        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: #666;">
          <span>📅 ${dateValue ? dateValue : "기한 없음"}</span>
          <span class="prio-tag" style="font-weight: bold; color: #5f42f0;">[${prioValue}]</span>
        </div>
      `;

      if (todoList) {
        todoList.appendChild(newCard);
      }

      if (todoCount) {
        const currentNum = parseInt(todoCount.textContent, 10) || 0;
        todoCount.textContent = currentNum + 1;
      }

      todoModal.close();
      todoForm.reset();
    };
  }
});
// 0710 조민호 검색 칩 시작
document.addEventListener("DOMContentLoaded", () => {
  const minhoSearchInput = document.querySelector("#todo-search-input");
  const minhoSearchChip = document.querySelector("#search-chip");
  const minhoSearchChipText = document.querySelector("#search-chip-text");

  if (!minhoSearchInput || !minhoSearchChip || !minhoSearchChipText) {
    return;
  }

  function updateSearchChip() {
    const keyword = minhoSearchInput.value.trim();

    if (keyword === "") {
      minhoSearchChip.classList.add("is-hidden");
      minhoSearchChipText.textContent = "";
      return;
    }

    minhoSearchChip.classList.remove("is-hidden");
    minhoSearchChipText.textContent = `"${keyword}"`;
  }

  minhoSearchInput.addEventListener("input", updateSearchChip);

  updateSearchChip();
});
// 0710 조민호 검색 칩 끝
