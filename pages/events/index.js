import EventList from "../../components/events/EventList";
import EventSearch from "../../components/events/EventSearch";
import { getAllEvents } from "../../helpers/api-util";
import { useRouter } from "next/router";
import Head from "next/head";

function EventsPage(props) {
  const router = useRouter();

  function searchEventsHandler(year, month) {
    const fullPath = `events/${year}/${month}`;
    router.push(fullPath, undefined, { shallow: true });
  }

  return (
    <div>
      <Head>
        <title>All Events</title>
        <meta
          name="description"
          content="Find a lot of great events to visit..."
        />
      </Head>
      <EventSearch onSearch={searchEventsHandler} />
      <EventList events={props.events} />
    </div>
  );
}

export default EventsPage;

export async function getStaticProps() {
  const allEvents = await getAllEvents();
  return { props: { events: allEvents }, revalidate: 60 };
}
