class JSONPClient {
  private static callbackIdCounter = 0;

  static makeJSONPRequest(url: string, params: Record<string, any>, timeout: number = 5000, callbackName?: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const uniqueCallbackName = callbackName || `jsonpCallback_${JSONPClient.callbackIdCounter++}`;
      params.callback = uniqueCallbackName;

      const urlWithParams = JSONPClient.constructURL(url, params);
      const scriptTag = JSONPClient.createScriptTag(urlWithParams);

      const cleanup = () => {
        delete (window as any)[uniqueCallbackName];
        if (scriptTag.parentNode) {
          document.body.removeChild(scriptTag);
        }
      };

      const timeoutId = setTimeout(() => {
        cleanup();
        reject(new Error(`JSONP request to ${urlWithParams} timed out after ${timeout}ms.`));
      }, timeout);

      (window as any)[uniqueCallbackName] = (data: any) => {
        clearTimeout(timeoutId);
        cleanup();
        resolve(data);
      };

      scriptTag.onerror = () => {
        clearTimeout(timeoutId);
        cleanup();
        reject(new Error(`JSONP request to ${urlWithParams} failed.`));
      };

      document.body.appendChild(scriptTag);
    });
  }

  private static constructURL(baseURL: string, params: Record<string, any>): string {
    const url = new URL(baseURL);
    const searchParams = new URLSearchParams(params);
    url.search = searchParams.toString();
    return url.toString();
  }

  private static createScriptTag(src: string): HTMLScriptElement {
    const scriptTag = document.createElement("script");
    scriptTag.src = src;
    return scriptTag;
  }
}

// Example usage:
JSONPClient.makeJSONPRequest("https://example.com/api", { param1: "value1", param2: "value2" }, 10000)
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error(error);
  });
