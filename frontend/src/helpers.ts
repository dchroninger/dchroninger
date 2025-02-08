export function toProperCase(input: string): string {
  return input
    .replace(/_/g, " ") // Replace underscores with spaces
    .split(" ") // Split into words
    .map((word) => {
      if (word.toLowerCase() === "id") {
        return "ID"; // Capitalize "id" to "ID"
      }
      // Convert to proper case (capitalize the first letter)
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" "); // Join the words back together
}

export function camelToProperCase(
  camelCaseStr: string,
  acronyms?: string[],
): string {
  if (!camelCaseStr) return "";

  // Define acronyms to always preserve
  const alwaysPreservedAcronyms = ["ID"];

  // Combine always preserved acronyms with user-provided acronyms
  const allAcronyms = acronyms
    ? [...acronyms, ...alwaysPreservedAcronyms]
    : alwaysPreservedAcronyms;

  // Create a Set for faster lookup and ensure all acronyms are uppercase
  const acronymsSet = new Set(
    allAcronyms.map((acronym) => acronym.toUpperCase()),
  );

  // Regular expression to identify word boundaries, considering acronyms
  const regex = /([A-Z]+(?=[A-Z][a-z])|[A-Z]?[a-z]+|\d+)/g;

  const words = camelCaseStr.match(regex);

  if (!words) return "";

  const properCaseWords = words.map((word) => {
    const upperWord = word.toUpperCase();
    if (acronymsSet.has(upperWord)) {
      return upperWord;
    }
    // Special handling for "id" or "Id"
    if (word.toLowerCase() === "id") {
      return "ID";
    }
    // Capitalize first letter and lowercase the rest
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });

  return properCaseWords.join(" ").trim();
}
