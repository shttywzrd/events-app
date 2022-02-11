import Image from "next/image";
import Button from "../ui/Button";
import DateIcon from "../icons/DateIcon";
import AddressIcon from "../icons/AddressIcon";
import ArrowRightIcon from "../icons/ArrowRightIcon";

import styles from "./EventItem.module.css";

function EventItem(props) {
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
            <time>{props.month}</time>
          </div>
          <div className={styles.address}>
            <AddressIcon />
            <address>{`${props.city}, ${props.country}`}</address>
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
