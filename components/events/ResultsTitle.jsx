import Head from "next/head";
import Button from "../ui/Button";
import classes from "./ResultsTitle.module.css";

function ResultsTitle(props) {
  const { date } = props;

  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <section className={classes.title}>
      <Head>
        <title>Filtered Events</title>
        <meta
          name="description"
          content={`All events for ${humanReadableDate}`}
        />
      </Head>
      <h1>Events in {humanReadableDate}</h1>
      <Button link="/events">Show all events</Button>
    </section>
  );
}

export default ResultsTitle;
