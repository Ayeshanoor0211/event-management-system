
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { cancelRegistration } from "../features/registrations/registrationsSlice";

function MyEvents() {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.auth.currentUser);
  const registrations = useSelector(
    (state) => state.registrations.registrations
  );

  // Get only current user's registered events
  const myEvents = registrations.filter(
    (registration) => registration.userId === currentUser?.id
  );

  const today = new Date().toISOString().split("T")[0];

  // Upcoming events
  const upcomingEvents = myEvents.filter(
    (registration) =>
      registration.event.dates?.start?.localDate >= today
  );

  // Completed events
  const completedEvents = myEvents.filter(
    (registration) =>
      registration.event.dates?.start?.localDate < today
  );

  // Cancel registration
  function handleCancel(eventId) {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this registration?"
    );

    if (confirmCancel) {
      dispatch(
        cancelRegistration({
          userId: currentUser.id,
          eventId: eventId,
        })
      );
    }
  }

  // Reusable event card
  function showEvent(registration, canCancel) {
    const event = registration.event;

    return (
      <div className="event-card" key={event.id}>
        {event.images && event.images.length > 0 && (
          <img src={event.images[0].url} alt={event.name} />
        )}

        <h3>{event.name}</h3>

        <p>
          Date: {event.dates?.start?.localDate || "Not available"}
        </p>

        <p>
          Category: {event.classifications?.[0]?.segment?.name || "Other"}
        </p>

        <Link to={`/events/${event.id}`}>View Details</Link>

        {canCancel && (
          <div>
            <button onClick={() => handleCancel(event.id)}>
              Cancel Registration
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <h1>My Events</h1>

      {myEvents.length === 0 && (
        <p>You have not registered for any events yet.</p>
      )}

      <h2>Upcoming Events ({upcomingEvents.length})</h2>

      {upcomingEvents.length === 0 && (
        <p>No upcoming registered events.</p>
      )}

      <div className="events-container">
        {upcomingEvents.map((registration) =>
          showEvent(registration, true)
        )}
      </div>

      <h2>Completed Events ({completedEvents.length})</h2>

      {completedEvents.length === 0 && (
        <p>No completed events.</p>
      )}

      <div className="events-container">
        {completedEvents.map((registration) =>
          showEvent(registration, false)
        )}
      </div>
    </div>
  );
}

export default MyEvents;
