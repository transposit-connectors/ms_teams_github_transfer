# GitHub Transfer

Transposit is an excellent tool to create operations that modularize frequently-used API calls in many apps. In addition, it's very simple to create a Microsoft Teams command in Transposit that automates a common task. This app demonstrates combining these two features into a single Microsoft Teams outgoing webhook that copies a GitHub file from one repo to another (or to another path in the same repo, or to another branch).

## Step through Transposit

  * Fork the app [https://console.transposit.com/t/transposit-sample/ms_teams_github_transfer](https://console.transposit.com/t/transposit-sample/ms_teams_github_transfer) (find the Fork button at the top of the editor view).

## Set up Microsoft Teams

  * You have to be an admin or able to create an application for your team. [More here](https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/outgoingwebhook).
  * Go to your Microsoft Teams interface and naviate to the 'Manage your team' screen.
  * Select the Apps tab.
  * Click 'Create an outgoing webhook'.
  * On that screen, fill out:
     * The name of your bot. This is how you'll call it from Microsoft Teams, so something like 'GithubFileCopier'.
     * The webhook URL. Go back to Transposit to get thisL. Go to **Deploy > Endpoints** and copy the webhook URL. Paste it into the Microsoft Teams application's **Callback URL** field. 
     * A description: "Copies files from one repo to the another, without leaving teams."
  * Save off the the security token that Teams provides. 
NS8lO1kyl8wtMWc2KSdDFobeU8sW7SMT4XyVIQFae5E=
  * Go back to Transposit. Go to **Settings > App Info** and create or set the environment variable `secret_key` to the value of the security token. 
  * Test the app in Microsoft Teams by typing `@GithubFileCopier`. You should receive the "Please configure your user" message.
    * Note that due to the fact this Transposit application authenticates against a Google account (as opposed to Microsoft Teams), you need to use that account email address when you run `configure email-address` within Microsoft Teams. 

## Do more!

  * Try updating the application to copy gists. You'll have to modify the oauth scope to include `gist`, which is under **Code > Data Connections > github > Configuration**. 
