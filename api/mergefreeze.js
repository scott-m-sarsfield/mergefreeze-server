import { Router } from 'express';

const router = Router();

router.post('/', function(req, res) {
    const data = getPayLoad(req);
    const response = {
        "response_type": "in_channel",
        "attachments": [
            {
              "text":`MERGE FREEZE IN EFFECT`
            },
            {
              "image_url":"https://i.imgur.com/lCIulgN.jpg"
            }
        ]
    };
    res.send(response);
});

/*
    The following data is available (see https://api.slack.com/slash-commands)
    token, team_id, team_domain, channel_id, channel_name, user_id, user_name,
    command, text, response_url
*/
const getPayLoad = req => {
    return req.method === 'GET' ? req.query : req.body;
}

module.exports = router;
