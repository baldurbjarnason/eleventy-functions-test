require("isomorphic-fetch")
const localStorage = require('localStorage')
const GoTrue = require("gotrue-js").default
global.window = { atob: (base64) => Buffer.from(base64, 'base64').toString('ascii'), localStorage };
global.localStorage = localStorage
const auth = new GoTrue({
  APIUrl: 'https://festive-jepsen-08097c.netlify.app/.netlify/identity',
  audience: '',
  setCookie: true,
});

exports.handler = async (event, context) => {
  try {
    const user = auth.currentUser();
    const {identity} = context.clientContext
    console.log(JSON.stringify(context, null, 2))
    return { statusCode: 200, body: `Hello ${user} from a serverless function! ${JSON.stringify(context.custom, null, 2)} ${JSON.stringify(event, null, 2)} ${JSON.stringify(context, null, 2)}` };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
};
