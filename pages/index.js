import EventList from "../components/events/EventList";
import Title from "../components/ui/Title";
import { getFeaturedEvents } from "../lib/mongodb";
import Head from "next/head";
import NewsletterRegistration from "../components/input/NewsletterRegistration";

function HomePage(props) {
  return (
    <div>
      <Head>
        <title>EventsApp</title>
        <meta
          name="description"
          content="Find a lot of great events to visit..."
        />
      </Head>
      <div>
        <Title>Featured Events</Title>
      </div>
      <EventList events={props.events} />
      <NewsletterRegistration />
    </div>
  );
}

export default HomePage;

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  };
}
