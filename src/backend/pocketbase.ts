import PocketBase from "pocketbase";

const pb = new PocketBase(process.env.REACT_APP_SERVER_URL);

pb.autoCancellation(false);

export function getPb(): PocketBase {
  return pb;
}
