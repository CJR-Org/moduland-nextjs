import { useState } from "react";

export function AddModule() {
  const [isOpen, setOpen] = useState(false);
  const [moduleName, setModuleName] = useState("");
  const [repository, setRepository] = useState("");

  function submit() {
    if (validate_input()) {
      const split = repository.split("/");
      const name = split[0];
      const repo = split[1];

      fetch(
        `/api/v1/add-package?name=${moduleName}&user=${name}&repo=${repo}`
      ).then((response) => {
        response.json().then((json) => {
          if (json.status == "success") {
            document.location.href = json.url;
          } else {
            alert(json.reason);
          }
        });
      });
    } else {
      alert("bad input");
    }
  }

  function validate_input() {
    return (
      moduleName.length > 0 &&
      !moduleName.includes(" ") &&
      repository.split("/").length == 2 &&
      !repository.startsWith("https://") &&
      !repository.endsWith(".com")
    );
  }

  return (
    <>
      <button onClick={() => setOpen(true)}>add a module</button>

      <dialog open={isOpen}>
        <div className="flex">
          <div className="top">
            <div>
              <h3>Add Module</h3>
              <p className="description">
                First choose a name for your module, then fill in the repository
                field with the format: user/repo
              </p>
            </div>
          </div>
          <div className="bottom">
            <input
              className="w-full"
              placeholder="Module Name"
              onChange={(event) => setModuleName(event.target.value)}
            />
            <input
              placeholder="GitHub Repository"
              onChange={(event) => setRepository(event.target.value)}
            />
            <button className="active" onClick={() => submit()}>
              Submit
            </button>
            <button onClick={() => setOpen(false)}>Cancel</button>
          </div>
        </div>
      </dialog>
    </>
  );
}
