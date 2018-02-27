import { ServiceCaller, Services, Service } from "../types"

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
