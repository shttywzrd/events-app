import classes from "./NewsletterRegistration.module.css";
import { useRef } from "react";

function NewsletterRegistration() {
  const emailRef = useRef();

  function registrationHandler(event) {
    event.preventDefault();

    const enteredEmail = emailRef.current.value;
    emailRef.current.value = "";

    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email: enteredEmail }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json().then((data) => alert(data.message)));
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler} autoComplete="off">
        <div className={classes.control}>
          <input
            type="email"
            required={true}
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
