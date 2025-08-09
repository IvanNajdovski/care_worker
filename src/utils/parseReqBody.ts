export function parseReqBody(reqBody: any) {
  return Object.entries(reqBody).reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {} as any);
}

export function parseReqBodyAndFilter(reqBody: any, updateFields: string[]) {
  return Object.entries(reqBody).reduce((acc, [key, value]) => {
    if (updateFields.includes(key)) {
      acc[key] = value;
    }
    return acc;
  }, {} as any);
}

export function createSQLValuesAndSQLStrings(obj: any) {
  const { sqlValues, sqlStrings } = Object.entries(obj).reduce(
    (acc, [key, value], index) => {
      acc.sqlValues.push(value);
      acc.sqlStrings.push(`${key} = ?${index + 1}`);
      return acc;
    },
    { sqlValues: [], sqlStrings: [] } as { sqlValues: any[]; sqlStrings: string[] }
  );
  return { sqlValues, sqlValuesLength: sqlValues.length, sqlString: sqlStrings.join(',') };
}

export function createSQLValue(obj: any) {
  return Object.entries(obj)
    .map(([key, value]) => `${key}=${value}`)
    .join(', ');
}
