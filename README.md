# yasso

## Description

yasso is a running planning app that helps runners easily adapt and modify their training plan, keep a training diary and have an overview of their progress.

## User Stories

-  **Signup:** As an anon, I can sign up on the platform so that I can start adding my running plan
-  **Login:** As a user I can login to the platform so that I can see my running plan
-  **Logout:** As a user I can logout from the platform so no one else can use it
-  **Profile:** As a user I want to be able to update my details and add a profile picture
-  **Add Plan** As a user I can add a running plan so that I can keep a track of it and know my next session
-  **Update Plan** As a user I want to mark a session as complete once I finish it
-  **View Progress** As a user I want to have an overview of my running for the week to see how I am progressing
-  **Learn** As a user I want to learn about the different runs in my training plan

## Backlog

Plans:
- Training plans created that users can select
- Dynamic updates of plans based on user availability
- GPS data upload for runs
- Multi week training plans

Dashboard:
- Running streak to gamify progress

Styling:
- Light/Dark theme

Learn:
- Add additional resources
  
# Client

## Routes

- / - Homepage
- /auth/signup - Signup form
- /auth/login - Login form
- /onboarding - Onboarding
- /onboarding/add-plan - Create plan
- /onboarding/plan-added - Plan added
- /current-plan - View and edit plan
- /dashboard - Dashboard
- /learn - Learn
- /profile - User details

## Pages

- Home Page (public)
- Sign in Page (anon only)
- Log in Page (anon only)
- Onboarding
- Add plan
- Plan added
- View plan
- Dashboard
- Learn
- Profile

## Components

Component folders:

- Authentication
- Dashboard
- Dialogs
- HomePage
- Learn
- Navbar
- Plans
- RouteGuards


## Services

- Auth Service
    - signUp
    - logIn
    - verifyToken
    - uploadPhoto,
    - getCurrentUser
    - editUser
- Plans Service
    - addPlan
    - updatePlan
    - getCurrentPlan
    - deletePlan
    - revertPlan
    - getOriginalPlan
- User Service
    - getProfile
    - updateProfile

# Server

## Models

- User model
- OriginalTrainingPlan model

## API Endpoints/Backend Routes

- GET - /auth/me
- POST - /auth/signup
- POST - /auth/login
- POST - /auth/logout
- POST - /api/training/original/add-plan
- GET - /api/training/original/current-plan
- GET - /api/training/original/get-original-plan
- PUT - /api/training/original/update-plan/:id
- PUT - /api/training/original/revert-plan/:planId
- DELETE - /api/training/original/delete-plan/:userId


## Links

[Client repository](https://github.com/ollie-j-j/yasso-project-client/tree/main)
[Server repository Link](https://github.com/ollie-j-j/yasso-project-server)

[Link to yasso](https://yasso-run.netlify.app/)