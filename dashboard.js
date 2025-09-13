// Dashboard JS: load users/events and CRUD
document.addEventListener("DOMContentLoaded", () => {
  loadUsers();
  loadEvents();
});

// Load Users table
function loadUsers() {
  fetch("/users")
    .then(res => res.json())
    .then(users => {
      const tbody = document.getElementById("users-table-body");
      if (!tbody) return;
      tbody.innerHTML = users.map(u => `
        <tr>
          <td>${u.id}</td>
          <td>${u.username}</td>
          <td>${u.email}</td>
          <td>
            <button class="btn-edit" onclick="editUser(${u.id})">Edit</button>
            <button class="btn-delete" onclick="deleteUser(${u.id})">Delete</button>
          </td>
        </tr>
      `).join("");
    })
    .catch(err => console.error(err));
}

// Load Events table
function loadEvents() {
  fetch("/events")
    .then(res => res.json())
    .then(events => {
      const tbody = document.getElementById("events-table-body");
      if (!tbody) return;
      tbody.innerHTML = events.map(e => `
        <tr>
          <td>${e.id}</td>
          <td>${e.name}</td>
          <td>${e.date}</td>
          <td>${e.location}</td>
          <td>
            <button class="btn-edit" onclick="editEvent(${e.id})">Edit</button>
            <button class="btn-delete" onclick="deleteEvent(${e.id})">Delete</button>
          </td>
        </tr>
      `).join("");
    })
    .catch(err => console.error(err));
}

// Placeholder functions (to connect with backend later)
function editUser(id){ alert("Edit user "+id); }
function deleteUser(id){ alert("Delete user "+id); }
function editEvent(id){ alert("Edit event "+id); }
function deleteEvent(id){ alert("Delete event "+id); }
