import * as Handlebars from 'handlebars';

// @ts-ignore
import { JSONPath } from 'jsonpath-plus';

export const register = (H = Handlebars) => {

  // @snippet:start jp-get-info
  // Retrieve a value from current context using jsonpath
  // @snippet:end
  H.registerHelper('jp-get', function(this: any, jsonPath: string) {
    return JSONPath({ path: jsonPath, json: this });
  });

  // @snippet:start jp-get-in-info
  // Retrieve a value from specified target using jsonpath
  // @snippet:end
  H.registerHelper('jp-get-in', function(
    this: any,
    jsonPath: string,
    target: any
  ) {
    return JSONPath({ path: jsonPath, json: target });
  });

  // @snippet:start jp-descend-info
  // Use the value derived from current context using jsonpath as the context
  // for embedded block
  // @snippet:end
  H.registerHelper('jp-descend', function(
    this: any,
    jsonPath: string,
    options: Handlebars.HelperOptions
  ) {
    const result = JSONPath({ path: jsonPath, json: this });
    if (result === null || result === undefined) return;
    return options.fn(result);
  });

  // @snippet:start jp-descend-in-info
  // Use the value derived from specified target using jsonpath as the context
  // for embedded block
  // @snippet:end
  H.registerHelper('jp-descend-in', function(
    this: any,
    jsonPath: string,
    target: any,
    options: Handlebars.HelperOptions
  ) {
    const result = JSONPath({ path: jsonPath, json: target });
    if (result === null || result === undefined) return;
    return options.fn(result);
  });
};
