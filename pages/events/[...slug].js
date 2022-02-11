import { Fragment } from "react";
import EventList from "../../components/events/EventList";
import ResultsTitle from "../../components/events/ResultsTitle";
import Button from "../../components/ui/Button";
import ErrorAlert from "../../components/ui/ErrorAlert";
import { getFilteredEvents } from "../../lib/mongodb";

function FilteredEventsPage(props) {
  const { filteredEvents, filter } = props;

  if (!filteredEvents) {
    console.log(filteredEvents);
    return <p className="center">Loading...</p>;
  }

  if (filteredEvents.length === 0)
    return (
      <Fragment>
        <ErrorAlert>
          <p className="center">Events not found for selected filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link={"/events/"}>Show All Events</Button>
        </div>
      </Fragment>
    );

  return (
    <Fragment>
      <ResultsTitle country={filter.country} month={filter.month} />
      <EventList events={filteredEvents} />
    </Fragment>
  );
}

export default FilteredEventsPage;

export async function getServerSideProps(context) {
  const { slug } = context.params;
  const filter = {
    country: slug[0],
    month: slug[1],
  };
  const filteredEvents = await getFilteredEvents(filter);

  return {
    props: {
      filter,
      filteredEvents,
    },
  };
}
