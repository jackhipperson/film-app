# Film App

Welcome to the Film App! This is a web application that allows users to search for movies, save their favourites, and manage a watch list. The application is built using React with TypeScript, utilising TheMovieDB API features. It includes unit testing with Jest and end-to-end testing with Playwright. It is deployed on Vercel. CSS styling is TailwindCSS and icons are [HeroIcons](https://heroicons.com/).

## Features
- Search for movies by title - the api will populate film results sorted on rating.
- Save favourite movies using the heart icon. This will help populate the recommended screen, which uses the favourite film IDs to do a recommended search at TMDB through it's API.
- Scroll through recommended films and add to the watch list.
- Manage a list of films to watch.

## Demo
Check out the live demo of the application [here](https://film-app-roan.vercel.app/).

## Installation
To get a local copy of the project up and running, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/jackhipperson/film-app.git

2. Navigate to the project directory:
   ```bash
    cd film-app

3. Install the dependencies:
    ```bash
    npm install

4. You will need an free API key from [TheMovieDB](https://developer.themoviedb.org/docs/getting-started) to run API searches.

5. Once obtained, create a .env file in the project root and place the API key under the variable REACT_APP_API_KEY:
    ```bash
    REACT_APP_API_KEY=[Enter api key here] 

## Usage
1. To start the development server, run:
    ```bash
    npm start

2. The app will be available at http://localhost:3000.

## Technologies
- **React**: A JavaScript library for building user interfaces.  
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.  
- **Jest**: Unit testing for each component.  
- **Playwright**: end-to-end testing framework that allows for reliable and fast testing of web applications across multiple browsers.  
- **TailwindCSS**: CSS styling and HeroIcons.  
- **Vercel**: Deployment platform for modern web applications.  
- **TMDB API**: The Movie Database API for fetching movie data.  

## Testing
This project includes unit tests and end-to-end tests to ensure the application works correctly.

#### Running Unit Tests
- To run the unit tests using Jest:
    ```bash
    npm test --verbose

#### Running End-to-End Tests
- To run the end-to-end tests using Playwright:
    ```bash
    npx playwright test

- To test using the Playwright UI:
    ```bash
    npx playwright test --ui

## Contributing
Contributions are welcome! If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request.

1. Fork the repository.
2. Create a new branch:
    ```bash
    git checkout -b feature/your-feature

3. Make your changes.

4. Commit your changes:
    ```bash
    git commit -m 'Add some feature'

5. Push to the branch:
    ```bash
    git push origin feature/your-feature

6. Open a pull request.

