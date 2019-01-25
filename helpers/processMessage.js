const API_AI_TOKEN = '154b89ebaafe460480ba3d9ea37b98dc';
const apiAiClient = require('apiai')(API_AI_TOKEN);
const FACEBOOK_ACCESS_TOKEN = 'EAAepyRh4sMEBAKL4K6X3IMcz1mzuPChlEJpdZCbZAZAEv3Q2w2C8WYXCChkIeYTI7jSTy01mAM63mnOtXEn5ZBRYaKn5WWNVXFcHKOCahvtlXggfB42LndNLjEkP5XIeIfQaF3M4itWU8mdmX2eR3Mv55jZAE3VNm53c4252WcwZDZD';
const request = require('request');
const sendTextMessage = (senderId, text) => {
 request({
 url: 'https://graph.facebook.com/v2.6/me/messages',
 qs: { access_token: FACEBOOK_ACCESS_TOKEN },
 method: 'POST',
 json: {
 recipient: { id: senderId },
 message: { text },
 }
 });
};
module.exports = (event) => {
 const senderId = event.sender.id;
 const message = event.message.text;
const apiaiSession = apiAiClient.textRequest(message, {sessionId: 'crowdbotics_bot'});
apiaiSession.on('response', (response) => {
 const result = response.result.fulfillment.speech;
sendTextMessage(senderId, result);
 });
apiaiSession.on('error', error => console.log(error));
 apiaiSession.end();
};
