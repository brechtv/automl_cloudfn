const automl = require('@google-cloud/automl');
const functions = require('firebase-functions');

const projectId = "bv-playground";
const computeRegion = "us-central1";
const modelId = "TCN2451596469614936064";

const predictionClient = new automl.PredictionServiceClient();

exports.predictLabel = functions.https.onRequest(async(req, res) => {

    const inputText = decodeURIComponent(req.query.text);
    const modelFullId = predictionClient.modelPath(projectId, computeRegion, modelId);
    const payload = {
        textSnippet: {
            content: inputText,
            mimeType: `text/plain`
        }
    };

    predictionClient
        .predict({
            name: modelFullId,
            payload: payload
        })
        .then(responses => {
            res.status(200).send(JSON.stringify(responses))
        })
        .catch(err => {
            res.status(404).send(err)
        });
});