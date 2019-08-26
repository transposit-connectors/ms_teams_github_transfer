/**
 * This operation is an example of a JavaScript operation deployed as a Webhook
 * and configured to work with Slack.
 *
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/building/webhooks
 */
({ http_event }) => {
  const parsed_body = JSON.parse(http_event.body)
  const command = parsed_body.text

  const parsed_body.text

  setImmediate(() => {
    const text_match = /(\S+) (\S+) (\S+) (\S+)/.exec(parsed_body.text.trim());
    const userId = text_match[3];
    const source_url = text_match[1];
    const target_url = text_match[2];
    if (userId) {
 	  
      let user = api.user({type: "google", email: userId});  
      if (user) {
		text = api.run('this.transfer_file', { source_url: source_url, target_url: target_url }, {asUser: user.id})[0];
      } else {
        text = 'Couldn\'t parse the source and target urls.';    
      }
    } else {
      text = 'Please configure your user at ' +  env.getBuiltin().appUrl;   
    }
  });
  
  const body = {
    "type": "message",
    "text": text
  }
  return { status_code: 200, body: body };
}


/**
 * This operation is an example of a JavaScript operation deployed as a Webhook
 * and configured to work with Slack.
 *
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/building/webhooks
 */