window.addEventListener("DOMContentLoaded", () => {
  const openModalBtns = document.querySelectorAll(".add-work");
  const todoModal = document.querySelector(".new-dial");
  const closeModalBtn = document.querySelector(".dial-cancle-btn");
  const todoForm = document.querySelector(".add-dial");

  const todoList = document.querySelector(".todo-list");
  const inProgressList = document.querySelector(".in-progress-list");
  const doneList = document.querySelector(".done-list");
  const todoCount = document.querySelector(".todo-count");
  const inProgressCount = document.querySelector(".in-progress-count");
  const doneCount = document.querySelector(".done-count");

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

      const template = document.querySelector(".todo-template");

      const titleInput = todoForm.querySelector(".title-input");
      const textInput = todoForm.querySelector(".content-input");
      const dateInput = todoForm.querySelector(".date-input");
      const prioSelect = todoForm.querySelector(".prio-dial select");
      const statusSelect = todoForm.querySelector(".status-dial select");

      const titleValue = titleInput ? titleInput.value.trim() : "";
      const textValue = textInput ? textInput.value.trim() : "";
      const dateValue = dateInput ? dateInput.value : "";
      const prioValue = prioSelect ? prioSelect.value : "낮음";
      const statusValue = statusSelect ? statusSelect.value : "할 일";

      if (!titleValue) {
        alert("내용을 입력하세요");
        return;
      }

      const newCard = template.content.firstElementChild.cloneNode(true);

      newCard.querySelector(".todo-card__title-text").textContent = titleValue;
      newCard.querySelector(".todo-card__content-text").textContent = textValue;
      newCard.querySelector(".todo-card__date-text").textContent =
        dateValue || "기한 없음";
      newCard.querySelector(".todo-card__priority").textContent =
        `[${prioValue}]`;

      if (statusValue === "할 일") {
        document.querySelector(".todo-list").appendChild(newCard);
        const currentNum = parseInt(todoCount.textContent, 10) || 0;
        todoCount.textContent = currentNum + 1;
      } else if (statusValue === "진행중") {
        document.querySelector(".in-progress-list").appendChild(newCard);
        const currentNum = parseInt(inProgressCount.textContent, 10) || 0;
        inProgressCount.textContent = currentNum + 1;
      } else {
        document.querySelector(".done-list").appendChild(newCard);
        const currentNum = parseInt(doneCount.textContent, 10) || 0;
        doneCount.textContent = currentNum + 1;
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
