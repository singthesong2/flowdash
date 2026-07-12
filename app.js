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

      const currentTime = new Date();
      const hours = String(currentTime.getHours()).padStart(2, "0");
      const minutes = String(currentTime.getMinutes()).padStart(2, "0");
      const seconds = String(currentTime.getSeconds()).padStart(2, "0");
      const timeValue = `${hours}:${minutes}:${seconds}`;

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
      newCard.querySelector(".todo-card__time").textContent = timeValue;
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
  greetingSpan.textContent = greeting + ", ";
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

// 0712 정우석 아이콘 새로고침 시 무작위 아이콘 작업 //
const iconContainer = document.getElementById("random-icon");
const updateRandomIcon = () => {
  if (!iconContainer) return;

  const iconList = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#765EED" class="bi bi-rocket-takeoff" viewBox="0 0 16 16" style="font-size: 1.1em; vertical-align: -0.15em; margin-left: 6px;">
    <path d="M9.752 6.193c.599.6 1.73.437 2.528-.362s.96-1.932.362-2.531c-.599-.6-1.73-.438-2.528.361-.798.8-.96 1.933-.362 2.532"/>
    <path d="M15.811 3.312c-.363 1.534-1.334 3.626-3.64 6.218l-.24 2.408a2.56 2.56 0 0 1-.732 1.526L8.817 15.85a.51.51 0 0 1-.867-.434l.27-1.899c.04-.28-.013-.593-.131-.956a9 9 0 0 0-.249-.657l-.082-.202c-.815-.197-1.578-.662-2.191-1.277-.614-.615-1.079-1.379-1.275-2.195l-.203-.083a10 10 0 0 0-.655-.248c-.363-.119-.675-.172-.955-.132l-1.896.27A.51.51 0 0 1 .15 7.17l2.382-2.386c.41-.41.947-.67 1.524-.734h.006l2.4-.238C9.005 1.55 11.087.582 12.623.208c.89-.217 1.59-.232 2.08-.188.244.023.435.06.57.093q.1.026.16.045c.184.06.279.13.351.295l.029.073a3.5 3.5 0 0 1 .157.721c.055.485.051 1.178-.159 2.065m-4.828 7.475.04-.04-.107 1.081a1.54 1.54 0 0 1-.44.913l-1.298 1.3.054-.38c.072-.506-.034-.993-.172-1.418a9 9 0 0 0-.164-.45c.738-.065 1.462-.38 2.087-1.006M5.205 5c-.625.626-.94 1.351-1.004 2.09a9 9 0 0 0-.45-.164c-.424-.138-.91-.244-1.416-.172l-.38.054 1.3-1.3c.245-.246.566-.401.91-.44l1.08-.107zm9.406-3.961c-.38-.034-.967-.027-1.746.163-1.558.38-3.917 1.496-6.937 4.521-.62.62-.799 1.34-.687 2.051.107.676.483 1.362 1.048 1.928.564.565 1.25.941 1.924 1.049.71.112 1.429-.067 2.048-.688 3.079-3.083 4.192-5.444 4.556-6.987.183-.771.18-1.345.138-1.713a3 3 0 0 0-.045-.283 3 3 0 0 0-.3-.041Z"/>
    <path d="M7.009 12.139a7.6 7.6 0 0 1-1.804-1.352A7.6 7.6 0 0 1 3.794 8.86c-1.102.992-1.965 5.054-1.839 5.18.125.126 3.936-.896 5.054-1.902Z"/>
  </svg>`,

    `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#765EED" class="bi bi-stars" viewBox="0 0 16 16" style="font-size: 1.1em; vertical-align: -0.15em; margin-left: 6px;">
    <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.73 1.73 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.73 1.73 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.73 1.73 0 0 0 3.407 2.31zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z"/>
  </svg>`,

    `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#765EED" class="bi bi-flower2" viewBox="0 0 16 16" style="font-size: 1.1em; vertical-align: -0.15em; margin-left: 6px;">
    <path d="M8 16a4 4 0 0 0 4-4 4 4 0 0 0 0-8 4 4 0 0 0-8 0 4 4 0 1 0 0 8 4 4 0 0 0 4 4m3-12q0 .11-.03.247c-.544.241-1.091.638-1.598 1.084A3 3 0 0 0 8 5c-.494 0-.96.12-1.372.331-.507-.446-1.054-.843-1.597-1.084A1 1 0 0 1 5 4a3 3 0 0 1 6 0m-.812 6.052A3 3 0 0 0 11 8a3 3 0 0 0-.812-2.052c.215-.18.432-.346.647-.487C11.34 5.131 11.732 5 12 5a3 3 0 1 1 0 6c-.268 0-.66-.13-1.165-.461a7 7 0 0 1-.647-.487m-3.56.617a3 3 0 0 0 2.744 0c.507.446 1.054.842 1.598 1.084q.03.137.03.247a3 3 0 1 1-6 0q0-.11.03-.247c.544-.242 1.091-.638 1.598-1.084m-.816-4.721A3 3 0 0 0 5 8c0 .794.308 1.516.812 2.052a7 7 0 0 1-.647.487C4.66 10.869 4.268 11 4 11a3 3 0 0 1 0-6c.268 0 .66.13 1.165.461.215.141.432.306.647.487M8 9a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
  </svg>`,
  ];

  const randomIndex = Math.floor(Math.random() * iconList.length);
  iconContainer.innerHTML = iconList[randomIndex];
};

updateGreetingmessage();
updateRandomIcon();

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
