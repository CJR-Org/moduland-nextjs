import type { NextPage } from "next";
import { useRouter } from "next/router";
import styles from "../../../styles/Style.module.css";
import { DB } from "../../../backend/VersatileDB";
import Link from "next/link";

export async function getServerSideProps(context: any) {
  const data = new DB("backend/data/packages.db").read();

  return {
    props: { package: data.get(context.params.name) },
  };
}

const PackagePage: NextPage = (props: any) => {
  const router = useRouter();
  const { name } = router.query;
  const { user, repo, versions } = props.package;

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>{name}</h1>
        <h2>versions</h2>

        {versions.map((ver: string, key: any) => (
          <div key={key}>
            <Link href={`/pkg/${name}?v=${ver}`}>{ver}</Link>
          </div>
        ))}
      </main>

      <footer>
        <Link href={`/pkg/${name}`}>
          <a className={styles.noDecoration}>go back</a>
        </Link>
        <span> | </span>
        <a
          className={styles.noDecoration}
          href={`https://github.com/${user}/${repo}`}
          target="_blank"
          rel="noreferrer"
        >
          view on github
        </a>
      </footer>
    </div>
  );
};

export default PackagePage;
