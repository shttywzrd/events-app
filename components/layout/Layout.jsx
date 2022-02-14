import { Fragment } from "react";
import MainHeader from "./MainHeader";
import styles from "./Layout.module.css";

function Layout(props) {
  return (
    <Fragment>
      <MainHeader />
      <main className={styles.Layout}>{props.children}</main>
    </Fragment>
  );
}

export default Layout;
