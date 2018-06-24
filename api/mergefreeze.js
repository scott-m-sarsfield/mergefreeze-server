import { Router } from 'express';

const router = Router();

router.post('/', function(req, res) {
    const data = getPayLoad(req);
    const command = getCommand(data.text);
    let response;

    switch(command){
      case 'start':
        response = startMergeFreezeResponse();
        break;
      case 'end':
        response = endMergeFreezeResponse();
        break;
      default:
        response = invalidResponse();
        break;
    }

    res.send(response);
});

function getCommand(text){
  let delimited = text.split(' ').filter(word => !!word);
  if(delimited[0].match(/^start$/i)) return 'start';
  if(delimited[0].match(/^end$/i)) return 'end';
  return null;
}

function invalidResponse(){
  return {
    "response_type": "ephemeral",
    "text": `That isn't a command. Only _/mergefreeze start_ or _/mergefreeze end_`
  };
}

function startMergeFreezeResponse(){
  return {
      "response_type": "in_channel",
      "text": `*MERGE FREEZE IN EFFECT*`,
      "attachments": [
          {
            "image_url":"https://i.imgur.com/lCIulgN.jpg"
          }
      ]
  }
}
function endMergeFreezeResponse(){
  return {
      "response_type": "in_channel",
      "text": `*MERGE FREEZE OFF*`,
      "attachments": [
          {
            "image_url":"https://i.imgur.com/QsnFY6Z.jpg"
          }
      ]
  }
}

/*
    The following data is available (see https://api.slack.com/slash-commands)
    token, team_id, team_domain, channel_id, channel_name, user_id, user_name,
    command, text, response_url
*/
const getPayLoad = req => {
    return req.method === 'GET' ? req.query : req.body;
}

module.exports = router;
