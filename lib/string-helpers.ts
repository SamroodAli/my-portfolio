export const langaugeJoiner = (languages: { name: string }[]) => {
  return languages.reduce((string, language, index) => {
    if (index === 0) {
      return (string += language.name);
    } else if (index === languages.length - 1) {
      return (string += ` and ${language.name}`);
    } else {
      return (string += `, ${language.name}`);
    }
  }, "");
};
