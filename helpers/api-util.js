export async function getAllEvents() {
  const res = await fetch(
    "https://events-app-43910-default-rtdb.europe-west1.firebasedatabase.app/events.json"
  );
  const data = await res.json();
  const events = [];

  for (const key in data) {
    events.push({ ...data[key] });
  }

  return events;
}

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
}

export async function getEventById(id) {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
}

export async function getFilteredEvents(dateFilter) {
  const allEvents = await getAllEvents();

  const { year, month } = dateFilter;
  return allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });
}
