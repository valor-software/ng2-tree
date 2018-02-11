import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/merge';

// This forces angular compiler to generate a "rxjs-imports.metadata.json"
// with a valid metadata instead of "[null]"
export const noop = () => {};
