type Send = {
  get: (url: string) => Promise<any>;
  post: (url: string, body?: any) => Promise<any>;
};
const createSend = (baseURL: string): Send => {
  return {
    get: async (url: string) => fetch(baseURL + url).then((r) => r.json()),
    post: async (url: string, body?: any) =>
      fetch(baseURL + url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      }).then((r) => r.json()),
  };
};

const send = createSend("http://localhost:3000/api");
export default send;
