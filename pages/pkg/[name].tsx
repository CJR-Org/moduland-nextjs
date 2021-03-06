import type { NextPage } from "next";
import { useRouter } from "next/router";
import styles from "../../styles/Style.module.css";
import { DB } from "../../backend/VersatileDB";
import { FileList } from "../../components/FileList";
import Link from "next/link";
import { cacheFiles, cacheVersions } from "../../utils/caching";

export async function getServerSideProps(context: any) {
  const data = new DB("backend/data/packages.db").read();

  const pkg = data.get(context.params.name);

  cacheVersions(context.params.name, pkg.user, pkg.repo, data);

  if (pkg.versions[0]) {
    cacheFiles(
      context.params.name,
      pkg.user,
      pkg.repo,
      context.query.v ? context.query.v : pkg.versions[0],
      data
    );
  }

  return {
    props: { package: pkg },
  };
}

const PackagePage: NextPage = (props: any) => {
  const router = useRouter();
  const { name, v } = router.query;
  const { user, repo, versions } = props.package;

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>{name}</h1>
        <Link href={`/pkg/${name}/versions`}>
          <a>
            <h5>{v ? v : versions ? versions[0] : ""}</h5>
          </a>
        </Link>

        <code>
          pcjr install {name}
          {v ? ` ${v}` : ""}
        </code>
        <br />
        <br />
        <h2>files</h2>
        <FileList
          package={props.package}
          tag={v ? v : versions ? versions[0] : undefined}
        />
      </main>

      <footer>
        <Link href="/">
          <a className={styles.noDecoration}>go home</a>
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
