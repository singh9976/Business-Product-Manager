package org.parminder.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.parminder.model.Product;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.*;

@Service
public class ProductService {

    private static final String DATA_FILE = "products.json";
    private final ObjectMapper objectMapper = new ObjectMapper();

    public ProductService() {
        ensureFileExists();
    }

    private void ensureFileExists() {
        File file = new File(DATA_FILE);
        if (!file.exists()) {
            try {
                Map<String, Object> data = new HashMap<>();
                data.put("products", new ArrayList<>());
                objectMapper.writerWithDefaultPrettyPrinter().writeValue(file, data);
                System.out.println("Created products.json file");
            } catch (IOException e) {
                System.err.println("Error creating products.json: " + e.getMessage());
            }
        }
    }

    public List<Product> getAllProducts() {
        try {
            File file = new File(DATA_FILE);
            if (!file.exists()) {
                return new ArrayList<>();
            }

            // Read the JSON file as a string first
            String content = new String(java.nio.file.Files.readAllBytes(file.toPath()));
            if (content.trim().isEmpty()) {
                return new ArrayList<>();
            }

            Map<String, List<Product>> data = objectMapper.readValue(file,
                new TypeReference<Map<String, List<Product>>>() {});

            List<Product> products = data.getOrDefault("products", new ArrayList<>());
            return products != null ? products : new ArrayList<>();
        } catch (IOException e) {
            System.err.println("Error reading products from file: " + e.getMessage());
            return new ArrayList<>();
        }
    }

    public Product addProduct(Product product) {
        try {
            List<Product> products = getAllProducts();
            product.setId(UUID.randomUUID().toString());
            products.add(product);
            saveToFile(products);
            System.out.println("Product added: " + product.getProductName());
            return product;
        } catch (Exception e) {
            System.err.println("Error adding product: " + e.getMessage());
            return null;
        }
    }

    public Product updateProduct(String id, Product product) {
        try {
            List<Product> products = getAllProducts();
            for (int i = 0; i < products.size(); i++) {
                if (products.get(i).getId().equals(id)) {
                    product.setId(id);
                    products.set(i, product);
                    saveToFile(products);
                    System.out.println("Product updated: " + id);
                    return product;
                }
            }
            System.out.println("Product not found: " + id);
            return null;
        } catch (Exception e) {
            System.err.println("Error updating product: " + e.getMessage());
            return null;
        }
    }

    public boolean deleteProduct(String id) {
        try {
            List<Product> products = getAllProducts();
            boolean removed = products.removeIf(p -> p.getId().equals(id));
            if (removed) {
                saveToFile(products);
                System.out.println("Product deleted: " + id);
            }
            return removed;
        } catch (Exception e) {
            System.err.println("Error deleting product: " + e.getMessage());
            return false;
        }
    }

    public Product getProductById(String id) {
        List<Product> products = getAllProducts();
        return products.stream()
                .filter(p -> p.getId().equals(id))
                .findFirst()
                .orElse(null);
    }

    public List<Product> searchProductsByName(String keyword) {
        List<Product> products = getAllProducts();
        if (keyword == null || keyword.trim().isEmpty()) {
            return products;
        }

        String searchKeyword = keyword.toLowerCase().trim();
        return products.stream()
                .filter(p -> p.getProductName() != null &&
                            p.getProductName().toLowerCase().contains(searchKeyword))
                .toList();
    }

    private void saveToFile(List<Product> products) throws IOException {
        Map<String, Object> data = new HashMap<>();
        data.put("products", products);
        objectMapper.writerWithDefaultPrettyPrinter().writeValue(new File(DATA_FILE), data);
    }
}

