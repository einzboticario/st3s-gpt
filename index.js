const { Configuration, OpenAIApi } = require("openai");
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const configuration = new Configuration({
    organization: "org-oj19ZnnzgpVxsLzXdgGuQy6z",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

const app = express()
app.use(bodyParser.json())
app.use(cors())

const port = 3080

app.post('/', async (req, res) => {
    const { message } = req.body;
    const response = await openai.createCompletion({
        model: "text-davinci-003", 
        prompt: `${message}`,
        max_tokens: 2048,
        temperature: 0.5,
    });
    res.json({
        message: response.data.choices[0].text,
    })
});

app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
});