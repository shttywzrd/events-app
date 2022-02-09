import Head from "next/head";
import ButtonA from "../ui/ButtonA";
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
      <ButtonA link="/events">Show all events</ButtonA>
    </section>
  );
}

export default ResultsTitle;
