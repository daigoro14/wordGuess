import { error } from 'console';
import express from 'express'
const router = express.Router()
import translate from 'translate';

async function translateString(str: string): Promise<string> {
    const foo: string = await translate(str, { from: 'pt', to: 'en' });
    return foo;
}

const story = "Dizem no meu país que existe uma maldição que recai sobre o sétimo filho nascido em qualquer família. A maldição não recairá sobre as filhas, mas se a mãe der à luz sete filhos então o último será com toda a certeza um Lobisomem – uma criatura que é metade homem, metade lobo. Dizem que tais criaturas atacam os humanos; dizem que são ferozes e cruéis. Mas este não era o caso de Filipe. Há muito, muito tempo, havia uma pequena aldeia à beira da floresta. Na maior das vezes, era uma aldeia pacata, mas os aldeões viviam cheios de medo do Lobisomem que diziam morar nas profundezas da floresta. Os Lobisomens eram criaturas escuras, metade homen metade lobo e dizia‐se que quando era noite de lua cheia estas criaturas rastejavam para fora da floresta em busca de carne humana."


const arrayStory = story.match(/\b[\w'-]+(?:[^\w\s'-]+[\w'-]+)*|\s+|[^\w\s]+/g);

// console.log(arrayStory)

router.get('/story', async (req: express.Request, res: express.Response) => {
    res.json(arrayStory)
})

router.post('/translate', async (req: express.Request, res: express.Response) => {
    console.log(req.body.sentence)
    try {
        const translate = await translateString(req.body.sentence)
        res.json(translate)
    } catch (error){
        console.log(error)
        res.json(error)
    }
})

exports.router = router