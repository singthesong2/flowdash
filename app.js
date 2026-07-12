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

      const titleError = todoForm.querySelector("#title-error");
      if (titleError) titleError.style.display = "none";
    };
  }

  // 7/11 개별삭제 구현 시작
  const DeleteData = (items, count, empty) => {
    items.addEventListener("click", (e) => {
      if (!e.target.classList.contains("todo_card_delete")) return;

      e.target.closest(".todo-card").remove();

      updateHiddenMsg(items, count, empty);
    });
  };

  DeleteData(todoItems, todoCount, todoEmpty);
  DeleteData(inProgressItems, inProgressCount, inProgressEmpty);
  DeleteData(doneItems, doneCount, doneEmpty);
  // 7/11 개별삭제 구현 끝

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

// 에러메세지 정현우
      const titleError = todoForm.querySelector("#title-error");
      if (!titleValue) {
        if (titleError) titleError.style.display = "block";
        return;
      } else {
        if (titleError) titleError.style.display = "none";
      }

      if (titleInput && !titleInput.dataset.listenerAdded) {
        titleInput.addEventListener("input", () => {
          if (titleInput.value.trim() && titleError) {
            titleError.style.display = "none";
          }
        });
        titleInput.dataset.listenerAdded = "true";
      }
// 에러메세지 정현우

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

