// Imports the Google Cloud client library
const { Translate } = require("@google-cloud/translate").v2;

async function translateText(text, target) {
  // Creates a client
  const translate = new Translate();

  // Translates the text into the target language. "text" can be a string for
  // translating a single piece of text, or an array of strings for translating
  // multiple texts.
  let [translations] = await translate.translate(text, target);
  translations = Array.isArray(translations) ? translations : [translations];
  // console.log("Translations:");
  // translations.forEach((translation, i) => {
  //   console.log(`${text[i]} => (${target}) ${translation}`);
  // });
  return translations;
}

/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
// const text = '俺はモンキー D ルフィお前らを超えて海賊王になる男だ';
// const target = 'en';

module.exports = {
  translateText,
};
