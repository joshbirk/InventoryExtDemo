# Inventory Ext JS Demo
This demo uses a Node.js proxy to authenticate and communicate back to the Salesforce Platform.  It uses an username-password flow with OAuth for authentication, grabs the current merchandise from the org, allows users to create an invoice and send the invoice back to a custom Apex REST endpoint for submission.  It also receives PushTopics from the Salesforce Streaming API for realtime updates on price reductions, which will update the entire interface (including the Invoice if the price reduction is lower than the current unit price).

=Requirements=
This demo is meant to be used alongside the Warehouse Demo for Senchacon, available as an unmanaged package here:
[http://sencha-demos.herokuapp.com/sencha_vf ](http://sencha-demos.herokuapp.com/sencha_vf)

## Register for a Developer Edition Instance on Force.com

On the Salesforce Platform, you can get a Developer Edition licensed instance (which is sometimes called an org, short for organization).  This instance is completely free and never expires, meaning that you can build your applications without a risk of cost.

In order to get a Developer Edition instance, go here:

[http://developer.force.com/join ](http://developer.force.com/join)

## Creating a Connected App Definition on Force.com
For a third party application to communicate with Salesforce API’s
securely, they must have a Connected App definition.  This will give
the app the keys required to identify itself  and allow a Salesforce
admin to control it:

1. Log into your Developer Edition Org.
2. Open the Setup menu by clicking [Your Name] > Setup.
3. Create a new Connected App by going to App Setup > Create > Apps.
4. Click the ‘New’ button in the Connected Apps list.
5. Fill out all required fields and click ‘Save’:
6. Connected App: YourAppName
7. Developer Name: YourAppName
8. Contact Email: Your email
9. Callback URL: https://(yourapplicationurl)/index.html

NOTE: Callback url <b>must</b> have an https:// secure URL, or run on localhost.
Select all available OAuth scopes


## Installation
After cloning the project, the following environment variables must be created:

1. SFUSER=username of the API user
2. SFPASS=password of the API user
3. CLIENTID=Consumer key of the Connected App
4. SECRET=Secret key of the Connected App
5. CALLBACK=Callback URL of the Connected App

```
export SFUSER="your@DevEd.com"
export SFPASS="pwd"
export CLIENTID="3MVG9A2kN3Bn17hv.OQhYu2oiaRzVT"
export SECRET="clientSecret"
export CALLBACK="http://localhost:3000/"
```

## Using Heroku
1. Create the Heroku Application. 
		heroku apps:create
or
        heroku apps:create {appname}
Where {appname} refers to the desired app name.  Without the app name set, Heroku will autogenerate a random appname for you.  This will create the remote endpoints for deploying to Heroku.

2. Deploy to Heroku. With Heroku, this can be done easily using git to push the code.  On the command line, enter: 

        git push heroku master

3. Use heroku `config:add VAR=VALUE` to create the process variables

```
config:add SFUSER="your@DevEd.com"
config:add SFPASS="pwd"
config:add CLIENTID="3MVG9A2kN3Bn17hv.OQhYu2oiaRzVT"
config:add SECRET="clientSecret"
config:add CALLBACK="http://localhost:3000/"
```
