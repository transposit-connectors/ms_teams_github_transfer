/**
 * This operation is an example of a JavaScript operation deployed as a Webhook
 * and configured to work with MS Teams.
 *
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/building/webhooks/
 */
({
    http_event
}) => {
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
        text = api.run("this.error_message", bot_name: bot_name)[0];
    } else if (command_text.indexOf('configure') > -1) {
        const transposit_user_email = text_match[3];
        text = "Configured. Will now operate as " + transposit_user_email;
        stash.put(users_team_id, transposit_user_email);
    } else {
        const source_url = text_match[2];
        const target_url = text_match[3];
        const userId = stash.get(users_team_id);

        let user = api.user({
            type: "google",
            email: userId
        });

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
            text = api.run("this.error_message", bot_name: bot_name)[0];
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
