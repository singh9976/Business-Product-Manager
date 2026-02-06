# Business Utility - Product Manager

A comprehensive web application for managing products with a modern HTML/CSS/JavaScript frontend and Java Spring Boot backend. All product data is persisted in JSON format, ensuring no data loss on server restart.

## Features

✅ **Product Management**
- Add new products with product name, MRP, selling price, and quantity
- Edit existing products
- Delete products
- View all products in a responsive table

✅ **Data Persistence**
- All products are stored in a `products.json` file
- Automatic data recovery on server restart
- No database setup required

✅ **Modern UI**
- Beautiful gradient design with purple theme
- Responsive layout (works on desktop and mobile)
- Real-time table updates
- Success and error notifications
- Smooth animations and transitions

✅ **Calculated Fields**
- Automatic discount percentage calculation
- Based on MRP vs Selling Price

## Project Structure

```
BusinessUtility/
├── pom.xml                          # Maven configuration
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── org/parminder/
│   │   │       ├── BusinessUtilityApplication.java    # Spring Boot main class
│   │   │       ├── controller/
│   │   │       │   └── ProductController.java         # REST API endpoints
│   │   │       ├── model/
│   │   │       │   └── Product.java                   # Product model
│   │   │       └── service/
│   │   │           └── ProductService.java            # Business logic & JSON handling
│   │   └── resources/
│   │       ├── application.properties                 # Spring configuration
│   │       └── static/
│   │           ├── index.html                         # Frontend UI
│   │           ├── style.css                          # Styling
│   │           └── script.js                          # Frontend logic
│   └── test/
│       └── java/
└── products.json                    # Data persistence file (auto-created)
```

## Technology Stack

**Backend:**
- Java 23
- Spring Boot 3.2.1
- Spring Web (REST APIs)
- Jackson (JSON processing)
- Lombok (Boilerplate reduction)

**Frontend:**
- HTML5
- CSS3 (with gradients and animations)
- Vanilla JavaScript (ES6+)
- Fetch API for HTTP requests

## Prerequisites

- Java 23 or higher
- Maven 3.6+
- A modern web browser (Chrome, Firefox, Safari, Edge)

## Installation & Setup

### 1. Clone/Open the Project
```bash
cd C:\Users\Parminder\Desktop\JavaProjects\IntelliJ\BusinessUtility\BusinessUtility
```

### 2. Build the Project
```bash
mvn clean install
```

### 3. Run the Application
```bash
mvn spring-boot:run
```

Or from IDE: Right-click on `BusinessUtilityApplication.java` → Run

### 4. Access the Application
Open your browser and navigate to:
```
http://localhost:8080
```

## API Endpoints

All API endpoints are available at `/api/products`

### Get All Products
```
GET /api/products
Response: Array of Product objects
```

### Add New Product
```
POST /api/products
Content-Type: application/json

{
    "productName": "Laptop",
    "mrp": 50000,
    "sellingPrice": 45000,
    "quantity": 10
}
```

### Get Product by ID
```
GET /api/products/{id}
```

### Update Product
```
PUT /api/products/{id}
Content-Type: application/json

{
    "productName": "Laptop",
    "mrp": 50000,
    "sellingPrice": 45000,
    "quantity": 15
}
```

### Delete Product
```
DELETE /api/products/{id}
```

## Product Model

```json
{
    "id": "uuid-string",
    "productName": "Product Name",
    "mrp": 1000.00,
    "sellingPrice": 900.00,
    "quantity": 50
}
```

## Data Storage (products.json)

The application automatically creates and maintains a `products.json` file in the project root directory:

```json
{
  "products" : [ {
    "id" : "550e8400-e29b-41d4-a716-446655440000",
    "productName" : "Laptop",
    "mrp" : 50000.0,
    "sellingPrice" : 45000.0,
    "quantity" : 10
  }, {
    "id" : "660e8400-e29b-41d4-a716-446655440001",
    "productName" : "Mouse",
    "mrp" : 500.0,
    "sellingPrice" : 400.0,
    "quantity" : 50
  } ]
}
```

**Important Notes:**
- The file is created automatically on first run
- Ensure the application has write permissions to the project directory
- The JSON file persists all data between server restarts
- Each product gets a unique UUID for identification

## Usage Guide

### Adding a Product
1. Fill in the form on the left side:
   - Product Name
   - MRP (Maximum Retail Price)
   - Selling Price
   - Quantity
2. Click "Add Product"
3. Product appears in the table immediately

### Editing a Product
1. Click the "Edit" button next to any product in the table
2. Form fields auto-populate with product details
3. Make changes as needed
4. Click "Update Product"
5. Changes are reflected in the table and saved

### Deleting a Product
1. Click the "Delete" button next to any product
2. Confirm the deletion
3. Product is removed from table and JSON file

### Viewing Products
- All products are displayed in a sortable table
- Shows: Product Name, MRP, Selling Price, Discount %, Quantity
- Discount % is calculated automatically

## Validation

The application includes the following validations:
- ✓ Product name is required
- ✓ MRP must be greater than 0
- ✓ Selling price must be greater than 0
- ✓ Selling price cannot exceed MRP
- ✓ Quantity cannot be negative

## Error Handling

- Network errors are caught and displayed to the user
- Server errors return appropriate HTTP status codes
- All operations include success/error notifications
- Graceful fallback if JSON file becomes corrupted

## Troubleshooting

### Application won't start
- Ensure Java 23 is installed: `java -version`
- Check Maven installation: `mvn -version`
- Try cleaning: `mvn clean`

### Products not persisting
- Verify the application has write permissions in the project directory
- Check if `products.json` exists (should be auto-created)
- Check console logs for errors

### UI not loading
- Ensure server is running on port 8080
- Clear browser cache (Ctrl+Shift+Delete)
- Try incognito/private mode
- Check browser console for errors (F12)

### CORS errors
- The application is configured with `@CrossOrigin(origins = "*")`
- Should work from any origin in development

## Logging

The application logs important events:
- Product additions/updates/deletions
- File I/O operations
- Errors and exceptions

Check the console output for debugging information.

## Future Enhancements

Potential features to add:
- Search and filter functionality
- Bulk import/export
- Product categories
- Stock alerts
- User authentication
- Database integration (MySQL/PostgreSQL)
- Advanced analytics

## License

This project is open source and available for personal and commercial use.

## Support

For issues or questions, refer to the Spring Boot documentation:
- https://spring.io/projects/spring-boot
- https://spring.io/guides/gs/rest-service/

---

**Happy Product Managing! 📦**

