class JSONPClient {
  private static callbackIdCounter = 0;

  static makeJSONPRequest(url: string, params: Record<string, any>, timeout: number = 5000, callbackName?: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const uniqueCallbackName = callbackName || `jsonpCallback_${JSONPClient.callbackIdCounter++}`;
      params.callback = uniqueCallbackName;
      const queryString = JSONPClient.createQueryString(params);
      const fullUrl = `${url}?${queryString}`;

      const timeoutId = setTimeout(() => {
        reject(new Error(`JSONP request to ${fullUrl} timed out after ${timeout}ms.`));
        delete (window as any)[uniqueCallbackName];
        if (scriptTag.parentNode) {
          document.body.removeChild(scriptTag);
        }
      }, timeout);

      (window as any)[uniqueCallbackName] = (data: any) => {
        clearTimeout(timeoutId);
        resolve(data);
        delete (window as any)[uniqueCallbackName];
        if (scriptTag.parentNode) {
          document.body.removeChild(scriptTag);
        }
      };

      const scriptTag = document.createElement("script");
      scriptTag.src = fullUrl;
      scriptTag.onerror = () => {
        clearTimeout(timeoutId);
        reject(new Error(`JSONP request to ${fullUrl} failed.`));
        delete (window as any)[uniqueCallbackName];
        if (scriptTag.parentNode) {
          document.body.removeChild(scriptTag);
        }
      };

      document.body.appendChild(scriptTag);
    });
  }

  private static createQueryString(params: Record<string, any>): string {
    return Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join("&");
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
