
const API_KEY = import.meta.env.VITE_TICKETMASTER_API_KEY;

// Get events from Ticketmaster
export async function getEvents(keyword = "", category = "All") {
  const allEvents = [];

  // Fetch events from different future periods
  const days = [0, 1, 7, 30];

  const now = new Date();

  // Today's date in local format YYYY-MM-DD
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  const today = `${year}-${month}-${day}`;

  for (let i = 0; i < days.length; i++) {
    const date = new Date();
    date.setUTCDate(date.getUTCDate() + days[i]);

    const startDate = date.toISOString().split(".")[0] + "Z";

    let url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${API_KEY}&size=20&startDateTime=${encodeURIComponent(startDate)}&sort=date,asc`;

    if (keyword.trim() !== "") {
      url += `&keyword=${encodeURIComponent(keyword.trim())}`;
    }

    if (category !== "All") {
      url += `&classificationName=${encodeURIComponent(category)}`;
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    const events = data._embedded?.events || [];

    // Prevent duplicate event IDs
    for (let j = 0; j < events.length; j++) {
      const exists = allEvents.some(
        (event) => event.id === events[j].id
      );

      if (!exists) {
        allEvents.push(events[j]);
      }
    }
  }

  // Remove events from previous dates
  const upcomingEvents = allEvents.filter((event) => {
    const eventDate = event.dates?.start?.localDate;
    const eventTime = event.dates?.start?.dateTime;

    if (!eventDate) {
      return false;
    }

    // Remove yesterday and older events
    if (eventDate < today) {
      return false;
    }

    // For today's events, check exact time if available
    if (eventDate === today && eventTime) {
      return new Date(eventTime) > new Date();
    }

    return true;
  });

  // Sort by event's displayed date and time
  upcomingEvents.sort((a, b) => {
    const dateA = a.dates.start.localDate;
    const dateB = b.dates.start.localDate;

    if (dateA < dateB) return -1;
    if (dateA > dateB) return 1;

    const timeA = a.dates.start.localTime || "23:59:59";
    const timeB = b.dates.start.localTime || "23:59:59";

    return timeA.localeCompare(timeB);
  });

  return upcomingEvents;
}

// Get details of one event
export async function getEventDetails(eventId) {
  const url = `https://app.ticketmaster.com/discovery/v2/events/${encodeURIComponent(eventId)}.json?apikey=${API_KEY}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return await response.json();
}
