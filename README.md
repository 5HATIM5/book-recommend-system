# Books App 📚

## Overview
The **Books App** is a React-based web application that allows users to explore a collection of books, view details, rate books, and get recommendations. The app fetches book data from the Google Books API and provides a clean and user-friendly interface to browse books.

## Features
- 📖 Fetches books from the **Google Books API**
- 🔍 Displays book details (title, author, genre, description, etc.)
- ⭐ Users can **rate** books
- 📌 "Want to Read" list functionality
- 🎯 **Suggested Books** section with randomized recommendations
- 🛒 "Buy Now" button (placeholder for potential e-commerce integration)
- ⚡ Built with **Redux Toolkit** for state management
- 🎨 Styled using **Material UI** for a modern UI/UX

## Setup & Installation

### Prerequisites
Make sure you have the following installed:
- Node.js (v16 or later recommended)
- Yarn (or npm, but the project uses Yarn)

### Steps to Run the Project

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/books-app.git
   cd books-app
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Start the development server:**
   ```sh
   npm run dev
   ```
   This will start the app at `http://localhost:5173/` (or another available port).

## Project Structure
```
books-app/
│-- src/
│   │-- auth/       # Authentication-related logic 
│   │-- components/ # Reusable UI components (e.g., Navbar, SuggestedBooks)
│   │-- pages/      # Application pages (e.g., BookDetailPage, Login)
│   │-- redux/      # Redux store, slices, and state management
│   │-- routes/     # App routing logic
│   │-- main.tsx    # Main entry point of the React app
│-- public/           # Public static files
│-- README.md         # Project documentation
│-- package.json      # Project dependencies and scripts
```

## License
This project is open-source and available under the [MIT License](LICENSE).

---
🚀 **Happy Reading!** 📚
