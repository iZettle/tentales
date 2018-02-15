import { ServiceCaller, ServicesMap, Service, ReduceObject } from "../types"

export function convertServiceMethodsToServices(
  serviceMethods: ServiceCaller[],
): ServicesMap {
  return serviceMethods.reduce(
    (acc, method): Service => {
      acc[method.name] = method.func
      return acc as Service
    },
    {} as ReduceObject,
  ) as ServicesMap
}
