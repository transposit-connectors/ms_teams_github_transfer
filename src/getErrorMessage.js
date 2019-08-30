(params) => {
        const setupUrl = env.getBuiltin().appUrl;
        const bot_name = params.bot_name;
        return 'Usage: ' + bot_name + ' github-source-file-url github-destination-file-url\n\nBut first, please both configure your user at <a href="' + setupUrl + '">' + setupUrl + '</a> and also type, in Teams, "@'+bot_name+' configure transposit-email-address"';
    }

/*
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/references/js-operations
 */