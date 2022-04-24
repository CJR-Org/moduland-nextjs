import styles from "../styles/Style.module.css";

export function FileList(props: any) {
  const { files, user, repo } = props.package;
  const tag = props.tag;

  return (
    <div id={styles.files}>
      {tag
        ? files[tag]
          ? files[tag].map((file: any, key: any) => (
              <div key={key} className={styles.file}>
                <a
                  className={styles.noDecoration}
                  href={`https://github.com/${user}/${repo}/blob/${tag}/${file}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {file}
                </a>
              </div>
            ))
          : "this package can still be installed, however the files for this version have not yet been cached."
        : "this package can still be installed, however no releases of the github repo are available."}
    </div>
  );
}
