import PocketBase from "pocketbase"

const pb = new PocketBase(process.env.REACT_APP_SERVER_URL)

pb.autoCancellation(false)
//pb.collection("users").authWithPassword("leonardo@sloth.com", "123456789");

export function getPb(): PocketBase {
  return pb
}
