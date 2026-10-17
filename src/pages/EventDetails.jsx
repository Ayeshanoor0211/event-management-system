
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getEventDetails } from "../services/ticketmasterApi";
import {
  registerEvent,
  cancelRegistration
} from "../features/registrations/registrationsSlice";

function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.auth.currentUser);
  const registrations = useSelector(
    (state) => state.registrations.registrations
  );

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadEvent() {
      setLoading(true);
      setError("");
      setMessage("");

      try {
        const data = await getEventDetails(id);
        setEvent(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadEvent();
  }, [id]);

  if (loading) {
    return <h2>Loading event details...</h2>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (!event) {
    return <h2>Event not found.</h2>;
  }

  const venue = event._embedded?.venues?.[0];

  const isRegistered = registrations.some(
    (registration) =>
      registration.userId === currentUser?.id &&
      registration.event.id === event.id
  );

  function handleRegister() {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    if (isRegistered) {
      setMessage("You are already registered for this event.");
      return;
    }

    dispatch(
      registerEvent({
        userId: currentUser.id,
        event: event,
      })
    );

    setMessage("Event registration successful!");
  }

  function handleCancel() {
    if (!currentUser) {
      return;
    }

    dispatch(
      cancelRegistration({
        userId: currentUser.id,
        eventId: event.id,
      })
    );

    setMessage("Registration cancelled successfully.");
  }

  return (
    <div className="event-details">
      <Link to="/events">← Back to Events</Link>

      <h1>{event.name}</h1>

      {event.images && event.images.length > 0 && (
        <img
          src={event.images[0].url}
          alt={event.name}
        />
      )}

      <h3>Event Information</h3>

      <p>
        <strong>Date:</strong>{" "}
        {event.dates?.start?.localDate || "Not available"}
      </p>

      <p>
        <strong>Time:</strong>{" "}
        {event.dates?.start?.localTime || "Not available"}
      </p>

      <p>
        <strong>Venue:</strong> {venue?.name || "Not available"}
      </p>

      <p>
        <strong>City:</strong> {venue?.city?.name || "Not available"}
      </p>

      <p>
        <strong>Country:</strong> {venue?.country?.name || "Not available"}
      </p>

      <p>
        <strong>Category:</strong>{" "}
        {event.classifications?.[0]?.segment?.name || "Other"}
      </p>

      {event.info && (
        <p>
          <strong>Description:</strong> {event.info}
        </p>
      )}

      {event.priceRanges && event.priceRanges.length > 0 && (
        <p>
          <strong>Price Range:</strong>{" "}
          {event.priceRanges[0].min} - {event.priceRanges[0].max}{" "}
          {event.priceRanges[0].currency}
        </p>
      )}

      {!currentUser ? (
        <button onClick={handleRegister}>
          Login to Register
        </button>
      ) : isRegistered ? (
        <button onClick={handleCancel}>
          Cancel Registration
        </button>
      ) : (
        <button onClick={handleRegister}>
          Register for Event
        </button>
      )}

      {message && <p>{message}</p>}
    </div>
  );
}

export default EventDetails;
