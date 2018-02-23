import { ServiceCaller, Services, Service, ReduceObject } from "../types"

export function convertServiceMethodsToServices(
  serviceMethods: ServiceCaller[],
): Services {
  return serviceMethods.reduce(
    (acc, method): Service => {
      acc[method.name] = method.func
      return acc as Service
    },
    {} as ReduceObject,
  ) as Services
}
