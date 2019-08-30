(params) => {
        const setupUrl = env.getBuiltin().appUrl;
        let bot_name = stash.get(api.run("this.bot_name_key")[0]);
        if (bot_name === null) {
            bot_name = "Bot";
        }
        return 'Usage: ' + bot_name + ' github-source-file-url github-destination-file-url\n\nAlso, please configure your user at <a href="' + setupUrl + '">' + setupUrl + '</a> and then run "configure transposit-email-address"';
    }

/*
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/references/js-operations
 */