# 🎟️ Box Office: Interactive Movie Reviews

## Statement of Purpose
We are the Powell Rangers.
Our goal is to create a more interactive and visually engaging alternative to traditional movie review sites like Rotten Tomatoes. Rather than building another text-heavy review platform, we want to capture the excitement of the cinema experience by combining the ideas of a mailbox, Letterboxd, and the classic box office one sees at a classic theatre. We recognize while there are movie review sites, a problem is that none of them gives a good user experience and design that would be easy enough for people of all ages to use with a visually appealing design. Most movie review sites aim to cater towards critics and industry people while adding common movie watchers as their last target audience. Furthermore, while the movie review websites are presented to the public, the Box Office would be able to provide each user with a more personalized and private platform for them to journal, customize, and review their own movie records. Therefore, our solution would be creating an interactive user-friendly movie review site with everyday people being the target audience in contrast to modern movie review sites.
Users will be able to create, edit, and display movie reviews in the form of personalized ticket stubs. In addition, the users will be able to record what day they watched the movie, a major contrast compared to other sites. Through simple interactions like hovering and clicking, users can explore movie posters, view detailed reviews, and add their own ratings. Inspired by elements of theaters — ticket booths, film reels, and cinema colors — our platform will make reviewing movies feel as memorable as watching them.

## Inspiration and Digital Concept
Cinema: Movie posters, ticket stubs, box office attendees, popcorns.
Letterboxd meets Mailbox: A fusion of visual review logs and personalized collections.
Interactive Elements: Hovering to preview a movie, clicking to view full user ratings and reviews.
Color Palette: Red, black, white, and yellow, classic cinema aesthetics. 
Existing Problems: apps are either too basic or have too much going on (lack of personalization), existing apps contain reviews that have biases or fake

## User Personas
- Persona 1: Amy (13, Casual Movie Watcher)
Wants a fun, simple way to track watched movies.
Prefers quick visual interactions rather than writing essays.
Likes customizing her own aesthetic ‘journal’ of movies
Wants to record in her reviews of who she is watching the movies with
- Persona 2: Brian (35, Film Enthusiast)
Loves curating a personal film diary.
Wants the ability to edit and update past reviews easily.
Wants visually interesting reviews, rather than textboxes
- Persona 3: Charles (20, Student)
Doesn’t really keep track of movies/tv shows watched
Adds to ranking lists/ratings spontaneously
Wants to retrieve information when needed easily
Doesn’t like clutter
- Persona 4: Granny Apple (80, Cinema Buff)
Loves to go to movies just like how she did in her youth
However technology these days such as letterbox or rotten tomatoes are rather complicated with a not friendly user interface, when she just wants to look at her own reviews
She would like a convenient method of marking down the days she watches movies and her review on the go
- Persona 5: Zillian (40, Wife with Adhd)
Wants to look for something fun she can do with her wife
However she would like for any website to be simple because she can be overwhelmed by the complex menus that rotten tomato offers due to her adhd
She would prefer something with a simple/fun interface yet engaging unlike letterbox
Filling out movie reviews with her wife on one account can add to their movie watching experiences



## Website Flow
Our app simulates the experience of purchasing a movie ticket at a box office. On the landing page, users can scroll through a display of “posters,” each representing a movie review.
Users can interact with the posters in two ways:
- Hover: Briefly preview the movie's title and key details, similar to a Google search result.
- Click: View the full review, including the user’s rating (out of five stars or with popcorn animation) and any additional comments. On this page, users also have the option to edit or delete the review.
If the user chooses to interact with the box office attendant, they are prompted to create a new poster by uploading an image, adding a movie title, writing a short review, and assigning a rating. Once submitted, the new poster is added to the box office display.
The flow is designed to keep the interaction playful and intuitive, mirroring the feeling of browsing and collecting tickets at a real movie theater.

If the user wants to add a new movie review, the “steward” of the movie box will help them. By clicking on them, a template is brought up for the user to add to. First, they are prompted to add to the front of the poster, placing any image or clip from the media that they are reviewing that they think represents it the best. After saving this, they are then presented with the backside of the poster, which they can fill out with their review of the media. Once finished and saved, their poster will be visible in the movie box for them to come back to later once they need it.

In addition to this, if the user rewatches a movie, they can update their original posts. By scrolling through each of their posters, they can select them and adjust them accordingly. These features are implemented through the following ways:

- Edit: The poster is opened in it’s “template” form. This is similar to when the user first creates their poster, however, the information is filled in. The user is allowed to adjust the front and back data, and can submit their changes once finished.
Delete: The data is removed from the poster display. The user is prompted if they are sure of their changes, and then proceeds accordingly.

## Risks and Rabbit Holes
### Key Risks:
- Spending excessive time perfecting animations (popcorn popping, hover transitions)
- Sacrificing user experience due to time constraints 
- Focusing too much on developer experience while neglecting user experience
- Overbuilding features like user authentication or friend systems
- Data isn’t saved correctly, formatting is inconsistent across different features
### Rabbit Holes to Avoid:
- Overcomplicating UI animations before core features are working
- Getting stuck on the Website Design especially on the layout of the website
- Creating a sophisticated tagging/filtering system for movies (out of scope for 5 weeks)
- Spending too much time on “are you sure” options, redundancies
### Mitigation Plan:
- Focus first on a working MVP: create, view, edit, delete ticket stubs
- Only add non-essential animations or advanced UI after core functionality is complete
- Set a clear design that everyone agrees on in order to work to focus on a top-bottom development to maximize the development process with a large group

## MVP Scope (Minimum Viable Product)
- Working landing page with poster cards
- Functional hover preview
- Clicking to view full review
- Create, edit, and delete review tickets
- No user login or profiles — all reviews are stored locally
- Data is structured, formatted, and displayed correctly

