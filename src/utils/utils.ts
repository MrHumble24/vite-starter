function omitProperty<T, K extends keyof T>(obj: T, key: K): Omit<T, K> {
  const { [key]: omitted, ...rest } = obj;
  return rest as Omit<T, K>;
}

export default omitProperty;
