(params) => {
        const setupUrl = env.getBuiltin().appUrl;
        const bot_name = stash.get(api.run("this.botNameKey"));
        if (bot_name === null) {
            bot_name = "Bot";
        }
        return 'Usage: ' + bot_name + ' <github source file> <github destination file>\n\nAlso, please configure your user at <a href="' + setupUrl + '">' + setupUrl + '</a> and then run "configure <email address>"';
    }

/*
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/references/js-operations
 */