import _ from 'lodash';

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  // Use lodash wrapper _() to concat methods
  return _(items)
    .slice(startIndex)
    .take(pageSize)
    .value();
}
