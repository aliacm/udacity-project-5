# General
This app takes the traveler's destination and travel date, and returns the temperature and weather conditions at that location on the specified date,
as well as an image of the destination.

# Setup
To avoid the CORS issue, ensure that cors is installed.

To begin, run <code>npm run build-prod</code>, then <code>npm start</code>.

# Development Strategy
To fufill the extra option, I am returning an image of the region if no image of the city is found.

# Comments
I decided to require the postal code as well as the city name because there are often multiple cities with the same name per country. 


