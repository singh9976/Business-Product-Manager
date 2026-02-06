const API_URL = 'http://localhost:8080/api/products';

// Mobile detection
const isMobile = () => window.innerWidth <= 768;
const isVerySmallPhone = () => window.innerWidth <= 480;

// DOM Elements
const productForm = document.getElementById('productForm');
const productIdInput = document.getElementById('productId');
const productNameInput = document.getElementById('productName');
const mrpInput = document.getElementById('mrp');
const sellingPriceInput = document.getElementById('sellingPrice');
const quantityInput = document.getElementById('quantity');
const submitBtn = document.getElementById('submitBtn');
const cancelBtn = document.getElementById('cancelBtn');
const tableBody = document.getElementById('tableBody');
const emptyMessage = document.getElementById('emptyMessage');
const productsTable = document.getElementById('productsTable');
const searchInput = document.getElementById('searchInput');
const clearSearchBtn = document.getElementById('clearSearchBtn');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();

    productForm.addEventListener('submit', handleFormSubmit);
    cancelBtn.addEventListener('click', resetForm);
    searchInput.addEventListener('input', handleSearch);
    clearSearchBtn.addEventListener('click', clearSearch);
});

// Load all products
async function loadProducts() {
    try {
        const response = await fetch(API_URL);
        const products = await response.json();

        displayProducts(products);
    } catch (error) {
        console.error('Error loading products:', error);
        showMessage('Error loading products. Please refresh the page.', 'error');
    }
}

// Display products in table
function displayProducts(products) {
    tableBody.innerHTML = '';

    if (products.length === 0) {
        emptyMessage.classList.add('show');
        productsTable.style.display = 'none';
    } else {
        emptyMessage.classList.remove('show');
        productsTable.style.display = 'table';

        products.forEach(product => {
            const discount = calculateDiscount(product.mrp, product.sellingPrice);
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${escapeHtml(product.productName)}</td>
                <td>₹${parseFloat(product.mrp).toFixed(2)}</td>
                <td>₹${parseFloat(product.sellingPrice).toFixed(2)}</td>
                <td>${discount.toFixed(1)}%</td>
                <td>${product.quantity}</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn btn-edit" onclick="editProduct('${product.id}', '${escapeHtml(product.productName)}', ${product.mrp}, ${product.sellingPrice}, ${product.quantity})">Edit</button>
                        <button class="btn btn-delete" onclick="deleteProduct('${product.id}')">Delete</button>
                    </div>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }
}

// Calculate discount percentage
function calculateDiscount(mrp, sellingPrice) {
    if (mrp <= 0) return 0;
    return ((mrp - sellingPrice) / mrp) * 100;
}

// Handle form submission
async function handleFormSubmit(e) {
    e.preventDefault();

    const productId = productIdInput.value;
    const product = {
        productName: productNameInput.value.trim(),
        mrp: parseFloat(mrpInput.value),
        sellingPrice: parseFloat(sellingPriceInput.value),
        quantity: parseInt(quantityInput.value)
    };

    // Validation
    if (!product.productName) {
        showMessage('Product name is required.', 'error');
        return;
    }

    if (product.mrp <= 0) {
        showMessage('MRP must be greater than 0.', 'error');
        return;
    }

    if (product.sellingPrice <= 0) {
        showMessage('Selling price must be greater than 0.', 'error');
        return;
    }

    if (product.sellingPrice > product.mrp) {
        showMessage('Selling price cannot be greater than MRP.', 'error');
        return;
    }

    if (product.quantity < 0) {
        showMessage('Quantity cannot be negative.', 'error');
        return;
    }

    try {
        let response;
        if (productId) {
            // Update existing product
            response = await fetch(`${API_URL}/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            });

            if (response.ok) {
                showMessage('Product updated successfully!', 'success');
            } else {
                showMessage('Error updating product.', 'error');
            }
        } else {
            // Create new product
            response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            });

            if (response.ok) {
                showMessage('Product added successfully!', 'success');
            } else {
                showMessage('Error adding product.', 'error');
            }
        }

        resetForm();
        loadProducts();
    } catch (error) {
        console.error('Error:', error);
        showMessage('An error occurred. Please try again.', 'error');
    }
}

// Edit product
function editProduct(id, name, mrp, sellingPrice, quantity) {
    productIdInput.value = id;
    productNameInput.value = name;
    mrpInput.value = mrp;
    sellingPriceInput.value = sellingPrice;
    quantityInput.value = quantity;

    submitBtn.textContent = 'Update Product';
    submitBtn.style.backgroundColor = '#4ecdc4';
    cancelBtn.style.display = 'block';

    // Scroll to form
    const formSection = document.querySelector('.form-section');
    if (window.innerWidth <= 768) {
        // Mobile: scroll to top of page
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        // Desktop: scroll to form
        formSection.scrollIntoView({ behavior: 'smooth' });
    }
    setTimeout(() => productNameInput.focus(), 300);
}

// Delete product
async function deleteProduct(id) {
    if (confirm('Are you sure you want to delete this product?')) {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                showMessage('Product deleted successfully!', 'success');
                loadProducts();
            } else {
                showMessage('Error deleting product.', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showMessage('An error occurred while deleting. Please try again.', 'error');
        }
    }
}

// Reset form
function resetForm() {
    productForm.reset();
    productIdInput.value = '';
    submitBtn.textContent = 'Add Product';
    submitBtn.style.backgroundColor = '';
    cancelBtn.style.display = 'none';
}

// Show message
function showMessage(message, type) {
    // Create message div if it doesn't exist
    let messageDiv = document.getElementById('messageDiv');
    if (!messageDiv) {
        messageDiv = document.createElement('div');
        messageDiv.id = 'messageDiv';
        document.body.insertBefore(messageDiv, document.body.firstChild);
        messageDiv.style.cssText = 'position: fixed; top: 20px; right: 20px; z-index: 1000; max-width: 300px;';
    }

    const msgElement = document.createElement('div');
    msgElement.className = `message ${type} show`;
    msgElement.textContent = message;
    msgElement.style.cssText = `
        padding: 12px 20px;
        margin-bottom: 10px;
        border-radius: 6px;
        ${type === 'success' ? 'background: #d4edda; color: #155724; border: 1px solid #c3e6cb;' : 'background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;'}
    `;

    messageDiv.appendChild(msgElement);

    // Auto remove after 4 seconds
    setTimeout(() => {
        msgElement.remove();
    }, 4000);
}

// Escape HTML special characters to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Handle search input
async function handleSearch() {
    const keyword = searchInput.value.trim();

    if (!keyword) {
        // If search is empty, load all products
        loadProducts();
        return;
    }

    try {
        const response = await fetch(`${API_URL}/search?keyword=${encodeURIComponent(keyword)}`);
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error searching products:', error);
        showMessage('Error searching products. Please try again.', 'error');
    }
}

// Clear search
function clearSearch() {
    searchInput.value = '';
    loadProducts();
}

