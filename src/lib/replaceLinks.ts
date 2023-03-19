export const replaceLinks = (str: string): string => {
  const regex = /https?:\/\/\S+/g;
  return str.replace(regex, (match) => {
    return `<a href="${match}" target="_blank" rel="noopener noreferrer" style="text-decoration: underline;">${match}</a>`;
  });
};
