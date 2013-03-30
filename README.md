Bottle-Sample
======

**A simple Node.js app that uses Express, Passport(-twitter), and Mongoose packages.**

## Purpose

I made this app because I liked the concept it's built around. I had an idea for an app that mimics the real-life occurance of throwing a message in a bottle into the ocean and someone somewhere finding it. I've just recreated that experience on the internet (because I don't prefer the beach). It is a single page web app with a JSON API and includes both server-side and client-side code and markup.

**Why Open-Source?** Well, I just don't see this as a money-maker app. It is pro-anonymity and not going to ever take a profit from the user base. I'll keep it alive somewhere soon, but have no intention of building it out further. (If I do I'll put all the changes right here.) The app was developed in 6 hours, it was great practice if anything.

**Playground** The app works! That's the major thing. Depending on how far you read into it, this app could be an exmaple of how to use express, passport, and/or mongoose. Hopefully it helps someone. I would like to think the code is self explanatory. There is not much documentation on Node and Twitter signin, so that's something to look at.

## Usage

To download with npm (Node Package Manager):

    npm install bottle-sample

After downloading this project, switch to it as the current directory, and run the following command:

    npm install

### config

Now you need to do a little setup of your own, mainly for Twitter. You'll need to grab your consumer-key and consumer-secret tokens from your Twitter app (make one at [dev.twitter.com][1]) and put them in your config.js file. You'll also need to get your MongoDB server up and running and name a new database. That new database's mongodb:// url will need to be put into the config also. 
    
You can now run it by typing:

    node server.js
    
Happy programming! Follow me on Twitter (for some stupid reason): [@compooter](http://twitter.com/compooter).

[1]: http://dev.twitter.com/
