import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090");

pb.autoCancellation(false);
pb.collection("users").authWithPassword("leonardo@sloth.com", "123456789");

export function getPb() {
  return pb;
}
