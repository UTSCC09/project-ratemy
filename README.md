# RateMy

## Project URL

https://ratemyc.vercel.app

## Project Video URL

**Task:** Provide the link to your youtube video. Please make sure the link works.

## Project Description

RateMy is a web application designed for University of Toronto students, providing a platform to share feedback on courses and professors. It allows users to anonymously submit ratings and comments, with diverse metrics such as content difficulty, overall workload, usefulness in the real-world, professor responsiveness and help, and the quality of teaching. The platform also offers an intuitive representation of professor-specific course ratings and evaluations through diverse graphical representations. Users can view all course comments or filter their search based on professor, ratings, etc.

Additionally, RateMy integrates the OpenAI API for in-depth analysis of the reviews such as asking the AI for a summary of positive course comments, the pros and cons of a specific course, identifying the most effective professor for a course, etc. Every user will receive three complimentary tries for the AI and have an option for unlimited access through a one-time payment.

## Development

### Tech Stack:

- Node.js
- Express.js
- React.js
- MongoDB
- Tailwind CSS
- Vercel (frontend deployment)
- Render (backend deployment)

### Frameworks/Libraries/Third-Party APIs:

- OpenAI API
- Auth0
- Stripe API
- Chart.js
- Material UI

## Deployment

We used Vercel to deploy the frontend of our application (React) and Render to deploy the backend of the application (Node.js/Express.js)


## Challenges

**Task:** What is the top 3 most challenging things that you have learned/developed for you app? Please restrict your answer to only three items.

1. The get total ratings endpoint was difficult because of the different forms of aggregation and mongodb functions. The documentation helped but it was still difficult to write the correct logic to aggregate our format of data.
2. Auth0 has many different ways that you can integrate a web application and a lot of middleware available, so finding the proper way to do it and making sure it works in deployment including getting the OAuth credentials for Google was a challenging and interesting thing to learn about.
3. The Stripe API is not documented very well and there are multiple ways to integrate it. Searching through different examples and ways to implement took a while but eventually, we figured it out!

## Contributions

### Yuval Kamani

Responsible for the development/design of:

- Stripe API (frontend + backend)
- Add Course (frontend)
- OpenAI integration (frontend)
- Homepage (frontend)
- Reviews page (excluding average reviews or graphical representations)
- Edit review (frontend)
- Pagination

### Alina Buzila:
- project setup and routing
- POST/GET reviews endpoint and schema updates for error and parameter handling, areas of ratings (backend)
- Reviews page, GET request to get reviews, display reviews (frontend)
- Add review form (frontend)
- Total ratings endpoint (backend) and Chart js integration (frontend)
- average ratings (backend) and display (frontend)
- Search courses backend and frontend
- sort and filter (frontend)
- POST review update to add professor to course database, professor dropdown

### Priyank Dave:
- OpenAI integration (backend)
- OpenAI integration with Stripe logic (backend)
- Auth0 Integration (Frontend and Backend)
- Edit and Delete Reviews (Backend)
- GET/POST Reviews endpoint (backend)
-  sort and filter reviews (backend)
- Deploying
- GET/POST Courses endpoint (backend)
- Course and Review Schema (DB)
# One more thing?

**Task:** Any additional comment you want to share with the course staff?



## Notes

### 5 Technical Challenges
- **OpenAI API Integration:** Integrating ChatGPT to provide various metric analyses of ratings and comments data. Some possible queries would be displaying a summary of positive course comments, the pros and cons of a specific course, or identifying the most effective professor for a course.
- **Stripe Integration:** To handle payments for unlimited access to AI metric analysis features.
- **Auth0:** To seamlessly authenticate users when registering or logging in.
- **Twilio & SendGrid:** To send emails and SMS after registration to validate email address. Send email when sign up to advertise paid subscription.
- **Chart.js:** To create and display graphical representations of course related metrics.


### Key features completed for Beta Version
- **Rating and commenting on courses:** Users will be able to search for a course by course name or course code and add a rating and comment on the course. They will be asked to specify the professor they took the course with and rate their experience in a variety of aspects including content difficulty, overall workload, usefulness in the real-world, professor responsiveness and help, and the quality of teaching.
- **Filtering ratings and comments** based on professors, overall ratings, and metric specific ratings.
- **Graphical representations** of course metrics.
- **User authentication**


### Key Features completed for Final Version
- Open AI API integration.
- Twilio & sendgrid for email and SMS notifications.
- Stripe integration for payments, paid subscription.
- Create and display graphical representations of course related materials using chart.js.
