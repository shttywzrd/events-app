import EventItem from "./EventItem";
import styles from "./EventList.module.css";

function EventList(props) {
  return (
    <ul className={styles.list}>
      {props.events.map((event) => (
        <EventItem
          key={event.id}
          id={event.id}
          title={event.title}
          country={event.country === "USA" ? event.state : event.country}
          city={event.city}
          month={event.month}
          image={event.image}
        />
      ))}
    </ul>
  );
}

export default EventList;
