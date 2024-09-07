export function kebabCaseToTitleCase(colorName) {
    const colorWithSpaces = colorName.replaceAll("-", " ");
    return colorWithSpaces.replace(/\b([a-z])/g, newToken => newToken.toUpperCase());
}