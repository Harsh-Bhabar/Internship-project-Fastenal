package com.ecom.product.service;

import com.ecom.product.dto.Product;
import com.ecom.product.exception.LogExceptionWithMessage;
import com.ecom.product.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.logging.Level;
import java.util.stream.Collectors;

@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final ArrayList<String> brandsList = new ArrayList<>(
            List.of("armani exchange", "casio", "daniel wellington",
                    "fossil", "helix", "michael kors", "timex",
                    "tissot", "united colors of benetton"));
    private final ArrayList<String> genders = new ArrayList<>(List.of("mens", "womens", "unisex"));
    private final ArrayList<String> movementTypes = new ArrayList<>(List.of("analogue", "digital"));
    private final ArrayList<String> availableFieldsToSortOn = new ArrayList<>(List.of("brand", "name", "price"));

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Optional<Product> getProduct(String sku) {
        return productRepository.findProductBySKU(sku);
    }

    public List<Product> getProducts() {
        return productRepository.findAll();
    }

    public void addProduct(Product product) {
        Optional<Product> productSkuOptional = productRepository.findProductBySKU(product.getSku());

        if (productSkuOptional.isPresent()) {
            LogExceptionWithMessage.throwExceptionWithMessage(Level.WARNING, "Product SKU already present", new IllegalStateException());
            throw new IllegalStateException("Product SKU already present");
        }

        validateProductDetails(product);
        productRepository.save(product);
    }

    private void validateProductDetails(Product product) {
        if (!brandsList.contains(product.getBrand().toLowerCase()))
            throw new IllegalStateException("Brand not available");
        if (product.getName().length() == 0)
            throw new IllegalStateException("Name cannot be empty");
        if (product.getDescription().length() == 0)
            throw new IllegalStateException("Description cannot be empty");
        if (product.getPrice() == 0.0f)
            throw new IllegalStateException("Price cannot be 0");
        if (!genders.contains(product.getGender()))
            throw new IllegalStateException("Gender must be in: [mens, ladies, unisex]");
        if (product.getBandMaterial().length() == 0)
            throw new IllegalStateException("Band material cannot be empty");
        if (!movementTypes.contains(product.getMovementType()))
            throw new IllegalStateException("Movement type not available");
        if (product.getColor().length() == 0)
            throw new IllegalStateException("Color cannot be empty");
        if (product.getBandColor().length() == 0)
            throw new IllegalStateException("Band color cannot be empty");
//        if (product.getImageUrl().toString().length() == 0)
//            throw new IllegalStateException("Image url cannot be null");
    }

//    public void updateProduct(String sku, Product product) {
//        String brand = product.getBrand();
//        String name = product.getName();
//        String description = product.getDescription();
//        Float price = product.getPrice();
//        String gender = product.getGender();
//        String bandMaterial = product.getBandMaterial();
//        String movementType = product.getMovementType();
//        String color = product.getColor();
//        String bandColor = product.getBandColor();
//        URL imageUrl = product.getImageUrl();
//
//        Product existingProduct = productRepository.findProductBySKU(sku)
//                .orElseThrow(() -> new IllegalStateException(sku + " does not exist"));
//        if (!productRepository.existsBySku(sku)) {
//            throw new IllegalStateException(sku + " does not exist");
//        }
//
//        if (name != null && name.length() > 0 && !Objects.equals(existingProduct.getName(), name)) {
//            existingProduct.setName(name);
//        }
//        if (description != null && description.length() > 0 && !Objects.equals(existingProduct.getDescription(), description)) {
//            existingProduct.setDescription(description);
//        }
//        if (category != null && isProductCategoryValid(product.getCategory()) && !Objects.equals(existingProduct.getCategory(), category)) {
//            existingProduct.setCategory(category);
//        }
//        if (finish != null && finish.length() > 0 && !Objects.equals(existingProduct.getFinish(), finish)) {
//            existingProduct.setFinish(finish);
//        }
//        if (uom != null && uom.length() > 0 && !Objects.equals(existingProduct.getUom(), uom)) {
//            existingProduct.setUom(uom);
//        }
//        if (unitPrice != 0.0f && existingProduct.getUnitPrice() == unitPrice) {
//            existingProduct.setUnitPrice(unitPrice);
//        }
//
////        productRepository.save(existingProduct);
//    }

    public void deleteProduct(String sku) {
        boolean productExists = productRepository.existsBySku(sku);

        if (!productExists) {
            throw new IllegalStateException(sku + " does not exist");
        }
        productRepository.deleteBySku(sku);
    }

    public List<Product> getSortedProductsByField(String sortByField) {
        if (!availableFieldsToSortOn.contains(sortByField)) {
            sortByField = "price";    // Default value if wrong input
        }

        return productRepository.findAll(Sort.by(Sort.Direction.ASC, sortByField));
    }

    public List<Product> getProductSuggestions(String sku) {
        String brand = getProduct(sku).get().getBrand();
        return productRepository.findProductByBrand(brand);
    }

    public List<Product> getProductByBrand(String brand) {
        if (!brandsList.contains(brand.toLowerCase()))
            throw new IllegalStateException("Invalid product brand");
        return productRepository.findProductByBrand(brand);
    }

    public List<Product> getProductsInPriceRange(float min, float max) {
        return productRepository.getProductsInPriceRange(min, max);
    }

    public ArrayList<Product> getProductsForQuery(String searchQuery) {
        searchQuery.trim();
        String[] searchQueryTokens = searchQuery.split("\\s+");
        ArrayList<Product> searchResults = new ArrayList<>();
        for (String token : searchQueryTokens) {
            searchResults.addAll(productRepository.getProductsForQuery(token));
        }
        return removeDuplicateElements(searchResults);
    }

    private ArrayList<Product> removeDuplicateElements(ArrayList<Product> originalList) {
        Set<String> productIds = new LinkedHashSet<>();
        ArrayList<Product> uniqueProducts = new ArrayList<>();
        for (Product product : originalList) {
            if (!productIds.contains(product.getId())) {
                uniqueProducts.add(product);
                productIds.add(product.getId());
            }
        }
        return uniqueProducts;
    }
}
