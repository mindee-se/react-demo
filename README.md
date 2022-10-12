# Front-End Demo Using React

## Configuration
The React application is configured by the server.

The App expects the following URL to be available on startup:
`http://localhost:8080/client-config`

This URL **must** return a JSON object having the following attributes. It is necessary to map the field with the displayed form :

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
    color: string, could be "red", a rgb value or an hexa value
    columns: Object
    {
      <field_api_name>: {name: <field_display_name>}
    }
  }
}
```

Here an example (it could be working with any kind of documents type) :

```
{
  "projectName": "My example Project",
  "customerName": "My awesome Customer",
  "documentName": "Invoice",
  "logoURL": "https://upload.wikimedia.org/wikipedia/commons/a/a9/Example_title.png",
  "fields": {
    "locale": {
      "type": "locale",
      "name": "Locale"
    },
    "total_incl": {
      "type": "field",
      "name": "Total (w. tax)",
      "color": "coral"
    },
    "total_excl": {
      "type": "field",
      "name": "Total (w/o tax)",
      "color": "lavender"
    },
    "invoice_date": {
      "type": "field",
      "name": "Date",
      "color": "gold"
    },
    "invoice_number": {
      "type": "field",
      "name": "Number",
      "color": "mauve"
    },
    "due_date": {
      "type": "field",
      "name": "Due",
      "color": "rgb(162, 215, 219)"
    },
    "taxes": {
      "type": "[:field]",
      "name": "Taxes",
      "color": "#00eeff"
    },
    "supplier": {
      "type": "field",
      "name": "Supplier",
      "color": "teal"
    },
    "supplier_address": {
      "type": "field",
      "name": "Locale",
      "color": "orange"
    },
    "customer_name": {
      "type": "field",
      "name": "Customer",
      "color": "purple"
    },
    "customer_company_registration": {
      "type": "field",
      "name": "Customer Registration",
      "color": "red"
    },
    "customer_address": {
      "type": "field",
      "name": "Customer Address",
      "color": "grey"
    },
    "payment_details": {
      "type": "[:field]",
      "name": "Payment Info",
      "color": "dark"
    },
    "company_number": {
      "type": "[:field]",
      "name": "Company Numbers",
      "color": "yellow"
    },
    "total_tax": {
      "type": "field",
      "name": "Total Tax",
      "color": "green"
    },
    "line_items": {
      "type": "[:lineItem]",
      "name": "Line Items",
      "color": "blue",
      "columns": {
        "item_id": {
          "name": "Item"
        },
        "description": {
          "name": "Description"
        },
        "quantity": {
          "name": "QTY"
        },
        "unit_price": {
          "name": "Unit Price"
        },
        "price_amount": {
          "name": "Total Price"
        },
        "upc": {
          "name": "UPC"
        }
      }
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
