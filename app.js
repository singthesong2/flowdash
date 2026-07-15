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

// 0715 조민호 새 할 일/수정 모달 애니메이션 시작

const closeTodoModal = (afterClose) => {
  if (!todoModal) return;

  if (!todoModal.open) {
    if (afterClose) afterClose();
    return;
  }

  const handleAnimation = (e) => {
    if (e.target !== todoModal) return;

    todoModal.classList.remove("closing");
    todoModal.close();

    if (afterClose) {
      afterClose();
    }

    todoModal.removeEventListener("animationend", handleAnimation);
  };

  todoModal.addEventListener("animationend", handleAnimation);

  todoModal.classList.add("closing");
};

// 0715 조민호 새 할 일/수정 모달 애니메이션 끝   // 7/15 최우원 트랜지션으로 변경

// 0714 조민호 삭제 확인 모달 시작
const deleteModal = document.querySelector(".delete-dial");
const deleteModalTitle = document.querySelector("#delete-modal-title");
const deleteModalMessage = document.querySelector("#delete-modal-message");
const deleteCancelBtn = document.querySelector(".delete-cancel-btn");
const deleteConfirmBtn = document.querySelector(".delete-confirm-btn");

let deleteMode = "";
let deleteTargetCard = null;
let deleteTargetItems = null;
let deleteTargetCount = null;
let deleteTargetEmpty = null;

const closeDeleteModal = () => {
  if (!deleteModal?.open) return;

  const handleTransition = () => {
    deleteModal.close();
    deleteModal.classList.remove("closing");
    deleteModal.removeEventListener("animationend", handleTransition);
  };

  deleteModal.classList.add("closing");
  deleteModal.addEventListener("animationend", handleTransition);
};
// 0714 조민호 삭제 확인 모달 끝  // 7/15 최우원 트랜지션으로 변경

const todoList = document.querySelector(".todo-list");
const inProgressList = document.querySelector(".in-progress-list");
const doneList = document.querySelector(".done-list");
const todoCount = document.querySelector(".todo-count");
const inProgressCount = document.querySelector(".in-progress-count");
const doneCount = document.querySelector(".done-count");
const statTotal = document.querySelector("#stat-total");
const statTodo = document.querySelector("#stat-todo");
const statDoing = document.querySelector("#stat-doing");
const statDone = document.querySelector("#stat-done");
const statAchievement = document.querySelector("#stat-achievement");
const todoItems = document.querySelector(".todo-items");
const inProgressItems = document.querySelector(".in-progress-items");
const doneItems = document.querySelector(".done-items");
const todoEmpty = document.querySelector(".todo-list .hidden-message");
const inProgressEmpty = document.querySelector(
  ".in-progress-list .hidden-message",
);
const doneEmpty = document.querySelector(".done-list .hidden-message");

// 0712 정현우 에러메세지 추가
const addForm = document.querySelector(".add-dial");
const titleInput = document.querySelector(".title-input");
const titleError = document.getElementById("title-error");

if (openModalBtns.length > 0 && todoModal && todoForm) {
  openModalBtns.forEach((btn) => {
    btn.onclick = () => {
      modifyCard = null;

      todoForm.reset();

      const titleError = todoForm.querySelector("#title-error");
      if (titleError) {
        titleError.style.display = "none";
      }

      todoModal.classList.remove("closing");

      if (!todoModal.open) {
        todoModal.showModal();
      }
    };
  });
}
if (closeModalBtn && todoModal && todoForm) {
  closeModalBtn.onclick = (e) => {
    e.preventDefault();

    closeTodoModal(() => {
      todoForm.reset();
      modifyCard = null;

      const titleError = todoForm.querySelector("#title-error");
      if (titleError) {
        titleError.style.display = "none";
      }
    });
  };
}

