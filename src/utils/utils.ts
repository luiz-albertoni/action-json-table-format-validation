/* eslint-disable  @typescript-eslint/no-explicit-any */
export function isArray(jsonELement: any): boolean {
  return Object.prototype.toString.call(jsonELement) === '[object Array]'
}
