/**
 * This operation is an example of a JavaScript operation deployed as a Webhook
 * and configured to work with Slack.
 *
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/building/webhooks
 */
({ http_event }) => {
  const parsed_body = JSON.parse(http_event.body);
    let command_text = parsed_body.text.trim();
  
    // sometimes we get errant html if someone copy/pastes a command.
    command_text = command_text.replace(/<[^>]*>?/gm, '');
    let text = '';
    
    if command_text.contains('configure') {
      const configure_text_match = /(\S+) (\S+) (\S+)/.exec(command_text);
      const transposit_user_email = text_match[3];
      const users_team_id = parsed_body.from.id;
      text = "configured " + users_team_id + " to match with " +  transposit_user_email;
    }
    else {
    const text_match = /(\S+) (\S+) (\S+) (\S+)/.exec(command_text);

    const source_url = text_match[2];
    const target_url = text_match[3];
    const userId = text_match[4];
  
    let user = api.user({type: "google", email: userId}); 
    
    if (user) {
      
      if (source_url && target_url) {
		text = api.run('this.transfer_file', { source_url: source_url, target_url: target_url }, {asUser: user.id})[0];
      } else {
        text = 'Couldn\'t parse the source and target urls.';    
      }
      
    } else {
      const setupUrl = env.getBuiltin().appUrl;
      text = 'Please configure your user at <a href="'+setupUrl+'">'+setupUrl+'</a>';   
    }
  
  // TODO
  // HMAC
  // find a better way to get the email address https://docs.microsoft.com/en-us/graph/api/user-get?view=graph-rest-1.0&tabs=http
    }
  
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