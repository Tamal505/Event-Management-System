// Fetch all events
function loadEvents() {
  fetch("/events")
    .then(res => res.json())
    .then(events => {
      const container = document.getElementById("events");
      container.innerHTML = events
        .map(e => `<p>${e.name} - ${e.date} - ${e.location}</p>`)
        .join("");
    })
    .catch(err => console.error("Error fetching events:", err));
}

// Add new event
document.getElementById("eventForm").addEventListener("submit", function(e){
  e.preventDefault();
  
  const form = e.target;
  const data = {
    name: form.name.value,
    date: form.date.value,
    location: form.location.value
  };

  fetch("/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(resData => {
    alert(resData.message || "Event added!");
    form.reset();
    loadEvents();
  })
  .catch(err => console.error("Error adding event:", err));
});

// Initial load
loadEvents();

