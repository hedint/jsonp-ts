const PREFIX: string = "__jp";
const PARAM = "callback";
const TIMEOUT = 60000;
declare global {
  interface Window extends Record<string, (data?: any) => void> {}
}
interface JsonpParams {
  /** name of the query string parameter to specify the callback (defaults to "callback") */
  param: string
  /** prefix for the global callback functions that handle jsonp responses (defaults to" __jp") */
  prefix: string
  /** name of the global callback functions that handle jsonp responses (defaults to prefix + incremented counter) */
  name: string
  /** timeout in ms (defaults to 60000) */
  timeout: number
}

function initCounter() {
  let count = 0;
  return () => count++;
}
function createScriptTag(url: string, onerror?: () => void) {
  const target = document.getElementsByTagName("script")[0] || document.head;
  const scriptTag = document.createElement("script");
  scriptTag.src = url;
  if (onerror) {
    scriptTag.onerror = onerror;
  }
  target.parentNode?.insertBefore(scriptTag, target);
  return scriptTag;
}

/**
 * Makes JSONP call and returns promise.
 *
 * @param url
 * @param params
 */
export function jsonp<Response>(url: string, params?: JsonpParams): Promise<Response> {
  const scriptUrl = new URL(url);

  const counter = initCounter();
  const { prefix = PREFIX } = params || {};
  const { param = PARAM, name: callbackName = `${prefix}${counter()}`, timeout = TIMEOUT } = params || {};
  scriptUrl.searchParams.set(param, callbackName);

  let gResolve = (_value: Response) => {};
  let gReject = (_value: Error) => {};
  const result = new Promise<Response>((resolve, reject) => {
    gResolve = resolve;
    gReject = reject;
  });

  const scriptTag = createScriptTag(scriptUrl.href, () => {
    cleanup();
    gReject(new Error(`JSONP request to ${scriptUrl.href} failed.`));
  });

  const timer = setTimeout(() => {
    cleanup();
    gReject(new Error("Timeout"));
  }, timeout);

  function cleanup() {
    scriptTag.parentNode?.removeChild(scriptTag);
    delete (window as any)[callbackName];
    if (timer) {
      clearTimeout(timer);
    }
  }
  window[callbackName] = (data: Response) => {
    cleanup();
    gResolve(data);
  };
  return result;
}
