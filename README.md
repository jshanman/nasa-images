### Challenge

Build a web app that displays images taken by NASA's Mars rovers, Opportunity and Curiosity.


### Instructions

* Use the API key `aZlmHCp3jD9sanwE8KvytidYArlTvlhwr3fEhYyM` to get rover image data from NASA's [Mars Rover Photos API](https://api.nasa.gov/api.html#MarsPhotos).

* Develop a UI based on the included wireframes and user stories. You can use any libraries and/or frameworks you like. If a story is lacking enough detail, use your best judgement. 

* Document the build and installation processes.

* At the end of 2 hours, upload your app to your github repo and send the url to your Studio Tech contact. You may continue to check in code afterwards if you like.


### User Stories

* As a user, when the page loads, I can see the 'Image of the Day', a random image selected from those taken yesterday by either rover.

* As a user, I can navigate to a gallery displaying images taken yesterday by either rover.

* As a user, I can filter the images by camera name.

* As a user, I want to see dates formatted in the style `Month dd, yyyy`.

* As a user, I want the app to be responsive.

* **STRETCH**: As a user, I can specify the earth date for which to display images.

### Environment Requirements
* npm


### Build Instructions
* clone repo
* npm install
* npm start
* open http://localhost:3000

Service

NasaImageService

getImages(filter) (day, rover, camera)

getRandomImage(day)

Models
NasaImage

Controller/Views
Home
Gallery

todo
x setup github target
x install primeng webpack angular2
x create service, connect to api via http
x create home view
x display random image
x create menu with home and gallary
x add date filter
x create gallary view
x list all photos from yesterday, display date
x add camera name filter
x add date selector to gallery
- add gallery tests
- add image of the day tests
- remove bloat from starter lib