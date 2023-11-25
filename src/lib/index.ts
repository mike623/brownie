export const getImagePath = (
  path,
  { w }: { w: string | number } = { w: "original" }
) => `https://image.tmdb.org/t/p/${typeof w === "number" ? `w${w}` : w}${path}`;
