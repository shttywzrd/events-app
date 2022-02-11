import Image from "next/image";
import Button from "../ui/Button";
import DateIcon from "../icons/DateIcon";
import AddressIcon from "../icons/AddressIcon";
import ArrowRightIcon from "../icons/ArrowRightIcon";

import styles from "./EventItem.module.css";

function EventItem(props) {
  const formattedDate = new Date(props.date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formattedAddress = props.location.replace(",", "\n");
  const link = `/events/${props.id}`;

  return (
    <li className={styles.item}>
      <Image
        src={"/" + props.image}
        alt={props.title}
        width={350}
        height={260}
      />
      <div className={styles.content}>
        <div>
          <h2>{props.title}</h2>
          <div className={styles.date}>
            <DateIcon />
            <time>{formattedDate}</time>
          </div>
          <div className={styles.address}>
            <AddressIcon />
            <address>{formattedAddress}</address>
          </div>
        </div>
      </div>
      <div className={styles.actions}>
        <Button link={link}>
          <span>Explore Event</span>
          <span className={styles.icon}>
            <ArrowRightIcon />
          </span>
        </Button>
      </div>
    </li>
  );
}

export default EventItem;
