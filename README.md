# bw-emailer

## How to install and run your service
```
git clone https://github.com/MystiquePanda/bw-emailer.git
cd bw-emailer
yarn install
yarn prod:start
```
If you dont have yarn - you can install from here: https://classic.yarnpkg.com/en/docs/install/#mac-stable

to switch over between email APIS, Change the DEFAULT_EMAIL_API in .env fille

## Which language, framework and libraries you chose and why
I chose node/express - because 1) it is quick to get functioning application (in compare to my other option of Java) 2) easy to scale up by running more instances when needed (ie. when a batch job for email is running) 

## Tradeoffs you might have made, anything you left out, or what you might do differently if you were to spend additional time on the project
I left out including the plaintext - the spec didnt specfiy where to add it, I left a function I would use to convert the body to plaintext.
if I had more time...
* I'd go back and work on all the //TODOs left in the code.
* improve the coverage of the testcases - Did not have enough time to do negative case testings
* make sure the edgecases fail gracefully from email client pov.  
* more descriptive success/fail message for client. 
* I would refactor the structure of the code a bit, pull out the validation and plaintextfy out into its own utility file. 


## Anything else you wish to include.
1. Apparently I can't type as fast as I thought, non-syntacticals typos when coding under time limits! - ie. missing <> around email on the spendgrid API
2. For a real-world email service, I would have put in an automatic failover rather than require a restart to switchover - ie. 10 continueous failed send then switch over to other API
