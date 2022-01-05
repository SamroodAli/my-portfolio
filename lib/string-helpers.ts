import { languages } from "@prisma/client";

export const langaugeJoiner = (languages: languages[]) => {
  return languages.reduce((string, language, index) => {
    if (index === 0) {
      return (string += language);
    } else if (index === languages.length - 1) {
      return (string += ` and ${language}`);
    } else {
      return (string += `, ${language}`);
    }
  }, "");
};
