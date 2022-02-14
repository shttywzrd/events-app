import { Fragment } from "react";
import EventSummary from "../../components/event-detail/EventSummary";
import EventLogistics from "../../components/event-detail/EventLogistics";
import EventContent from "../../components/event-detail/EventContent";
import ErrorAlert from "../../components/ui/ErrorAlert";
import Button from "../../components/ui/Button";
import Head from "next/head";
import Comments from "../../components/input/Comments";
import { getAllEvents, getEventById } from "../../lib/mongodb";

function EventDetailsPage({ event }) {
  if (!event) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No event found!</p>
        </ErrorAlert>
        <div className="center">
          <Button link={"/events/"}>Show All Events</Button>
        </div>
      </Fragment>
    );
  }
  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        month={event.month}
        country={event.country}
        state={event.state}
        city={event.city}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id} />
    </Fragment>
  );
}
export default EventDetailsPage;

export async function getStaticProps(context) {
  const eventId = context.params.id;
  const selectedEvent = await getEventById(eventId);
  return {
    props: {
      event: selectedEvent,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const allEvents = await getAllEvents();
  const eventsPaths = allEvents.map((event) => ({
    params: {
      id: event.id,
    },
  }));
  return { paths: eventsPaths, fallback: false };
}
