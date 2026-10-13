
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getEvents } from "../services/ticketmasterApi";
import {
  setLoading,
  setEvents,
  setError
} from "../features/events/eventsSlice";

function Events() {
  const dispatch = useDispatch();

  // Get events from Redux
  const events = useSelector((state) => state.events.events);
  const loading = useSelector((state) => state.events.loading);
  const error = useSelector((state) => state.events.error);

  // Search and category
  const [search, setSearch] = useState("");
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("All");

  // Fetch events from Ticketmaster API
  useEffect(() => {
    async function loadEvents() {
      dispatch(setLoading());

      try {
        const data = await getEvents(keyword, category);
        dispatch(setEvents(data));
      } catch (error) {
        dispatch(setError(error.message));
      }
    }

    loadEvents();
  }, [dispatch, keyword, category]);

  // Search button
  function handleSearch(e) {
    e.preventDefault();
    setKeyword(search);
  }

  // Clear search and filters
  function clearSearch() {
    setSearch("");
    setKeyword("");
    setCategory("All");
  }

  return (
    <div>
      <h1>Explore Events</h1>

      {/* Search Bar */}
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button type="submit">Search</button>

        <button type="button" onClick={clearSearch}>
          Clear
        </button>
      </form>

      {/* Category Filter */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="All">All Categories</option>
        <option value="Music">Music</option>
        <option value="Sports">Sports</option>
        <option value="Arts & Theatre">Arts & Theatre</option>
        <option value="Family">Family</option>
      </select>

      {/* Loading and Error */}
      {loading && <p>Loading events...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && events.length === 0 && (
        <p>No events found.</p>
      )}

      {/* Event Cards */}
      {!loading && !error && (
        <div className="events-container">
          {events.map((event) => (
            <div className="event-card" key={event.id}>

              {event.images && event.images.length > 0 && (
                <img
                  src={event.images[0].url}
                  alt={event.name}
                />
              )}

              <h3>{event.name}</h3>

              <p>
                Date: {event.dates?.start?.localDate || "Not available"}
              </p>

              <p>
                Category: {
                  event.classifications?.[0]?.segment?.name || "Other"
                }
              </p>

              <Link to={`/events/${event.id}`}>
                View Details
              </Link>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Events;
