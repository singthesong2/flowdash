// 0711 조민호 검색/기간/우선순위/정렬 필터 시작
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector("#todo-search-input");

  const periodSelect = document.querySelector("#period-select");
  const prioritySelect = document.querySelector("#priority-select");
  const sortButton = document.querySelector("#sort-toggle-btn");

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
    !sortButton ||
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
    const sortValue = sortButton.dataset.sort;
    if (periodValue === "전체 기간") {
      periodChipText.textContent = "전체";
    } else {
      periodChipText.textContent = periodValue;
    }

    if (sortValue === "desc") {
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
    const sortValue = sortButton.dataset.sort;

    const boardLists = document.querySelectorAll(
      ".todo-items, .in-progress-items, .done-items",
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

        if (sortValue === "desc") {
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
  sortButton.addEventListener("click", () => {
    if (sortButton.dataset.sort === "asc") {
      sortButton.dataset.sort = "desc";
      sortButton.textContent = "정렬: 내림차순 ↓";
    } else {
      sortButton.dataset.sort = "asc";
      sortButton.textContent = "정렬: 오름차순 ↑";
    }

    handleFilterChange();
  });

  handleFilterChange();
});
// 0711 조민호 검색/기간/우선순위/정렬 필터 끝
