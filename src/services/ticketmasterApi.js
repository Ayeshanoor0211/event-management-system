const API_KEY = import.meta.env.VITE_TICKETMASTER_API_KEY;

export async function getEvents(keyword = "", category = "All") {
  const today = new Date().toISOString().split("T")[0];

  let url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${API_KEY}&size=20&startDateTime=${today}T00:00:00Z&sort=date,asc`;

  // Search by event name
  if (keyword.trim() !== "") {
    url += `&keyword=${encodeURIComponent(keyword.trim())}`;
  }

  // Filter by category
  if (category !== "All") {
    url += `&classificationName=${encodeURIComponent(category)}`;
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }

  const data = await response.json();

  return data._embedded?.events || [];
}

// Get details of one event
export async function getEventDetails(eventId) {
  const url = `https://app.ticketmaster.com/discovery/v2/events/${encodeURIComponent(eventId)}.json?apikey=${API_KEY}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch event details");
  }

  return await response.json();
}