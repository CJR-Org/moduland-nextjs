export function ModuleList(props: any) {
  return (
    <div>
      {Object.keys(props.packages).map((pkg, key) => (
        <div key={key}>
          <a href={`/pkg/${pkg}`}>{pkg}</a>
        </div>
      ))}
    </div>
  );
}
