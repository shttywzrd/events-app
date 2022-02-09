import { Fragment } from "react";
import EventSummary from "../../components/event-detail/EventSummary";
import EventLogistics from "../../components/event-detail/EventLogistics";
import EventContent from "../../components/event-detail/EventContent";
import ErrorAlert from "../../components/ui/ErrorAlert";
import ButtonA from "../../components/ui/ButtonA";
import { getAllEvents, getEventById } from "../../helpers/api-util";
import Head from "next/head";
import Comments from "../../components/input/Comments";

function EventDetailsPage(props) {
  const { event } = props;

  if (!event) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No event found!</p>
        </ErrorAlert>
        <div className="center">
          <ButtonA link={"/events/"}>Show All Events</ButtonA>
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
        date={event.date}
        address={event.location}
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

export async function getStaticPaths(context) {
  const allEvents = await getAllEvents();
  const eventsPaths = allEvents.map((event) => ({
    params: {
      id: event.id,
    },
  }));

  return { paths: eventsPaths, fallback: false };
}
