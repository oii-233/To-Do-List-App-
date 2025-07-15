
const taskInput = document.getElementById("task-input");
const listBox = document.querySelector(".lists");
function forAdd() {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;
    createTaskElement(taskText, false);
    saveTasks();
    taskInput.value = "";
}
function createTaskElement(text, completed) {
    const li = document.createElement("li");
    li.classList.add("task-item");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = completed;

    const span = document.createElement("span");
    span.textContent = text;
    span.style.flex = "1";
    span.style.marginLeft = "10px";
    if (completed) {
        span.style.textDecoration = "line-through";
    }

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "❌";

  
    checkbox.addEventListener("change", () => {
        span.style.textDecoration = checkbox.checked ? "line-through" : "none";
        saveTasks();
    });

   
    removeBtn.addEventListener("click", () => {
        li.remove();
        saveTasks();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(removeBtn);
    listBox.appendChild(li);
}
function saveTasks() {
    const tasks = [];
    const allListItems = listBox.querySelectorAll("li");

    allListItems.forEach(function(li) {
        const text = li.querySelector("span").textContent;
        const completed = li.querySelector("input").checked;
        tasks.push({ text: text, completed: completed });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

window.onload = function () {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(function(task) {
        createTaskElement(task.text, task.completed);
    });
};
