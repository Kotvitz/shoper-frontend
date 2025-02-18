# ShoperFrontend

This is the **frontend** of the **Shoper App**, built with **Next.js** and **React**.
It allows users to search for products dynamically with an **autocomplete feature** and displays search results from the backend.

------

## Features

- **Search Form** – Users can type product names to search dynamically.
- **Autocomplete Suggestions** – Displays suggestions after typing at least **3 characters**.
- **Dynamic Search Results** – Results update based on user input and API response.
- **Optimized Performance** – Uses **debouncing** to minimize API requests.
- **Responsive Design** – Works on desktops, tablets, and mobile devices.

------

## Technologies Used

- **Next.js** (React Framework)
- **React Hooks** (useState, useEffect)
- **CSS** (Global styles in `globals.css`)
- **Fetch API** (for backend communication)

------

## Setup & Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/frontend.git
cd frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory and define:

```ini
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
```

This URL must match the **backend** API.

### 4. Run the Development Server

```bash
npm run dev
```

Now visit **`http://localhost:3000`** in your browser.

------

### API Integration

The frontend communicates with the **backend API** to fetch products.
It makes requests to:

```bash
GET http://localhost:5000/api/products/search?query={searchTerm}
```

- The API **returns JSON** containing `productId`, `name`, `shortDescription`, and `description`.
- The response is **processed and displayed dynamically**.

------

## Contributing

Feel free to **submit issues** or **pull requests**!

1. **Fork the repo**
2. **Create a new branch**
3. **Make changes & commit**
4. **Submit a pull request**