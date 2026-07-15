/* 0714 정우석 커스텀 드롭다운 시작 */

const customDropdown = document.querySelector("#custom-period-dropdown");
if (customDropdown) {
  const trigger = customDropdown.querySelector(".dropdown-trigger");
  const menu = customDropdown.querySelector(".dropdown-menu");
  const realSelect = document.querySelector("#period-select");

  trigger.addEventListener("click", (e) => {
    e.stopPropagation();

    if (
      typeof customPriorityDropdown !== "undefined" &&
      customPriorityDropdown
    ) {
      customPriorityDropdown.classList.remove("is-active");
    }

    customDropdown.classList.toggle("is-active");
  });

  menu.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (!li) return;

    const selectedValue = li.dataset.value;
    trigger.textContent = selectedValue;

    const firstLi = menu.firstElementChild;
    if (selectedValue === "전체 기간") {
      if (firstLi) firstLi.style.display = "none";
    } else {
      if (firstLi) firstLi.style.display = "block";
    }

    if (realSelect) {
      realSelect.value = selectedValue;
      realSelect.dispatchEvent(new Event("change"));
    }
    customDropdown.classList.remove("is-active");
  });
}

const customPriorityDropdown = document.querySelector(
  "#custom-priority-dropdown",
);
if (customPriorityDropdown) {
  const trigger = customPriorityDropdown.querySelector(".dropdown-trigger");
  const menu = customPriorityDropdown.querySelector(".dropdown-menu");
  const realPrioritySelect = document.querySelector("#priority-select");

  trigger.addEventListener("click", (e) => {
    e.stopPropagation();

    if (customDropdown) {
      customDropdown.classList.remove("is-active");
    }

    customPriorityDropdown.classList.toggle("is-active");
  });

  menu.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (!li) return;

    const selectedValue = li.dataset.value;
    trigger.textContent = selectedValue;

    const firstLi = menu.firstElementChild;
    if (selectedValue === "전체 우선순위") {
      if (firstLi) firstLi.style.display = "none";
    } else {
      if (firstLi) firstLi.style.display = "block";
    }

    if (realPrioritySelect) {
      realPrioritySelect.value = selectedValue;
      realPrioritySelect.dispatchEvent(new Event("change"));
    }
    customPriorityDropdown.classList.remove("is-active");
  });
}

document.addEventListener("click", () => {
  if (customDropdown) customDropdown.classList.remove("is-active");
  if (customPriorityDropdown)
    customPriorityDropdown.classList.remove("is-active");
});
/* 0714 정우석 커스텀 드롭다운 끝 */
