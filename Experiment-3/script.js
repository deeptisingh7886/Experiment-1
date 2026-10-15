const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }
    // Create a new list item
    const li = document.createElement("li");
    // Create a checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.setAttribute("aria-label", "Mark task as completed");
    // Create task text
    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = taskText;
    // Mark task as completed
    checkbox.addEventListener("change", function () {
        li.classList.toggle("completed", checkbox.checked);
    });
    // Create delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    // Delete task
    deleteBtn.addEventListener("click", function () {
        li.remove();
    });
    // Add elements to the list item
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    // Add task to the webpage
    taskList.appendChild(li);
    // Clear input field
    taskInput.value = "";
    taskInput.focus();
}
// Add task on button click
addBtn.addEventListener("click", addTask);
// Add task when Enter is pressed
taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});
