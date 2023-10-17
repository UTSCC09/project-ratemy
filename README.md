# RateMy

###### Alina Buzila, Yuval Kamani, Priyank Dave


### Project Overview
RateMy is a web application designed for University of Toronto students, providing a platform to share feedback on courses and professors. It allows users to anonymously submit ratings and comments, with diverse metrics such as content difficulty, overall workload, usefulness in the real-world, professor responsiveness and help, and the quality of teaching. The platform also offers an intuitive representation of professor-specific course ratings and evaluations through diverse graphical representations. Users can view all course comments or filter their search based on professor and ratings.

Additionally, RateMy integrates the OpenAI API for in-depth analysis of the mentioned metrics. Students can ask questions such as a summary of positive course comments, the pros and cons of a specific course, or identifying the most effective professor for a course. Every user will receive three complimentary tries for the AI and have an option for unlimited access through a paid subscription.


### Technology Stack
- Node.js
- Express.js
- React.js
- MongoDB
- Tailwind CSS
- Render (https://render.com/) for deployment (will look into Vercel as well as a possible alternative)

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

#### Additional features to consider
- Users can input courses taken each semester, which will be visible on their profile page.
- Viewing mutuals enrolled in the same course as the user.
    - Students taking a course can be public to all.
    - Students taking a course can be public depending on a setting.
    - Can implement friend requests to make courses taken public to friends.


#### Acknowledgements for project proposal
ChatGPT https://chat.openai.com used for some rewording and formalizing.

[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/KRLE_tfD)
