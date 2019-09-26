# Microsoft Teams GitHub transfer command

Transposit can help you bring the power of APIs into your chat environment. This app creates a Microsoft Teams outgoing webhook that copies a GitHub file from one repo to another (or to another path in the same repo, or to another branch). You don't even have to leave your MS Teams chat room.

## Before you begin

  * Sign up for a free Transposit account.
  * Sign up for a free Sendgrid account.
  * You have to be an admin or able to create an application for your team. [More here](https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/outgoingwebhook).

## Configure Transposit

  * [Fork the app](https://console.transposit.com/t/transposit-sample/ms_teams_github_transfer) (find the Fork button at the top of the editor view).
  * Configure the Sendgrid data connector.

## Configure Microsoft Teams

  * Go to your Microsoft Teams interface and navigate to the 'Manage your team' screen.
  * Select the Apps tab.
  * Click 'Create an outgoing webhook'.
  * On that screen, fill out:
     * The name of your bot. This is how you'll call it from Microsoft Teams, so something like 'GithubFileCopier'.
     * The webhook URL. Go back to Transposit to get thisL. Go to **Deploy > Endpoints** and copy the webhook URL. Paste it into the Microsoft Teams application's **Callback URL** field. 
     * A description: "Copies files from one repo to the another, without leaving teams."
  * Save off the the security token that Teams provides. 
  * Go back to Transposit. Go to **Settings > App Info**.
    * Set the environment variable `secret_key` to the value of the security token. 
    * Set the environment variable `from_email` to whatever email address will send your verification email. 
  * Test the app in Microsoft Teams by typing `@GithubFileCopier`. You should receive the "Please configure your user" message. 
    * Follow the instructions. 
    * Note that the email can sometimes take a few minutes to arrive due to being on Sendgrid's free tier.
    * Note that due to the fact this Transposit application authenticates against a Google account, you need to use the google account email address when you run `configure email-address` within Microsoft Teams. 

## Watch out for this

  * If the webhook doesn't respond in 5 seconds you'll get an error.
  * If you cut and paste the botname, it won't work. You have to type the botname, but you can cut and paste other commands.
