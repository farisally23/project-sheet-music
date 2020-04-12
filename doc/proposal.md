# CSCC09 Project

## How to Run
1. Install yarn, if not installed already
2. Checkout the code from the repo, and make a new branch if developing
3. Navigate into the project folder, and run `yarn install` to install the dependencies
4. Then navigate into the server folder, and run `yarn install` to install the backend dependencies
5. In the server folder, run `yarn start`. This should start the server on localhost:4000, and will open a GraphQL playground where queries can be executed.
6. Open another terminal, and in the main project folder, run `yarn start`, this will start the app on localhost:3000.

## Team Members

| Name | 
| ------ |
| Yunan Shi(Anny) | 
| Aviral Verma | 
| Faris Ally | 

## Project Description
-  Detects the pitch which user is speaking or singing at  
-  Can take in music files and show their pitch  
-  Compare your pitch with the song pitch  
-  Can sing into the application, and generate sheet music for it which can then be exported to pdf  
-  Save your previous recordings to be able to view it multiple times  
-  User Accounts  
-  Allow users to practice with vocal exercises  
-  Connect with social media?  

## Beta Version Features (Key Features)
-  Pitch detection
    - When the user speaks (sings) into the microphone, the application will be able to detect the pitch that the user is           speaking at
-  Graph generating
    - The app will generate a graph of the user's speaking pitch, showing how high or low the pitch is
-  Audio saving
    - The user can save their audio recordings, and then replay them later
-  Show required pitch for a song or vocal exercise
    - The app will show a required pitch, and measure whether the user is meeting that pitch
-  Take in music files
    - The app will take in an audio file, and measure the pitch at parts of that file

## Final Version Features
-  Music sheet generating
    - The app will be able to generate sheet music from given audio
-  User Accounts
    - Users will be able to make accounts and login to the application, so they can keep track of their recordings and files
-  Making public and private music/sheet files
    - Users will be able to share their music with others or can choose to keep it private
-  Collaborate music with other users and having different branches
    - Users will be able to share their music with other users who they choose, and view each others files
-  Connect with social media
    - Users will be able to share their music/audio on social media

## Technology Outline
-  MySQL as Database  
-  ReactJS for Javascript  
-  APIs :  
    -   https://github.com/cal-pratt/SheetVision  
    -   https://flat.io/developers/docs/embed/javascript.html  
    -   Pitch detector: https://github.com/cwilso/pitchdetect  

## Top 5 Techincal Challenges 
1.  Learning the ReactJS and MySQL  
2.  Changing a song to pdf format  
3.  Storing audio to database  
4.  Collaborating music   
5.  Detecting pitch  


