export function getAPI() {
  if (!globalThis.activeIndex || globalThis.activeIndex > 2) {
    globalThis.activeIndex = 1;
  }
  console.log(globalThis.activeIndex)
  return process.env[`FOOTBALL_API_KEY${globalThis.activeIndex}`] || null;
}

export function rotateAPI() {
  if (!globalThis.activeIndex || globalThis.activeIndex + 1 > 2) {
    globalThis.activeIndex = 1;
  } else {
    globalThis.activeIndex += 1;
  }
  return process.env[`FOOTBALL_API_KEY${globalThis.activeIndex}`] || null;
}
