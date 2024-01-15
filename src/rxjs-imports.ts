import { filter, merge } from 'rxjs/operators';
import { of } from 'rxjs';

// This forces angular compiler to generate a "rxjs-imports.metadata.json"
// with a valid metadata instead of "[null]"
export const noop = () => {};
