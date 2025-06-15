export const isSafari =
  typeof window !== "undefined" ? /^((?!chrome|android).)*safari/i.test(navigator.userAgent) : false;
export const isMobileSafari =
  typeof window !== "undefined" ? /iP(ad|hone|od).+Version\/[\d.]+.*Safari/i.test(navigator.userAgent) : false;
