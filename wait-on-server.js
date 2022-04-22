(async () => {
    const ntlm = require('httpntlm');
    const fs = require('fs');

    const config = require('./cypress.json');
    const localConfig = fs.existsSync('./cypress.env.json') ? require('./cypress.env.json') : null;
    const userAccounts = localConfig && Object.keys(localConfig.userAccounts).length ? localConfig.userAccounts : config.env.userAccounts;
    const userDomain = localConfig && localConfig.userDomain ? localConfig.userDomain : config.env.userDomain;

    const timeoutInMs = 250;
    const username = Object.keys(userAccounts)[0];
    const password = userAccounts[username];

    let shouldRetryGet = true;

    do
    {
        console.log(`Preparing GET request to ${config.baseUrl} using ${userDomain}\\${username}`);

        await new Promise((resolution, rejection) => {
            setTimeout(() => {
                ntlm.get({
                    url: config.baseUrl,
                    username: username,
                    password: password,
                    workstation: 'default',
                    domain: userDomain
                }, function (error, result) {
                    if (!error && (result.statusCode >= 200 && result.statusCode < 300)) {
                        resolution(result);
                    }
                    rejection(result);
               });
            }, timeoutInMs);
        })
        .then((result) => {
            console.log(`Successful GET request to ${config.baseUrl}, received response: ${result.statusCode}`);
            shouldRetryGet = false;
        })
        .catch((result) => {
            console.error(`Failed GET request to ${config.baseUrl}, received response: ${result.statusCode}`);
        });
    }
    while (shouldRetryGet);

    return true;
})();
