# Client Base for React

## Configuration
The React application is configured by the server.

The App expects the following URL to be available on startup:
`http://localhost:8080/client-config`

This URL **must** return a JSON object having the following attributes:

```ts
{
  projectName: string
  customerName: string
  documentName: string
  logoURL: string
  fields: Object
  {
    type: string, one of "field", "[:field]", "[:lineItem]", "locale", 
    name: string
    columns: Object
    {
      <field_api_name>: {name: <field_display_name>}
    }
  }
}
```

## Usage
The App expects the following URL to be available for processing documents:
`http://localhost:8080/parse-doc`

This URL **must** return a JSON object having the following attributes:
```ts
{
  // "field"
  <field_api_name>: Object
  {
    page_n: int
    reconstructed: bool
    value: number | string
    confidence: float
    polygon: [ [float, float] ]
    bbox: [ [float, float] ]
  }
}
```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
