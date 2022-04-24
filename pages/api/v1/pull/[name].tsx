import { NextApiRequest, NextApiResponse } from "next";
import { DB } from "../../../../backend/VersatileDB";
const data = new DB("backend/data/packages.db").read();

export default function addPackage(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { name } = req.query;
  const { user, repo } = data.get(name);

  res
    .status(200)
    .json({ url: `https://github.com/${user}/${repo}`, status: "success" });
}
