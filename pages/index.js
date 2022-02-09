import EventList from "../components/events/EventList";
import Title from "../components/ui/Title";
import { getFeaturedEvents } from "../helpers/api-util";
import Head from "next/head";
import NewsletterRegistration from "../components/input/NewsletterRegistration";

function HomePage(props) {
  return (
    <div>
      <Head>
        <title>Featured Events</title>
        <meta
          name="description"
          content="Find a lot of great events to visit..."
        />
      </Head>
      <div>
        <Title>Featured Events</Title>
      </div>
      <NewsletterRegistration />
      <EventList events={props.events} />
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
