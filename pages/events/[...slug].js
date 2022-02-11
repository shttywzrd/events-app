import { useRouter } from "next/router";
import EventList from "../../components/events/EventList";
import { Fragment, useEffect, useState } from "react";
import ResultsTitle from "../../components/events/ResultsTitle";
import ButtonA from "../../components/ui/Button";
import ErrorAlert from "../../components/ui/ErrorAlert";
import { getFilteredEvents } from "../../lib/mongodb";

function FilteredEventsPage() {
  const router = useRouter();
  const [filteredEvents, setFilteredEvents] = useState();

  useEffect(() => {
    if (!router.isReady) return;
    const filter = {
      country: router.query.slug[0],
      month: router.query.slug[1],
    };
    getFilteredEvents(filter).then((events) => {
      setFilteredEvents(events);
    });
  }, [router]);

  if (!filteredEvents) {
    return <p className="center">Loading...</p>;
  }

  if (filteredEvents.length === 0)
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
