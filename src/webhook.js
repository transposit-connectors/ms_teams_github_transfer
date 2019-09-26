
({http_event}) => {
  const hmac = http_event.headers.Authorization.replace('HMAC ', '');
  const hmac_valid = api.run("this.calculate_hmac", {
    hmac: hmac,
    message: http_event.body
  })[0].valid;
  let text = '';

  if (!hmac_valid) {
    text = "It looks like I can't trust you, your signature isn't valid. Contact an admin, please.";
    const hmac_error_body = {
      "type": "html",
      "text": text
    };

    return {
      status_code: 200,
      body: hmac_error_body,
      headers: {
        "content-type": "application/json",
      }
    };
  }

  const parsed_body = JSON.parse(http_event.body);
  console.log(parsed_body);

  let command_text = parsed_body.text.trim();

  // sometimes we get errant html if someone copy/pastes a command.
  command_text = command_text.replace(/<[^>]*>?/gm, '');

  const users_team_id = parsed_body.from.id;
  const bot_text_match = /(\S+)/.exec(command_text);
  let bot_name = 'Bot';
  if (bot_text_match) {
    bot_name = bot_text_match[1];
  }

  const text_match = /(\S+) (\S+) (\S+)/.exec(command_text);
  if (!text_match) {
    text = api.run("this.error_message", {
      bot_name: bot_name
    })[0];
  } else if (command_text.indexOf('configure') > -1) {
    const transposit_user_email = text_match[3];
    text = "Configured. Just sent you an email with a verification code. Please respond with '@" + bot_name + " verify [yourcodehere]'";
    const verificationCode = api.run("this.random_verification_code")[0];
    stash.put(users_team_id + "-verify", verificationCode);
    stash.put(users_team_id + "-possible-email", transposit_user_email);
    const res = api.run("this.send_mail", {
      to: transposit_user_email,
      from: env.get("from_email"),
      content: "Verify your account for the Github Transfer app by typing '@" + bot_name + " verify "+verificationCode +" . \n\n(Cut and paste of the bot name doesn't work.)";
    });

  } else if (command_text.indexOf('verify') > -1) {
    const provided_verification_code = text_match[3];
    const expected_verification_code = stash.get(users_team_id + "-verify");
    if (provided_verification_code === expected_verification_code) {
      const transposit_user_email = stash.get(users_team_id + "-possible-email");
      text = "Verified. Will now operate as " + transposit_user_email;
      stash.put(users_team_id, transposit_user_email);
      stash.put(users_team_id + "-verify", null);
      stash.put(users_team_id + "-possible-email", null);
    } else {
      text = "Uh-oh, I don't recognize you. Please try to configure again.";
    }
  } else {
    const source_url = text_match[2];
    const target_url = text_match[3];
    const userId = stash.get(users_team_id);

    let user = null;
    if (userId != null) {
      let user = api.user({
        type: "google",
        email: userId
      });
    }

    if (user) {

      if (source_url && target_url) {
        text = api.run('this.transfer_file', {
          source_url: source_url,
          target_url: target_url
        }, {
          asUser: user.id
        })[0];
      } else {
        text = 'Couldn\'t parse the source and target urls.';
      }
    } else {
      text = api.run("this.error_message", {
        bot_name: bot_name
      })[0];
    }
  }

  const body = {
    "type": "html",
    "text": text
  };

  return {
    status_code: 200,
    body: body,
    headers: {
      "content-type": "application/json",
    }
  };
}