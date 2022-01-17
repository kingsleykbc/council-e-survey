
## SHANGRI-LA COUNCIL E-SURVEY

  

This is a production-ready online e-survey platform, where users send anonymous responses to surveys posted by the city council. It is a react PWA built with React and Next.js and firebase.

  

Application available at https://e-council.netlify.app.

  

This tools used for this application are:

  

- Next.js: Framework

  

- Firebase: Backend and database


- Netlify: Hosting


- TypeScript and tsx: Language

  

- Framer motion: Animation

  

- CSS: UI/Styling

  

- Relevant libraries/packages: React-icons, Chart.js, and React-qr-reader

  

The styles are entirely built from scratch in CSS alone, and framer motion is only used to animate some of the elements.

  

## Getting Started

  

### Application

  

First, Install modules

```bash
  npm install
  cd firebase/functions
  npm install
 ```
  


Next, run the development server:

  

```bash

npm run dev

  
# or


yarn dev
  

```

  

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

  

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

  

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

  

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

  

### REST API

  

The API can be accessed from any browser or HTTP request tool. The test API key is `TEST-TEST`.

  

Endpoint: https://us-central1-mnwcw2.cloudfunctions.net/widgets

  

## Code/Project Structure

  

All the application's code is contained in one folder and repository.

  

- Client application: root folder (`./`)

  

- Server: `./firebase/functions/index.js`