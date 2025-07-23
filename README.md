# eCommerce App

A modern eCommerce dashboard built with React, Redux, and Material-UI. This project allows admins to view, manage, and update orders, users, and products in a user-friendly interface.

## Features

- **Order Management:**  
  View detailed order information, update order status, and see customer details.

- **Product & User Management:**  
  (Extendable) Manage products and users from dedicated pages.

- **Responsive UI:**  
  Built with Material-UI for a clean and responsive design.

- **Redux State Management:**  
  Uses Redux for predictable state management and async actions.

## Folder Structure

```
ecommerce-app/
├── public/
│   └── index.html
├── src/
│   ├── components/         # Shared React components
│   ├── dashboard/          # Dashboard-related pages
│   │   └── dashbordPage.jsx
│   ├── pages/              # Main pages (e.g., orderPage.jsx)
│   ├── slices/             # Redux slices (orders.js, user.js)
│   ├── App.js
│   ├── index.js
│   └── store.js
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/baha2ddin2/ecommerce-app.git
   cd ecommerce-app
   ```

2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```

3. **Start the development server:**
   ```sh
   npm start
   # or
   yarn start
   ```

4. **Open in your browser:**  
   Visit [http://localhost:3000](http://localhost:3000)

## Usage

- Navigate to the dashboard to view orders.
- Click on an order to see details and update its status.
- (Extendable) Manage products and users from their respective pages.

## Technologies Used

- [React](https://reactjs.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Material-UI](https://mui.com/)
- [React Router](https://reactrouter.com/)

## Backend

A backend app for this project is also available in the same GitHub account.  
Check the repository list on [your GitHub profile](https://github.com/your-username) for the backend source code and setup instructions.

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](LICENSE)