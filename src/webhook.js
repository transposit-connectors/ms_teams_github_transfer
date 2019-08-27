/**
 * This operation is an example of a JavaScript operation deployed as a Webhook
 * and configured to work with Slack.
 *
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/building/webhooks/**
 * This operation is an example of a JavaScript operation deployed as a Webhook
 * and configured to work with Slack.
 *
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/building/webhooks
 */
({
    http_event
}) => {

    const parsed_body = JSON.parse(http_event.body);
    let command_text = parsed_body.text.trim();

    // sometimes we get errant html if someone copy/pastes a command.
    command_text = command_text.replace(/<[^>]*>?/gm, '');
    let text = '';
    const users_team_id = parsed_body.from.id;
    const text_match = /(\S+) (\S+) (\S+)/.exec(command_text);
    if (!text_match) {
        text = this.errorMessage();
    } else if (command_text.indexOf('configure') > -1) {
        const transposit_user_email = text_match[3];
        const bot_name = text_match[1];
        text = "Configured " + users_team_id + " to match with " + transposit_user_email;
        stash.put(users_team_id, transposit_user_email);
        stash.put(this.botNameKey(), bot_name)
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
            text = this.errorMessage();
        }
    }

    const body = {
        "type": "html",
        "text": text
    };

    // TODO
    // HMAC
    // find a better way to get the email address https://docs.microsoft.com/en-us/graph/api/user-get?view=graph-rest-1.0&tabs=http

    return {
        status_code: 200,
        body: body,
        headers: {
            "content-type": "application/json",
        }
    };

    function botNameKey() {
        const BOT_NAME_KEY = 'botname';
        return BOT_NAME_KEY;
    }

    function errorMessage() {
        const setupUrl = env.getBuiltin().appUrl;
        const bot_name = stash.get(this.botNameKey());
        if (bot_name === null) {
            bot_name = "Bot";
        }
        return 'Usage: ' + bot_name + ' <github source file> <github destination file>\n\nAlso, please configure your user at <a href="' + setupUrl + '">' + setupUrl + '</a> and then run "configure <email address>"';
    }
}



/**
 * This operation is an example of a JavaScript operation deployed as a Webhook
 * and configured to work with Slack.
 *
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/building/webhooks
 */

*/
const BOT_NAME_KEY = 'botname';

({
    http_event
}) => {

    const parsed_body = JSON.parse(http_event.body);
    let command_text = parsed_body.text.trim();

    // sometimes we get errant html if someone copy/pastes a command.
    command_text = command_text.replace(/<[^>]*>?/gm, '');
    let text = '';
    const users_team_id = parsed_body.from.id;
    const text_match = /(\S+) (\S+) (\S+)/.exec(command_text);
    if (!text_match) {
        text = this.errorMessage();
    }
    if (command_text.indexOf('configure') > -1) {
        const text_match = /(\S+) (\S+) (\S+)/.exec(command_text);
        const transposit_user_email = text_match[3];
        const bot_name = text_match[1];
        text = "Configured " + users_team_id + " to match with " + transposit_user_email;
        stash.put(users_team_id, transposit_user_email);
        stash.put(BOT_NAME_KEY, bot_name)
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
        }
    } else {
        text = this.errorMessage();
    }

    const body = {
        "type": "html",
        "text": text
    }

    // TODO
    // HMAC
    // find a better way to get the email address https://docs.microsoft.com/en-us/graph/api/user-get?view=graph-rest-1.0&tabs=http

    return {
        status_code: 200,
        body: body,
        headers: {
            "content-type": "application/json",
        }
    };

}

function errorMessage() {
    const setupUrl = env.getBuiltin().appUrl;
    const bot_name = stash.get(BOT_NAME_KEY);
    if (bot_name === null) {
        bot_name = "Bot";
    }
    return 'Usage: ' + bot_name + ' <github source file> <github destination file>\n\nAlso, please configure your user at <a href="' + setupUrl + '">' + setupUrl + '</a> and then run "configure <email address>"';
}

/**
 * This operation is an example of a JavaScript operation deployed as a Webhook
 * and configured to work with Slack.
 *
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/building/webhooks
 */