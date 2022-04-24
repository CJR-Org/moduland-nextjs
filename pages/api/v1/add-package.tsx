import { NextApiRequest, NextApiResponse } from "next";
import { DB } from "../../../backend/VersatileDB";
const data = new DB("backend/data/packages.db").read();

export default function addPackage(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { name, repo, user } = req.query;

  data.set(name, { repo, user, versions: [], files: {} });
  data.commit();

  res.status(200).json({ url: `/pkg/${name}`, status: "success" });
}
