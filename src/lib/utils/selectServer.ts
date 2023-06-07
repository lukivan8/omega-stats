import { regions } from "./regions";

export function selectServer(region: string) {
  return region === "global"
    ? ""
    : `&specificRegion=${
        regions[region.toLowerCase() as keyof typeof regions]
      }`;
}
