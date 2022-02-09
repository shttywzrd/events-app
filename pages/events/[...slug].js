import useSWR from "swr";
import { useRouter } from "next/router";
import EventList from "../../components/events/EventList";
import { Fragment, useEffect, useState } from "react";
import ResultsTitle from "../../components/events/ResultsTitle";
import ButtonA from "../../components/ui/ButtonA";
import ErrorAlert from "../../components/ui/ErrorAlert";

function FilteredEventsPage() {
  const router = useRouter();
  const [loadedEvents, setLoadedEvents] = useState();
  const [filteredEvents, setFilteredEvents] = useState();

  const fetcher = (url) => fetch(url).then((res) => res.json());

  const { data, error } = useSWR(
    "https://events-app-43910-default-rtdb.europe-west1.firebasedatabase.app/events.json",
    fetcher
  );

  useEffect(() => {
    if (data) {
      const events = [];
      for (const key in data) {
        events.push({ id: key, ...data[key] });
      }
      setLoadedEvents(events);
    }
  }, [data]);

  useEffect(() => {
    if (!router.isReady || !loadedEvents) return;
    const filter = router.query.slug;
    const yearFilter = +filter[0];
    const monthFilter = +filter[1];
    const filteredEvents = loadedEvents.filter((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getFullYear() === yearFilter &&
        eventDate.getMonth() === monthFilter - 1
      );
    });
    setFilteredEvents(filteredEvents);
  }, [loadedEvents, router]);

  if (!filteredEvents) {
    return <p className="center">Loading...</p>;
  }

  if (filteredEvents.length === 0 || error)
    return (
      <Fragment>
        <ErrorAlert>
          <p className="center">Events not found for selected filter!</p>
        </ErrorAlert>
        <div className="center">
          <ButtonA link={"/events/"}>Show All Events</ButtonA>
        </div>
      </Fragment>
    );

  const date = new Date(router.query.slug[0], router.query.slug[1] - 1);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList events={filteredEvents} />
    </Fragment>
  );
}

export default FilteredEventsPage;
