import Image from "next/image";
import AddressIcon from "../icons/AddressIcon";
import DateIcon from "../icons/DateIcon";
import LogisticsItem from "./LogisticsItem";
import classes from "./EventLogistics.module.css";

function EventLogistics({ month, city, country, image, imageAlt }) {
  return (
    <section className={classes.logistics}>
      <div className={classes.image}>
        <Image src={`/${image}`} alt={imageAlt} width={400} height={400} />
      </div>
      <ul className={classes.list}>
        <LogisticsItem icon={DateIcon}>
          <time>{month}</time>
        </LogisticsItem>
        <LogisticsItem icon={AddressIcon}>
          <address>{`${city}, ${country}`}</address>
        </LogisticsItem>
      </ul>
    </section>
  );
}

export default EventLogistics;
