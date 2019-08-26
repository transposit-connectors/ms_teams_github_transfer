/**
 * This operation is an example of a JavaScript operation deployed as a Webhook
 * and configured to work with Slack.
 *
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/building/webhooks
 */
({ http_event }) => {
  const parsed_body = JSON.parse(http_event.body);
  

    const text_match = /(\S+) (\S+) (\S+) (\S+)/.exec(parsed_body.text.trim());
    const userId = text_match[3];
    const source_url = text_match[1];
    const target_url = text_match[2];
    let user = api.user({type: "google", email: userId}); 
    let text = "";
    if (user) {
      text = "running";
      /*
      if (source_url && target_url) {
		text = api.run('this.transfer_file', { source_url: source_url, target_url: target_url }, {asUser: user.id})[0];
      } else {
        text = 'Couldn\'t parse the source and target urls.';    
      }*/
      
    } else {
      const setupUrl = env.getBuiltin().appUrl;
      text = 'Please configure your user at <a href="'+setupUrl+'">'+setupUrl+'</a>';   
    }
  
  // TODO
  // HMAC
  // find a better way to get the email address https://docs.microsoft.com/en-us/graph/api/user-get?view=graph-rest-1.0&tabs=http
  
  const body = {
    "type": "html",
    "text": text
  }

  return { 
    status_code: 200,
    body: body, 
    headers: {
      "content-type": "application/json",
    }    
  };
}


/**
 * This operation is an example of a JavaScript operation deployed as a Webhook
 * and configured to work with Slack.
 *
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/building/webhooks
 */