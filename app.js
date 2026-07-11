window.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("theme-toggle");

  if (btn) {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }

    btn.addEventListener("click", () => {
      document.body.classList.toggle("dark");

      const isDark = document.body.classList.contains("dark");
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  }
  /*정우석 0711 다크모드 추가 끝 */

  const openModalBtns = document.querySelectorAll(".add-work");
  const todoModal = document.querySelector(".new-dial");
  const closeModalBtn = document.querySelector(".dial-cancle-btn");
  const todoForm = document.querySelector(".add-dial");
  const allDeleteData = document.querySelector(".all-data-reset");

  const todoList = document.querySelector(".todo-list");
  const inProgressList = document.querySelector(".in-progress-list");
  const doneList = document.querySelector(".done-list");
  const todoCount = document.querySelector(".todo-count");
  const inProgressCount = document.querySelector(".in-progress-count");
  const doneCount = document.querySelector(".done-count");

  const todoItems = document.querySelector(".todo-items");
  const inProgressItems = document.querySelector(".in-progress-items");
  const doneItems = document.querySelector(".done-items");
  const todoEmpty = document.querySelector(".todo-list .hidden-message");
  const inProgressEmpty = document.querySelector(
    ".in-progress-list .hidden-message",
  );
  const doneEmpty = document.querySelector(".done-list .hidden-message");

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

  // 7/11 새벽, 전체 삭제 및 완료된일 없음 메세지 처리 시작

  const updateHiddenMsg = (item, numCount, empty) => {
    const count = item.children.length;

    numCount.textContent = count;

    if (count === 0) {
      empty.classList.remove("hidden");
    } else {
      empty.classList.add("hidden");
    }
  };

  allDeleteData.addEventListener("click", () => {
    document.querySelector(".todo-items").replaceChildren();
    document.querySelector(".in-progress-items").replaceChildren();
    document.querySelector(".done-items").replaceChildren();

    updateHiddenMsg(todoItems, todoCount, todoEmpty);
    updateHiddenMsg(inProgressItems, inProgressCount, inProgressEmpty);
    updateHiddenMsg(doneItems, doneCount, doneEmpty);
  });

  // 7/11 새벽, 전체 삭제 및 완료된일 없음 메세지 처리 끝

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
        document.querySelector(".todo-items").appendChild(newCard);
        updateHiddenMsg(todoItems, todoCount, todoEmpty);
      } else if (statusValue === "진행중") {
        document.querySelector(".in-progress-items").appendChild(newCard);
        updateHiddenMsg(inProgressItems, inProgressCount, inProgressEmpty);
      } else {
        document.querySelector(".done-items").appendChild(newCard);
        updateHiddenMsg(doneItems, doneCount, doneEmpty);
      }

      todoModal.close();
      todoForm.reset();
    };
  }
});

/* 0710 정우석 닉네임 작업 시작*/
const nicknameSpan = document.getElementById("nickname");

if (nicknameSpan) {
  const savedNickname = localStorage.getItem("userNickname");
  if (savedNickname) {
    nicknameSpan.textContent = savedNickname;
  }

  nicknameSpan.addEventListener("click", () => {
    const currentName = nicknameSpan.textContent;

    const input = document.createElement("input");
    input.type = "text";
    input.value = currentName;
    input.classList.add("nickname-input");
    input.maxLength = 10;

    input.style.width = `${Math.max(currentName.length * 0.62, 3.2)}em`;

    nicknameSpan.replaceWith(input);
    input.focus();

    input.addEventListener("input", () => {
      input.style.width = `${Math.max(input.value.length * 0.62, 3.2)}em`;
    });

    const saveNickname = () => {
      const newName = input.value.trim() || currentName;
      nicknameSpan.textContent = newName;
      localStorage.setItem("userNickname", newName);
      input.replaceWith(nicknameSpan);
    };

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        input.removeEventListener("blur", saveNickname);
        saveNickname();
      }
    });

    input.addEventListener("blur", saveNickname);
  });
}
/* 0710 정우석 닉네임 작업 끝*/

// 0711 조민호 검색 칩 + 할 일 검색 필터 시작
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
    } else {
      minhoSearchChip.classList.remove("is-hidden");
      minhoSearchChipText.textContent = `"${keyword}"`;
    }
  }

  function filterTodoCards() {
    const keyword = minhoSearchInput.value.trim().toLowerCase();
    const todoCards = document.querySelectorAll(".todo-card");

    todoCards.forEach((card) => {
      const titleElement = card.querySelector(".todo-card__title-text");
      const contentElement = card.querySelector(".todo-card__content-text");

      const titleText = titleElement
        ? titleElement.textContent.toLowerCase()
        : "";

      const contentText = contentElement
        ? contentElement.textContent.toLowerCase()
        : "";

      const isMatched =
        titleText.includes(keyword) || contentText.includes(keyword);

      if (isMatched) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  }

  function handleSearchInput() {
    updateSearchChip();
    filterTodoCards();
  }

  minhoSearchInput.addEventListener("input", handleSearchInput);
  handleSearchInput();
});
// 0711 조민호 검색 칩 + 할 일 검색 필터 끝
