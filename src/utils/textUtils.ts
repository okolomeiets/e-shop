/**
 * Replaces hyphens with spaces between words in the provided text.
 * @param text - The text to process.
 * @return The text with hyphens replaced by spaces.
 */

export const replaceHyphensWithSpaces = (text: string): string => text.replace(/(?<=\w)-(?=\w)/g, ' ');
