import logger from "./index";

const printRegisterRoute = (
  method: string,
  route: string,
  serviceName: string,
  action: string
): void => {
  logger.info({
    flat: true,
    method: method.toUpperCase(),
    route,
    gray: "=>",
    action: `${serviceName.toLowerCase()}.${action}`,
  });
};

export { printRegisterRoute };

export default {
  printRegisterRoute,
};
