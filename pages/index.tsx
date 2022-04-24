import type { NextPage } from "next";
import styles from "../styles/Style.module.css";
import { ModuleList } from "../components/ModuleList";
import { AddModule } from "../components/AddModule";
import { DB } from "../backend/VersatileDB";

export async function getServerSideProps() {
  const data = new DB("backend/data/packages.db").read();

  return {
    props: { packages: data.jsonify() },
  };
}

const Home: NextPage = (props: any) => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>welcome to moduland</h1>

        <AddModule />
        <br />
        <br />
        <br />
        <h2>modules</h2>

        <ModuleList packages={props.packages} />
      </main>
    </div>
  );
};

export default Home;
