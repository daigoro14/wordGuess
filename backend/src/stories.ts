import { error } from 'console';
import express from 'express'
import translate from 'translate';

const router = express.Router()


async function translateString(str: string): Promise<string> {
    return translate(str, { from: 'pt', to: 'en' });
}

const story = "Dizem no meu país que existe uma maldição que recai sobre o sétimo filho nascido em qualquer família. A maldição não recairá sobre as filhas, mas se a mãe der à luz sete filhos então o último será com toda a certeza um Lobisomem – uma criatura que é metade homem, metade lobo. Dizem que tais criaturas atacam os humanos; dizem que são ferozes e cruéis. Mas este não era o caso de Filipe. Há muito, muito tempo, havia uma pequena aldeia à beira da floresta. Na maior das vezes, era uma aldeia pacata, mas os aldeões viviam cheios de medo do Lobisomem que diziam morar nas profundezas da floresta. Os Lobisomens eram criaturas escuras, metade homen metade lobo e dizia‐se que quando era noite de lua cheia estas criaturas rastejavam para fora da floresta em busca de carne humana."
// const story = "Dizem no meu país que existe uma maldição que recai sobre o sétimo filho nascido em qualquer família."

const extractWordsAndSpecialChars = (text: string): string[] => {
    // Regular expression to match words and special characters separately
    return text.match(/[\p{L}'-]+|[^\p{L}\s]+/gu) || [];
};

const translateWords = async (words: string[]): Promise<{ firstLanguage: string, secondLanguage: string }[]> => {
    // Translate each word
    const translations = await Promise.all(words.map(async (word) => {
        const translatedWord = await translateString(word);
        return { firstLanguage: word, secondLanguage: translatedWord };
    }));
    return translations;
};

const arrayStory = story.match(/\b[\w'-]+(?:[^\w\s'-]+[\w'-]+)*|[^\w\s]+/g);

console.log(arrayStory)

router.get('/story', async (req: express.Request, res: express.Response) => {
    try {
        const words = extractWordsAndSpecialChars(story);
        const translations = await translateWords(words);
        res.json(translations);
    } catch (error) {
        console.error('Error translating words:', error);
        res.status(500).json({ error: 'An error occurred while translating words.' });
    }
})

// router.post('/translate', async (req: express.Request, res: express.Response) => {
//     console.log(req.body.sentence)
//     try {
//         const translate = await translateString(req.body.sentence)
//         res.json(translate)
//     } catch (error){
//         console.log(error)
//         res.json(error)
//     }
// })

exports.router = router