/* ===================================
   NAVIGATION
=================================== */

function goAdmin() {
    window.location.href = "admin.html";
}

function goUser() {
    window.location.href = "user.html";
}

function logout() {
    window.location.href = "index.html";
}

/* ===================================
   USER STORAGE
=================================== */

let users =
JSON.parse(localStorage.getItem("users")) || [
    "Ali Ahmad",
    "Siti Nur",
    "John Tan",
    "Aina Abdullah",
    "Faris Hakim"
];

/* ===================================
   TASK STORAGE
=================================== */

let tasks =
JSON.parse(localStorage.getItem("tasks")) || [];

/* ===================================
   USER DASHBOARD
=================================== */

if (document.getElementById("taskList")) {
    loadTasks();
}

function addTask() {

    const title =
    document.getElementById("taskInput").value;

    const date =
    document.getElementById("taskDate").value;

    if (title.trim() === "") {
        alert("Please enter a task.");
        return;
    }

    tasks.push({
        title: title,
        date: date,
        completed: false
    });

    saveTasks();

    document.getElementById("taskInput").value = "";
    document.getElementById("taskDate").value = "";
}

function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

    loadTasks();
}

function loadTasks() {

    const taskList =
    document.getElementById("taskList");

    if (!taskList) return;

    taskList.innerHTML = "";

    let completed = 0;

    tasks.forEach((task, index) => {

        if (task.completed) {
            completed++;
        }

        const statusBadge =
            task.completed
                ? `<span class="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">Completed</span>`
                : `<span class="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">Pending</span>`;

        taskList.innerHTML += `

        <tr class="border-b hover:bg-gray-50">

            <td class="py-4 font-medium">

                ${task.title}

            </td>

            <td>

                ${task.date || "Not Set"}

            </td>

            <td>

                ${statusBadge}

            </td>

            <td class="text-center">

                <button
                onclick="toggleTask(${index})"
                class="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg mr-2">

                    <i class="fa-solid fa-check"></i>

                </button>

                <button
                onclick="editTask(${index})"
                class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg mr-2">

                    <i class="fa-solid fa-pen"></i>

                </button>

                <button
                onclick="deleteTask(${index})"
                class="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </td>

        </tr>

        `;
    });

    const pending =
    tasks.length - completed;

    if (document.getElementById("totalTasks")) {
        document.getElementById("totalTasks").innerText =
        tasks.length;
    }

    if (document.getElementById("completedTasks")) {
        document.getElementById("completedTasks").innerText =
        completed;
    }

    if (document.getElementById("pendingTasks")) {
        document.getElementById("pendingTasks").innerText =
        pending;
    }

    /* Progress Bar */

    const percentage =
        tasks.length === 0
        ? 0
        : Math.round((completed / tasks.length) * 100);

    if (document.getElementById("progressBar")) {

        document.getElementById("progressBar")
        .style.width = percentage + "%";

        document.getElementById("progressText")
        .innerText = percentage + "%";
    }
}

function toggleTask(index) {

    tasks[index].completed =
    !tasks[index].completed;

    saveTasks();
}

function deleteTask(index) {

    if (confirm("Delete this task?")) {

        tasks.splice(index, 1);

        saveTasks();
    }
}

function editTask(index) {

    const updatedTask =
    prompt(
        "Edit Task",
        tasks[index].title
    );

    if (
        updatedTask &&
        updatedTask.trim() !== ""
    ) {

        tasks[index].title =
        updatedTask;

        saveTasks();
    }
}

/* ===================================
   ADMIN DASHBOARD
=================================== */

if (document.getElementById("userList")) {
    loadUsers();
}

function loadUsers() {

    const userList =
    document.getElementById("userList");

    if (!userList) return;

    userList.innerHTML = "";

    users.forEach((user, index) => {

        userList.innerHTML += `

        <tr class="border-b hover:bg-gray-50">

            <td class="py-4">

                <div class="flex items-center gap-3">

                    <div
                    class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600">

                        ${user.charAt(0)}

                    </div>

                    <span class="font-medium">

                        ${user}

                    </span>

                </div>

            </td>

            <td class="text-center">

                <button
                onclick="editUser(${index})"
                class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg mr-2">

                    Edit

                </button>

                <button
                onclick="deleteUser(${index})"
                class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">

                    Delete

                </button>

            </td>

        </tr>

        `;
    });

    document.getElementById("userCount").innerText =
    users.length;

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );
}

function addUser() {

    const username =
    document.getElementById("userInput").value;

    if (username.trim() === "") {

        alert("Please enter a user name.");
        return;
    }

    users.push(username);

    document.getElementById("userInput").value = "";

    loadUsers();
}

function editUser(index) {

    const updatedUser =
    prompt(
        "Edit User Name",
        users[index]
    );

    if (
        updatedUser &&
        updatedUser.trim() !== ""
    ) {

        users[index] =
        updatedUser;

        loadUsers();
    }
}

function deleteUser(index) {

    if (
        confirm(
            "Are you sure you want to delete this user?"
        )
    ) {

        users.splice(index, 1);

        loadUsers();
    }
}