// 7/11 개별삭제 구현 시작
const DeleteData = (items, count, empty) => {
  items.addEventListener("click", (e) => {
    if (!e.target.classList.contains("todo_card_delete")) return;

    deleteMode = "single";
    deleteTargetCard = e.target.closest(".todo-card");
    deleteTargetItems = items;
    deleteTargetCount = count;
    deleteTargetEmpty = empty;

    deleteModalTitle.textContent = "할 일 삭제";
    deleteModalMessage.innerHTML =
      "이 할 일을 정말로 삭제하시겠습니까?<br />삭제한 할 일은 복구할 수 없습니다.";

    deleteModal.showModal();
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

  const todoNum = todoItems.children.length;
  const doingNum = inProgressItems.children.length;
  const doneNum = doneItems.children.length;
  const totalNum = todoNum + doingNum + doneNum;

  const achievementNum =
    totalNum === 0 ? 0 : Math.round((doneNum / totalNum) * 100);

  const statTotal = document.querySelector("#stat-total");
  const statTodo = document.querySelector("#stat-todo");
  const statDoing = document.querySelector("#stat-doing");
  const statDone = document.querySelector("#stat-done");
  const statAchievement = document.querySelector("#stat-achievement");

  if (statTotal) {
    statTotal.textContent = totalNum;
  }

  if (statTodo) {
    statTodo.textContent = todoNum;
  }

  if (statDoing) {
    statDoing.textContent = doingNum;
  }

  if (statDone) {
    statDone.textContent = doneNum;
  }

  if (statAchievement) {
    statAchievement.textContent = `${achievementNum}%`;
  }
};

allDeleteData.addEventListener("click", () => {
  deleteMode = "all";
  deleteModalTitle.textContent = "전체 데이터 초기화";
  deleteModalMessage.innerHTML =
    "모든 할 일을 정말로 삭제하시겠습니까?<br />삭제한 데이터는 복구할 수 없습니다.";

  deleteModal.showModal();
});

// 7/11 새벽, 전체 삭제 및 완료된일 없음 메세지 처리 끝

// 0714 조민호 삭제 확인 모달 버튼 기능 시작
if (deleteModal && deleteCancelBtn && deleteConfirmBtn) {
  deleteCancelBtn.addEventListener("click", () => {
    closeDeleteModal();

    deleteMode = "";
    deleteTargetCard = null;
    deleteTargetItems = null;
    deleteTargetCount = null;
    deleteTargetEmpty = null;
  });

  deleteConfirmBtn.addEventListener("click", () => {
    if (deleteMode === "single" && deleteTargetCard) {
      deleteTargetCard.remove();

      updateHiddenMsg(deleteTargetItems, deleteTargetCount, deleteTargetEmpty);
    }

    if (deleteMode === "all") {
      document.querySelectorAll(".todo-card").forEach((card) => {
        card.remove();
      });

      todoItems.replaceChildren();
      inProgressItems.replaceChildren();
      doneItems.replaceChildren();

      updateHiddenMsg(todoItems, todoCount, todoEmpty);
      updateHiddenMsg(inProgressItems, inProgressCount, inProgressEmpty);
      updateHiddenMsg(doneItems, doneCount, doneEmpty);

      const searchInput = document.querySelector("#todo-search-input");
      const periodSelect = document.querySelector("#period-select");
      const prioritySelect = document.querySelector("#priority-select");
      const sortButton = document.querySelector("#sort-toggle-btn");

      if (searchInput) {
        searchInput.value = "";
      }

      if (periodSelect) {
        periodSelect.value = "전체 기간";
      }

      if (prioritySelect) {
        prioritySelect.value = "전체 우선순위";
      }

      if (sortButton) {
        sortButton.dataset.sort = "asc";
        sortButton.textContent = "정렬: 오름차순 ↑";
      }

      if (searchInput) {
        searchInput.dispatchEvent(new Event("input"));
      }
    }

    closeDeleteModal();

    deleteMode = "";
    deleteTargetCard = null;
    deleteTargetItems = null;
    deleteTargetCount = null;
    deleteTargetEmpty = null;
  });
}

// 0714 조민호 삭제 확인 모달 버튼 기능 끝
// 7/11 새벽, 전체 삭제 및 완료된일 없음 메세지 처리 끝

// 7/13 개별 todo 클릭시 수정 시작
let modifyCard = null;

if (todoForm) {
  todoForm.onsubmit = (e) => {
    e.preventDefault();
    todoForm.classList.add("add-willchange");
    const template = document.querySelector(".todo-template");

    const titleInput = todoForm.querySelector(".title-input");
    const textInput = todoForm.querySelector(".content-input");
    const dateInput = todoForm.querySelector(".date-input");
    /*const prioSelect = todoForm.querySelector(
        ".radio-group input[value]:checked",
      );*/
    const statusSelect = todoForm.querySelector(".status-dial select");

    const radioHigh = todoForm.querySelector("#prio-high");
    const radioMid = todoForm.querySelector("#prio-mid");

    let prioValue = "낮음";
    if (radioHigh && radioHigh.checked) {
      prioValue = "높음";
    } else if (radioMid && radioMid.checked) {
      prioValue = "중간";
    }

    const titleValue = titleInput ? titleInput.value.trim() : "";
    const textValue = textInput ? textInput.value.trim() : "";
    const dateValue = dateInput ? dateInput.value : "";
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

    if (modifyCard) {
      const now = new Date();

      const modifyDate = `${now.getFullYear()}-${String(
        now.getMonth() + 1,
      ).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

      const modifyTime = `${String(now.getHours()).padStart(2, "0")}:${String(
        now.getMinutes(),
      ).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;

      modifyCard.querySelector(".todo-card__title-text").textContent =
        titleValue;

      modifyCard.querySelector(".todo-card__content-text").textContent =
        textValue;

      modifyCard.querySelector(".todo-card__date-text").textContent =
        dateValue || "기한 없음";

      /*modifyCard.querySelector(".todo-card__time").textContent = timeValue;*/

      const priority = modifyCard.querySelector(".todo-card__priority");
      const modify = modifyCard.querySelector(".todo-card__modify");

      priority.classList.remove(
        "todo-card__priority_low",
        "todo-card__priority_medium",
        "todo-card__priority_high",
      );

      priority.textContent = prioValue;

      if (prioValue === "낮음") {
        priority.classList.add("todo-card__priority_low");
      } else if (prioValue === "중간") {
        priority.classList.add("todo-card__priority_medium");
      } else {
        priority.classList.add("todo-card__priority_high");
      }

      modifyCard.classList.remove("todo-card-deletebackgroundcolor");

      modifyCard
        .querySelector(".todo-card__title-text")
        .classList.remove("todo-card__title-deleteline");

      if (statusValue === "할 일") {
        todoItems.appendChild(modifyCard);

        modify.classList.remove("hidden");
        modifyCard.querySelector(".todo-card__date-text").textContent =
          modifyCard.dataset.originalDate;
        modifyCard.querySelector(".todo-card__time").textContent =
          modifyCard.dataset.originalTime;
      } else if (statusValue === "진행중") {
        inProgressItems.appendChild(modifyCard);

        modify.classList.remove("hidden");
        modifyCard.querySelector(".todo-card__date-text").textContent =
          modifyCard.dataset.originalDate;

        modifyCard.querySelector(".todo-card__time").textContent =
          modifyCard.dataset.originalTime;
      } else {
        doneItems.appendChild(modifyCard);

        modifyCard.classList.add("todo-card-deletebackgroundcolor");

        modifyCard
          .querySelector(".todo-card__title-text")
          .classList.add("todo-card__title-deleteline");

        modifyCard.querySelector(".todo-card__date-text").textContent =
          modifyDate;
        modifyCard.querySelector(".todo-card__time").textContent = modifyTime;

        modify.classList.add("hidden");
      }

      modify.querySelector(".todo-card__modify-date-text").textContent =
        modifyDate;

      modify.querySelector(".todo-card__modify-time").textContent = modifyTime;
      // 7/14 최우원 완료로 변경시, 완료시점으로 시간 변경 그리고 다시 수정때 다시 마감일과 수정시간 출력 끝

      updateHiddenMsg(todoItems, todoCount, todoEmpty);
      updateHiddenMsg(inProgressItems, inProgressCount, inProgressEmpty);
      updateHiddenMsg(doneItems, doneCount, doneEmpty);

      modifyCard = null;
    } else {
      const newCard = template.content.firstElementChild.cloneNode(true);

      // 7/14 최우원 시간 변경위한 시간 저장 데이터 시작
      newCard.dataset.originalDate = dateValue || "기한 없음";
      newCard.dataset.originalTime = timeValue;
      // 7/14 최우원 시간 변경위한 시간 저장 데이터 끝

      newCard.addEventListener("click", (e) => {
        if (e.target.closest(".todo_card_delete")) return;
        modifyCard = newCard;

        titleInput.value = modifyCard.querySelector(
          ".todo-card__title-text",
        ).textContent;

        textInput.value = modifyCard.querySelector(
          ".todo-card__content-text",
        ).textContent;

        const date = modifyCard.querySelector(
          ".todo-card__date-text",
        ).textContent;

        dateInput.value = date === "기한 없음" ? "" : date;

        const cardPrio = modifyCard
          .querySelector(".todo-card__priority")
          .textContent.trim();

        if (cardPrio.includes("낮음")) {
          const radioLow = todoForm.querySelector("#prio-low");
          if (radioLow) radioLow.checked = true;
        } else if (cardPrio.includes("중간")) {
          const radioMid = todoForm.querySelector("#prio-mid");
          if (radioMid) radioMid.checked = true;
        } else if (cardPrio.includes("높음")) {
          const radioHigh = todoForm.querySelector("#prio-high");
          if (radioHigh) radioHigh.checked = true;
        }

        if (modifyCard.parentElement === todoItems) {
          statusSelect.value = "할 일";
        } else if (modifyCard.parentElement === inProgressItems) {
          statusSelect.value = "진행중";
        } else {
          statusSelect.value = "완료";
        }

        todoModal.classList.remove("closing");

        if (!todoModal.open) {
          todoModal.showModal();
        }
      });

      newCard.querySelector(".todo-card__title-text").textContent = titleValue;
      newCard.querySelector(".todo-card__content-text").textContent = textValue;
      newCard.querySelector(".todo-card__date-text").textContent =
        dateValue || "기한 없음";
      newCard.querySelector(".todo-card__time").textContent = timeValue;

      const priority = newCard.querySelector(".todo-card__priority");
      priority.textContent = `${prioValue}`;

      if (prioValue === "낮음") {
        priority.classList.add("todo-card__priority_low");
      }
      if (prioValue === "중간") {
        priority.classList.add("todo-card__priority_medium");
      }
      if (prioValue === "높음") {
        priority.classList.add("todo-card__priority_high");
      }

      if (statusValue === "할 일") {
        document.querySelector(".todo-items").appendChild(newCard);
        updateHiddenMsg(todoItems, todoCount, todoEmpty);
      } else if (statusValue === "진행중") {
        document.querySelector(".in-progress-items").appendChild(newCard);
        updateHiddenMsg(inProgressItems, inProgressCount, inProgressEmpty);
      } else {
        document.querySelector(".done-items").appendChild(newCard);
        // 7/13 새벽, 완료된 할일 배경색 및 폰트 색상 변경 시작
        newCard.classList.add("todo-card-deletebackgroundcolor");
        newCard
          .querySelector(".todo-card__title-text")
          .classList.add("todo-card__title-deleteline");
        // 7/13 새벽, 완료된 할일 배경색 및 폰트 색상 변경 끝
        updateHiddenMsg(doneItems, doneCount, doneEmpty);
      }
    }
    const searchInputForUpdate = document.querySelector("#todo-search-input");

    if (searchInputForUpdate) {
      searchInputForUpdate.dispatchEvent(new Event("input"));
    }

    modifyCard = null;

    closeTodoModal(() => {
      todoForm.reset();
    });
  };
}
// 7/13 개별 todo 클릭시 수정 끝
