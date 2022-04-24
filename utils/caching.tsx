let nextVersionTime: Date = new Date();
let nextFileTime: Date = new Date();

export function cacheVersions(
  name: string,
  user: string,
  repo: string,
  data: any
) {
  if (new Date() < nextVersionTime) {
    console.log(`Prevented caching versions of ${name} to prevent ratelimit.`);
    return;
  }

  fetch(`https://api.github.com/repos/${user}/${repo}/tags`).then(
    (response) => {
      response.json().then((tags: any) => {
        if (!tags.message && !tags.documentation_url && !!tags) {
          let tag_names: any = [];

          tags.forEach((tag: any) => {
            tag_names.push(tag.name);
          });

          const pkg = data.read_and_get(name);
          pkg["versions"] = tag_names;
          data.set_and_commit(name, pkg);

          console.log(`Cached versions of ${name} package.`);

          // prevent ratelimit
          let d = new Date();
          nextVersionTime = new Date(d.setMinutes(d.getMinutes() + 5));
        }
      });
    }
  );
}

export function cacheFiles(
  name: string,
  user: string,
  repo: string,
  tag: string,
  data: any
) {
  if (new Date() < nextFileTime) {
    console.log(`Prevented caching files of ${name} to prevent ratelimit.`);
    return;
  }

  fetch(
    `https://api.github.com/repos/${user}/${repo}/git/trees/${tag}?recursive=1`
  ).then((response) => {
    response.json().then((files) => {
      if (!files.message && !files.documentation_url && !!files) {
        let file_paths: any = [];

        files.tree.forEach((file: any) => {
          if (!file.path.includes("/")) file_paths.push(file.path);
        });

        const pkg = data.read_and_get(name);
        pkg["files"][tag] = file_paths;
        data.set_and_commit(name, pkg);

        console.log(`Cached files of ${name} package.`);

        // prevent ratelimit
        let d = new Date();
        nextFileTime = new Date(d.setMinutes(d.getMinutes() + 30));
      }
    });
  });
}
