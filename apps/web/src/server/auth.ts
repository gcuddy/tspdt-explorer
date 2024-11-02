import { cache } from "react";

export const getPageSession = cache(async () => {
  return {
    session: null,
    user: null
  }
})
