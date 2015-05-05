# Media Passport

[Live Page][live]

[live]: http://media-passport.com/

## Summary
Media Passport is a collection and discussion platform for television inspired by GoodReads and AVClub.  It polls a third-party RESTful API to populate the television program information.  It is a single-page web application built on Ruby on Rails with Backbone.js.

## Details

### API Interfacing
The program and episode data for the programs is populated from the API at TVMaze.  It utilizes three separate points of entry for Media Passport: today's schedule, show search, and episodes for a specific show.

The schedule point of entry is used for the daily schedule landing page of Media Passport.  If necessary, after polling the foreign data, it performs two types of batch creation.  As episodes cannot exist independently from a show, it first verifies whether or not the show itself is in the database.  Afterwards, it also creates a local entry for the actual episode.  Custom routes are employed so that, regardless of the number of entries on the schedule from the API, it only sends two batch requests, at most, to the Media Passport servers.

The two other points of entry use very similar logic locally.  The API show search is accessed only on a local search (facilitated primarily through the gem pg_search).  The episodes entry point is utilized when a user visits a specific show page on Media Passport.  In each instance, all listed shows and episodes, respectively, get run through a custom Create/Read/Update functionality.  If the data does not exist at all locally, it is created.  If it matches exactly, no changes are made.  If some aspects of the local data, however, are generic defaults, and the foreign data is not, it instead performs an update.

### Accounts
Media Passport has a custom built account system.  Accounts, on creation, allow the user to upload a user avatar (functionality provided by Paperclip in conjunction with AWS).  Accounts require an email, and can only be used once they use the activation link sent by the ActiveMailer.  Being logged in allows users to rate episodes.

### Watchlist/Recommendations
Users with accounts can follow specific shows by adding them to their Watchlist.  This allows for quicker access to some information on those desired shows.  In addition, Media Passport uses a custom recommendation methodology to dynamically compare shows on a user's Watchlist with other users' Watchlists to recommend additional shows to add to the Watchlist.  This is accomplished almost entirely in a custom SQL query that examines their followed shows to find users with common tastes, and then of those users finds the most common followed shows, above a certain threshold, to recommend.

### Posting, Commenting, and Voting
Every episode for every show allows users to create text posts.  Other users can then comment on that post, comment on the other comments, or simply edit their own comments all on the same page.  The post display page uses regex functionality to ensure that only a single form is present.  In addition to posting and commenting, users can also interact with this content by endorsing, or liking, the posts and comments. 
