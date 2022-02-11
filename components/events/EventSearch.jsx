import Button from "../ui/Button";
import styles from "./EventsSearch.module.css";
import { useRef } from "react";

function EventSearch(props) {
  const countryInputRef = useRef();
  const monthInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();
    const selectedCountry = countryInputRef.current.value;
    const selectedMonth = monthInputRef.current.value;

    props.onSearch(selectedCountry, selectedMonth);
  }

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div className={styles.controls}>
        <div className={styles.control}>
          <label htmlFor="country">Country or State</label>
          <select id="country" ref={countryInputRef}>
            <option value="Georgia">Georgia</option>
            <option value="b">b</option>
          </select>
        </div>
        <div className={styles.control}>
          <label htmlFor="month">Month</label>
          <select id="month" ref={monthInputRef}>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
        </div>
      </div>
      <Button>Find Events</Button>
    </form>
  );
}

export default EventSearch;
