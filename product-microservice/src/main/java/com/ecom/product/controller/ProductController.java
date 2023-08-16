package com.ecom.product.controller;

import com.ecom.product.dto.Product;
import com.ecom.product.exception.LogExceptionWithMessage;
import com.ecom.product.response.ResponseHandler;
import com.ecom.product.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.logging.Level;

@RestController
@RequestMapping(path = "/product")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {
    public final ProductService productService;

    @Autowired
    ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/all")
    public ResponseEntity<Object> getProducts() {
        try {
            List<Product> products = productService.getProducts();
            return ResponseHandler.generateResponse("Products retrieved successfully!", HttpStatus.OK, products);
        } catch (Exception e) {
            LogExceptionWithMessage.throwExceptionWithMessage(Level.WARNING, "Exception getting all products", e);
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.NOT_FOUND, null);
        }
    }

    @GetMapping(path = "{sku}")
    public ResponseEntity<Object> getProduct(@PathVariable("sku") String sku) {
        try {
            Optional<Product> product = productService.getProduct(sku);
            if (product.isPresent())
                return ResponseHandler.generateResponse("Product retrieved successfully!", HttpStatus.OK, product);
            else
                return ResponseHandler.generateResponse("Unable to retrieve product!", HttpStatus.NOT_FOUND, null);
        } catch (Exception e) {
            LogExceptionWithMessage.throwExceptionWithMessage(Level.WARNING, "Exception getting product with SKU: " + sku, e);
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.NOT_FOUND, null);
        }
    }

    @GetMapping
    public ResponseEntity<Object> getSortedProducts(@RequestParam(value = "sortBy") String sortByField) {
        try {
            List<Product> products = productService.getSortedProductsByField(sortByField);
            return ResponseHandler.generateResponse("Products retrieved successfully!", HttpStatus.OK, products);
        } catch (Exception e) {
            LogExceptionWithMessage.throwExceptionWithMessage(Level.WARNING, "Exception getting sorted products", e);
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.NOT_FOUND, null);
        }
    }

    @GetMapping(path = "/product-suggestions/{sku}")
    public ResponseEntity<Object> getProductSuggestions(@PathVariable("sku") String sku) {
        try {
            List<Product> products = productService.getProductSuggestions(sku);
            return ResponseHandler.generateResponse("Suggested products retrieved successfully!", HttpStatus.OK, products);
        } catch (Exception e) {
            LogExceptionWithMessage.throwExceptionWithMessage(Level.WARNING, "Exception getting product suggestions", e);
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.NOT_FOUND, null);
        }
    }

    @GetMapping(path = "/search-products/{searchQuery}")
    public ResponseEntity<Object> getProductsForQuery(@PathVariable("searchQuery") String searchQuery) {
        try {
            ArrayList<Product> products = productService.getProductsForQuery(searchQuery);
            return ResponseHandler.generateResponse("Search results for query retrieved successfully!", HttpStatus.OK, products);
        } catch (Exception e) {
            LogExceptionWithMessage.throwExceptionWithMessage(Level.WARNING, "Exception getting search results", e);
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.NOT_FOUND, null);
        }
    }

    @GetMapping("/brand/{brand}")
    public ResponseEntity<Object> getProductByBrand(@PathVariable("brand") String brand) {
        try {
            List<Product> products = productService.getProductByBrand(brand);
            return ResponseHandler.generateResponse("Products for brand " + brand + " retrieved successfully!", HttpStatus.OK, products);
        } catch (Exception e) {
            LogExceptionWithMessage.throwExceptionWithMessage(Level.WARNING, "Exception getting product in brand " + brand, e);
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.NOT_FOUND, null);
        }
    }

    @GetMapping("/price-range")
    public ResponseEntity<Object> getProductsInPriceRange(@RequestParam(value = "min") float min, @RequestParam(value = "max") float max) {
        try {
            List<Product> products = productService.getProductsInPriceRange(min, max);
            return ResponseHandler.generateResponse("Products between " + min + " and " + max + " retrieved successfully!", HttpStatus.OK, products);
        } catch (Exception e) {
            LogExceptionWithMessage.throwExceptionWithMessage(Level.WARNING, "Exception getting products in price range", e);
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.NOT_FOUND, null);
        }
    }

    @PostMapping
    public ResponseEntity<Object> addProduct(@RequestBody Product product) {
        try {
            productService.addProduct(product);
            HashMap<String, String> productSkuMap = new HashMap<>();
            productSkuMap.put("sku", product.getSku());
            return ResponseHandler.generateResponse("Product added successfully!", HttpStatus.OK, productSkuMap);
        } catch (Exception e) {
            LogExceptionWithMessage.throwExceptionWithMessage(Level.WARNING, "Exception adding product", e);
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.NOT_FOUND, null);
        }
    }

//    @PutMapping(path = "{sku}")
//    public ResponseEntity<Object> updateProduct(@PathVariable("sku") String sku, @RequestBody(required = false) Product product) {
//        try {
//            productService.updateProduct(sku, product);
//            HashMap<String, String> productSkuMap = new HashMap<>();
//            productSkuMap.put("sku", sku);
//            return ResponseHandler.generateResponse("Product updated successfully!", HttpStatus.OK, productSkuMap);
//        } catch (Exception e) {
//            LogExceptionWithMessage.throwExceptionWithMessage(Level.WARNING, "Exception updating product", e);
//            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.NOT_FOUND, null);
//        }
//    }

    @DeleteMapping(path = "{sku}")
    public ResponseEntity<Object> deleteProduct(@PathVariable("sku") String sku) {
        try {
            productService.deleteProduct(sku);
            return ResponseHandler.generateResponse("Product deleted successfully!", HttpStatus.OK, null);
        } catch (Exception e) {
            LogExceptionWithMessage.throwExceptionWithMessage(Level.WARNING, "Exception deleting", e);
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.NOT_FOUND, null);
        }
    }
}
