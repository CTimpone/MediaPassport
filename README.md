# Media Passport

[Heroku link][heroku]

[heroku]: http://media-passport.herokuapp.com/

## Minimum Viable Product
Media Passport is a pseudo-GoodReads clone for television, on which users can:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [x] Create accounts
- [x] Create sessions (log in)
- [x] Write posts
- [x] Comment on posts
- [x] View program listings
- [x] Rate episodes
- [x] Create a personal show watch list
- [x] Can endorse user generated comment
- [x] Search for shows and episodes via title
- [x] Actions will fetch data from API to fill database

## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, Model/Schema Generation (<= 1 days)
User authentication will initially be setup traditionally per App Academy experience, entirely in Rails. Necessary model methods and associations to serve content to users/non-users will be created in this phase.  By end of phase, sample user should be able to navigate around a non-dynamic HTML version of the site, using show data manually generated in console.

[Details][phase-one]

### Phase 2: API Consumption and Searching (<= 2 days)
In this phase I will integrate the TVMaze API, in order to serve pertinent show and episode pages to user.  When navigating around the site, it will first attempt to access representative data from this projects database.  If no such page exists, it will check with the 3rd-Party API if there is valid data.  If there is, it will dynamically create the required page.

[Details][phase-two]

### Phase 3: Viewing Content/Creating Posts (~ 1.5 days)
This phase will the transition of the application to a Backbone front-end.  I will create the Backbone router to serve all routes up to this point in a single application, including authentication.

[Details][phase-three]

### Phase 4: Content Endorsement/Evaluation (~ 1 days)
In this phase I will add a polymorphic implementation to promote user generated content, including both posts and comments.  This will exist exclusively as a endorsement (there will be no equivalent downvote).  In addition, I will add the letter grading of a specific episode of a program.  Both actions are binary for content; one user cannot endorse or rate one piece of content repeatedly.

[Details][phase-four]

### Phase 5: Show Schedule (~ 1 days)
I will refactor the composite view on the landing page to focus on the schedule, which will show the new programs for the same day by default.  It will also allow for date changes, and network sorting entirely through Backbone.

[Details][phase-five]

### Phase 6: User WatchList & Recommendations (<= 2.5 days)
I'll add the ability for user's to favorite shows, which will be used to curate the landing page for the user with content primarily relevant to their favorites.  This will include posts (based on recommendations implemented in phase 4) and also upcoming episodes/specials (based on schedule implementation in phase 5).

I will also add recommendations based on comparison of the 'current_user' watchlist to other users watchlists, to improve discoverability.

[Details][phase-six]

### Bonus Features (TBD)
- [x] Add ActiveMailer user registration
- [ ] Add JQuery UI elements for dragging and dropping
- [x] Improve URL legibility (titles rather than IDs)
- [ ] More powerful content generation rather than plain-text
- [ ] Pagination/infinite scroll for user-content
- [ ] Separate reviews from posts into distinct model
- [ ] More in-depth privacy options
- [ ] Multiple sessions/session management
- [x] User avatars/gravatars
- [ ] Integrate other media APIs

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
[phase-six]: ./docs/phases/phase6.md
