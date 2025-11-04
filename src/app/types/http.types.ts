import { HttpParams } from '@angular/common/http';

export type HtppQueryParams =
  | HttpParams
  | Record<
      string,
      string | number | boolean | ReadonlyArray<string | number | boolean>
    >;
