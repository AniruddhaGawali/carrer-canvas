export default function compareObjects(
  object1: Object | null | undefined,
  object2: Object | null | undefined,
): boolean {
  if (
    object1 === null ||
    object1 === undefined ||
    object2 === null ||
    object2 === undefined
  )
    return false;

  return JSON.stringify(object1) === JSON.stringify(object2);
}
