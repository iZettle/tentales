import { Service, Services, ServiceCaller } from "tentales"

export function convertServiceMethodsToServices(
  serviceMethods: ServiceCaller[],
): Services {
  return serviceMethods.reduce(
    (acc, method): Service =>
      ({
        ...acc,
        [method.name]: method.func,
      } as Service),
    {},
  ) as Services
}
