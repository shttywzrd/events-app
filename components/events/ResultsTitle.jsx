import Head from "next/head";
import Button from "../ui/Button";
import classes from "./ResultsTitle.module.css";

function ResultsTitle(props) {
  return (
    <section className={classes.title}>
      <Head>
        <title>Filtered Events</title>
        <meta
          name="description"
          content={`All events in ${props.country} in ${props.month}`}
        />
      </Head>
      <h1>
        Events in {props.country} in {props.month}
      </h1>
      <Button link="/events">Show all events</Button>
    </section>
  );
}

export default ResultsTitle;
