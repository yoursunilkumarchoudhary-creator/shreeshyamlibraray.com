let students = JSON.parse(localStorage.getItem("students")) || [];

function saveData() {
  localStorage.setItem("students", JSON.stringify(students));
}

function addStudent() {
  let name = document.getElementById("name").value;
  let contact = document.getElementById("contact").value;
  let date = document.getElementById("date").value;

  if (!name || !contact || !date) {
    alert("Fill all fields");
    return;
  }

  students.push({
    name,
    contact,
    date,
    attendance: "Not Marked"
  });

  saveData();
  displayStudents();
}

function markAttendance(index) {
  let status = students[index].attendance;

  if (status === "Present") {
    students[index].attendance = "Absent";
  } else {
    students[index].attendance = "Present";
  }

  saveData();
  displayStudents();
}

function calculateDaysLeft(joinDate) {
  let join = new Date(joinDate);
  let today = new Date();
  let diff = Math.floor((today - join) / (1000 * 60 * 60 * 24));
  return 30 - diff;
}

function displayStudents() {
  let table = document.getElementById("tableBody");
  table.innerHTML = "";

  students.forEach((s, index) => {
    let daysLeft = calculateDaysLeft(s.date);

    table.innerHTML += `
      <tr>
        <td>${s.name}</td>
        <td>${s.contact}</td>
        <td>${s.date}</td>
        <td>${daysLeft}</td>
        <td>${daysLeft > 0 ? "Active" : "Expired"}</td>
        <td>
          <button onclick="markAttendance(${index})">Mark</button>
          <div class="${s.attendance === 'Present' ? 'present' : 'absent'}">
            ${s.attendance}
          </div>
        </td>
      </tr>
    `;
  });
}

displayStudents();
