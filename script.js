let users = [];

function addUser() {
  let name = document.getElementById("name").value;
  let joinDate = document.getElementById("joinDate").value;

  if (!name || !joinDate) {
    alert("Fill all fields");
    return;
  }

  users.push({
    name,
    joinDate,
    attendance: []
  });

  display();
}

function getDaysLeft(joinDate) {
  let join = new Date(joinDate);
  let now = new Date();

  let nextMonth = new Date(join);
  nextMonth.setMonth(join.getMonth() + 1);

  let diff = Math.ceil((nextMonth - now) / (1000 * 60 * 60 * 24));
  return diff;
}

function markAttendance(index) {
  let today = new Date().toDateString();

  if (!users[index].attendance.includes(today)) {
    users[index].attendance.push(today);
    display();
  }
}

function display() {
  let list = document.getElementById("list");
  list.innerHTML = "";

  users.forEach((u, i) => {
    let daysLeft = getDaysLeft(u.joinDate);

    let status = "";
    let className = "";

    if (daysLeft <= 3) {
      status = "Fee Due";
      className = "red";
    } else {
      status = "Active";
      className = "green";
    }

    list.innerHTML += `
      <tr class="${className}">
        <td>${u.name}</td>
        <td>${u.joinDate}</td>
        <td>${daysLeft}</td>
        <td>${status}</td>
        <td>
          <button onclick="markAttendance(${i})">Mark</button>
          (${u.attendance.length})
        </td>
      </tr>
    `;
  });
}
