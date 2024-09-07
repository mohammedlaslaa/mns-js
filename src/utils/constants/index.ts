// eslint-disable-next-line @typescript-eslint/no-var-requires

export const PUBLIC_API = process.env.PUBLIC_API || "http://localhost";

export const PORT_API = process.env.PORT_API
  ? parseInt(process.env.PORT_API, 10)
  : 5002;
