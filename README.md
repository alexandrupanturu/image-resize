# Image-Resize


## About ##

REST API Service that serves locally stored image files ( jpeg ) with custom resolution.
Developed in Typescript using node js and sharp library



## Installation ##

```
git clone https://github.com/alexandrupanturu/image-resize.git 
```

## Locally instalation ##

.env file example:

````file
HTTP_PORT=9090
````

````
npm install
npm start ## will start the service
npm run dev ## will start the service using nodemon and watching .ts files for changes
````

## Docker installation ##
````
docker-compose up -d
````
This will start the node application service and also the varnish service.
Varnish has a simple vcl configuration that will store each request by the url. So duplicated requests will be served by the varnish and the request will no longer hit the backend ( node app)

## Info ###

http://localhost/images/img1.jpg - will show the original image

Available query parameters are:
 - width : the width that image should be resized
 - height: the height that image should be resized
 - doNotPreserveAspectRatio: do not preserve aspect ratio and resize the image by width and height

http://localhost/images/img1.jpg?width=700&height=501&doNotPreserveAspectRatio - this request will return the image on 700x501 
http://localhost/images/img1.jpg?width=700&height=501 - this request will try to return the image on 700x501, but preserving the aspect ratio

Folder where the images can be uploaded is ./images

Node application also has the swagger-stats library and this will provide statistics for the service. 
UI available at http://localhost/swagger-stats/ui

