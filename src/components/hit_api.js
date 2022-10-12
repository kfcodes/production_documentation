export function getList() {
  return fetch("http://localhost:4040/brands/list").then((data) => data.json());
}
