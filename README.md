# SCI-Trade Platform

**SCI-Trade Opportunity Index** - Discover new trade opportunities and networks within Africa under the African Continental Free Trade Area (AfCFTA).

## 🌍 About

SCI-Trade presents immediate opportunities for trade flows under AfCFTA across Africa. The platform provides comprehensive trade data, opportunity indices, and market insights to facilitate intra-African trade and economic integration.

## 🚀 Features

- **Trade Opportunity Discovery**: Explore trade opportunities across African countries
- **Commodity Analysis**: Detailed commodity trade data and insights  
- **Country Profiles**: Comprehensive country-specific trade information
- **COPI Ranking**: Commodity Opportunity Index rankings
- **POPI Analysis**: Product Opportunity Index analysis
- **Interactive Maps**: Visual representation of trade data across Africa
- **Report Generation**: Downloadable trade reports and analytics
- **Payment Integration**: Flutterwave payment gateway for premium features

## 🛠️ Tech Stack

### Frontend
- **React** 16.13.1 - JavaScript library for building user interfaces
- **React Router DOM** - Client-side routing
- **Redux** + **Redux Thunk** - State management
- **Chakra UI** - Modern React component library
- **Framer Motion** - Animation library
- **Sass/SCSS** - CSS preprocessor for styling

### UI Components & Libraries
- **RSuite** - React component library
- **React Helmet** - Document head management
- **React Share** - Social media sharing components
- **React Copy to Clipboard** - Clipboard functionality

### Data & Visualization
- **Axios** - HTTP client for API requests
- **Numeral.js** - Number formatting
- **File Saver** - File download functionality
- **Query String** - URL query parameter parsing

### Payment Integration
- **Flutterwave React** - Payment processing
- **React Flutterwave Rave** - Payment gateway integration

### Development Tools
- **Create React App** - Build toolchain
- **Cross-env** - Environment variable management
- **Sass** - CSS extension language

### Deployment
- **Netlify** - Static site hosting and deployment
- **GitLab CI/CD** - Continuous integration and deployment

## 🔗 Related Repositories

- **Backend API**: [https://github.com/cchub/sci-backend](https://github.com/cchub/sci-backend)

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js (v14 or higher)
- Yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/cchub/sci-github.git
cd sci-github
```

2. Install dependencies:
```bash
yarn install
```

3. Set up environment variables:
```bash
cp .env.example .env
```
Edit `.env` and add your API keys:
- `REACT_APP_IPSTACK_KEY` - IP Stack access key
- `REACT_APP_FLW_PUB_KEY` - Flutterwave public key

4. Start the development server:
```bash
yarn start
```

The application will open at [http://localhost:3000](http://localhost:3000)

## 📜 Available Scripts

### `yarn start`
Runs the app in development mode with staging API endpoint.

### `yarn build-staging`
Builds the app for staging environment using `https://api.sci.cchub.info`

### `yarn build-production`
Builds the app for production environment using `https://api.scitrade.africa`

### `yarn test`
Launches the test runner in interactive watch mode.

### `yarn eject`
**Note: This is a one-way operation!** Ejects from Create React App configuration.

## 🏗️ Project Structure

```
src/
├── assets/          # Images, fonts, and static assets
├── components/      # Reusable React components
├── landingPage/     # Landing page sections
├── pages/           # Main application pages
├── redux/           # Redux store, actions, and reducers
├── utils/           # Utility functions and API calls
├── App.js           # Main application component
└── index.js         # Application entry point
```

## 🌐 API Endpoints

- **Staging**: `https://api.sci.cchub.info`
- **Production**: `https://api.scitrade.africa`

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.MD](CONTRIBUTING.MD) for guidelines.

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit them
4. Push to your fork and submit a Pull Request

## 📄 License

This project is licensed under the **GNU General Public License v3 (GPLv3)**.

You are free to:
- **Share**: Copy and redistribute the material in any medium or format
- **Adapt**: Remix, transform, and build upon the material

Under the following terms:
- **Open Source**: If you modify this software and distribute it, your new version must also be licensed under GPLv3
- **Attribution**: You must give appropriate credit to SciTrade

See the [LICENSE](LICENSE.txt) file for the full text.

## 🏢 Powered By

**Co-creation Hub (CcHUB)** - Africa's leading technology innovation ecosystem.

---

For more information about the SCI-Trade platform and AfCFTA trade opportunities, visit our website or contact our team.