function bindNicknameClick(element) {
  if (!element) return;

  element.addEventListener("click", () => {
    const currentName = element.textContent;

    const input = document.createElement("input");
    input.type = "text";
    input.value = currentName;
    input.classList.add("nickname-input");
    input.maxLength = 10;

    input.style.width = `${Math.max(currentName.length * 0.62, 3.2)}em`;

    element.replaceWith(input);
    input.focus();

    input.addEventListener("input", () => {
      input.style.width = `${Math.max(input.value.length * 0.62, 3.2)}em`;
    });

    const saveNickname = () => {
      const newName = input.value.trim() || currentName || "FlowDash";

      const newSpan = document.createElement("span");
      newSpan.id = "nickname";
      newSpan.className = "nickname-display";
      newSpan.textContent = newName;

      localStorage.setItem("userNickname", newName);
      input.replaceWith(newSpan);

      bindNicknameClick(newSpan);
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

if (nicknameSpan) {
  const savedNickname = localStorage.getItem("userNickname");
  if (savedNickname) {
    nicknameSpan.textContent = savedNickname;
  } else {
    nicknameSpan.textContent = "FlowDash";
  }
  bindNicknameClick(nicknameSpan);
}
/* 0710 정우석 닉네임 작업 끝*/

// 0711 정우석 인사말 닉네임 작업 시작 //
const greetingSpan = document.getElementById("greeting-message");
const currentDateP = document.getElementById("current-date");

const updateGreetingmessage = () => {
  if (!greetingSpan) return;

  const currentHour = new Date().getHours();
  let greeting = "안녕하세요";

  if (currentHour >= 5 && currentHour < 11) {
    greeting = "좋은 아침이에요";
  } else if (currentHour >= 11 && currentHour < 17) {
    greeting = "좋은 오후에요";
  } else if (currentHour >= 17 && currentHour < 22) {
    greeting = "좋은 저녁이에요";
  }
  greetingSpan.textContent = greeting + ",";
};
const updateCurrentDate = () => {
  if (!currentDateP) return;

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();

  currentDateP.textContent = `${year}년 ${month}월 ${date}일`;
};

updateGreetingmessage();
updateCurrentDate();

// 0711 정우석 인사말 닉네임 작업 끝 0710 정우석 닉네임 작업 끝*/

// 0711 조민호 검색/기간/우선순위/정렬 필터 시작
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector("#todo-search-input");

  const periodSelect = document.querySelector("#period-select");
  const prioritySelect = document.querySelector("#priority-select");
  const sortSelect = document.querySelector("#sort-select");

  const periodChip = document.querySelector("#period-chip");
  const periodChipText = document.querySelector("#period-chip-text");

  const sortChip = document.querySelector("#sort-chip");
  const sortChipText = document.querySelector("#sort-chip-text");

  const searchChip = document.querySelector("#search-chip");
  const searchChipText = document.querySelector("#search-chip-text");
  const priorityChip = document.querySelector("#priority-chip");
  const priorityChipText = document.querySelector("#priority-chip-text");

  if (
    !searchInput ||
    !periodSelect ||
    !prioritySelect ||
    !sortSelect ||
    !periodChip ||
    !periodChipText ||
    !sortChip ||
    !sortChipText ||
    !searchChip ||
    !searchChipText ||
    !priorityChip ||
    !priorityChipText
  ) {
    return;
  }

  function updateFilterChips() {
    const keyword = searchInput.value.trim();
    const periodValue = periodSelect.value;
    const priorityValue = prioritySelect.value;
    const sortValue = sortSelect.value;
    if (periodValue === "전체 기간") {
      periodChipText.textContent = "전체";
    } else {
      periodChipText.textContent = periodValue;
    }

    if (sortValue.includes("내림차순")) {
      sortChipText.textContent = "내림차순";
    } else {
      sortChipText.textContent = "오름차순";
    }

    if (keyword === "") {
      searchChip.classList.add("is-hidden");
      searchChipText.textContent = "";
    } else {
      searchChip.classList.remove("is-hidden");
      searchChipText.textContent = `"${keyword}"`;
    }

    if (priorityValue === "전체 우선순위") {
      priorityChip.classList.add("is-hidden");
      priorityChipText.textContent = "";
    } else {
      priorityChip.classList.remove("is-hidden");
      priorityChipText.textContent = priorityValue;
    }
  }

  function isToday(dateText) {
    const today = new Date();
    const targetDate = new Date(dateText);

    return (
      today.getFullYear() === targetDate.getFullYear() &&
      today.getMonth() === targetDate.getMonth() &&
      today.getDate() === targetDate.getDate()
    );
  }

  function isWithin7Days(dateText) {
    const today = new Date();
    const targetDate = new Date(dateText);

    const diffTime = targetDate - today;
    const diffDate = diffTime / (1000 * 60 * 60 * 24);

    return diffDate >= 0 && diffDate <= 7;
  }

  function sortTodoCards() {
    const sortValue = sortSelect.value;

    const boardLists = document.querySelectorAll(
      ".todo-list, .in-progress-list, .done-list",
    );

    boardLists.forEach((board) => {
      const cards = Array.from(board.querySelectorAll(".todo-card"));

      cards.sort((a, b) => {
        const aTitle = a
          .querySelector(".todo-card__title-text")
          .textContent.trim();

        const bTitle = b
          .querySelector(".todo-card__title-text")
          .textContent.trim();

        if (sortValue.includes("내림차순")) {
          return bTitle.localeCompare(aTitle, "ko");
        }

        return aTitle.localeCompare(bTitle, "ko");
      });

      cards.forEach((card) => {
        board.appendChild(card);
      });
    });
  }

  function filterTodoCards() {
    const keyword = searchInput.value.trim().toLowerCase();
    const periodValue = periodSelect.value;
    const priorityValue = prioritySelect.value;

    const todoCards = document.querySelectorAll(".todo-card");

    todoCards.forEach((card) => {
      const titleElement = card.querySelector(".todo-card__title-text");
      const contentElement = card.querySelector(".todo-card__content-text");
      const dateElement = card.querySelector(".todo-card__date-text");
      const priorityElement = card.querySelector(".todo-card__priority");

      const titleText = titleElement
        ? titleElement.textContent.toLowerCase()
        : "";

      const contentText = contentElement
        ? contentElement.textContent.toLowerCase()
        : "";

      const dateText = dateElement ? dateElement.textContent.trim() : "";

      const priorityText = priorityElement
        ? priorityElement.textContent.replace("[", "").replace("]", "").trim()
        : "";

      const isKeywordMatched =
        titleText.includes(keyword) || contentText.includes(keyword);

      const isPriorityMatched =
        priorityValue === "전체 우선순위" || priorityText === priorityValue;

      let isPeriodMatched = true;

      if (periodValue === "오늘") {
        isPeriodMatched = dateText !== "기한 없음" && isToday(dateText);
      }

      if (periodValue === "최근 7일") {
        isPeriodMatched = dateText !== "기한 없음" && isWithin7Days(dateText);
      }

      if (isKeywordMatched && isPriorityMatched && isPeriodMatched) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  }

  function handleFilterChange() {
    updateFilterChips();
    sortTodoCards();
    filterTodoCards();
  }

  searchInput.addEventListener("input", handleFilterChange);
  periodSelect.addEventListener("change", handleFilterChange);
  prioritySelect.addEventListener("change", handleFilterChange);
  sortSelect.addEventListener("change", handleFilterChange);

  handleFilterChange();
});
// 0711 조민호 검색/기간/우선순위/정렬 필터 끝
