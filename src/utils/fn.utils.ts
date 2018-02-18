export function isEmpty(value: any[] | string): boolean {
  if (typeof value === 'string') {
    return !/\S/.test(value);
  }

  if (Array.isArray(value)) {
    return value.length === 0;
  }

  return isNil(value);
}

export function trim(value: string): string {
  return isNil(value) ? '' : value.trim();
}

export function has(value: any, prop: string): boolean {
  return value && typeof value === 'object' && value.hasOwnProperty(prop);
}

export function isFunction(value: any) {
  return typeof value === 'function';
}

export function get(value: any, path: string, defaultValue?: any) {
  let result = value;

  for (const prop of path.split('.')) {
    if (!result || !Reflect.has(result, prop)) {
      return defaultValue;
    }

    result = result[prop];
  }

  return isNil(result) || result === value ? defaultValue : result;
}

export function omit(value: any, propsToSkip: string | string[]): any {
  if (!value) {
    return value;
  }

  const normalizedPropsToSkip = typeof propsToSkip === 'string' ? [propsToSkip] : propsToSkip;

  return Object.keys(value).reduce((result, prop) => {
    if (includes(normalizedPropsToSkip, prop)) {
      return result;
    }
    return Object.assign(result, { [prop]: value[prop] });
  }, {});
}

export function size(value: any[]): number {
  return isEmpty(value) ? 0 : value.length;
}

export function once(fn: Once): Once {
  let result;

  return (...args: any[]) => {
    if (fn) {
      result = fn.apply(null, args);
      fn = null;
    }
    return result;
  };
}

export function defaultsDeep(target: any, ...sources: any[]): any {
  return [target].concat(sources).reduce((result: any, source: any) => {
    if (!source) {
      return result;
    }

    Object.keys(source).forEach(prop => {
      if (isNil(result[prop])) {
        result[prop] = source[prop];
        return;
      }

      if (typeof result[prop] === 'object' && !Array.isArray(result[prop])) {
        result[prop] = defaultsDeep(result[prop], source[prop]);
        return;
      }
    });

    return result;
  }, {});
}

export function includes(target: string | any[], value: any): boolean {
  if (isNil(target)) {
    return false;
  }

  const index = typeof target === 'string' ? target.indexOf(value as string) : target.indexOf(value);
  return index > -1;
}

export function isNil(value: any): boolean {
  return value === undefined || value === null;
}

export type Once = (...args: any[]) => any;
