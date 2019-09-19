package com.sabi.bikes.web.rest;

import com.sabi.bikes.domain.Product;
import com.sabi.bikes.repository.ProductRepository;
import com.sabi.bikes.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing {@link com.sabi.bikes.domain.Product}.
 */
@RestController
@RequestMapping("/api")
public class ProductResource {

    private final Logger log = LoggerFactory.getLogger(ProductResource.class);

    private static final String ENTITY_NAME = "product";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProductRepository productRepository;

    public ProductResource(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    /**
     * {@code POST  /products} : Create a new product.
     *
     * @param product the product to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new product, or with status {@code 400 (Bad Request)} if the product has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/products")
    public ResponseEntity<Product> createProduct(@RequestBody Product product) throws URISyntaxException {
        log.debug("REST request to save Product : {}", product);
        if (product.getId() != null) {
            throw new BadRequestAlertException("A new product cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Product result = productRepository.save(product);
        return ResponseEntity.created(new URI("/api/products/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /products} : Updates an existing product.
     *
     * @param product the product to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated product,
     * or with status {@code 400 (Bad Request)} if the product is not valid,
     * or with status {@code 500 (Internal Server Error)} if the product couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/products")
    public ResponseEntity<Product> updateProduct(@RequestBody Product product) throws URISyntaxException {
        log.debug("REST request to update Product : {}", product);
        if (product.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Product result = productRepository.save(product);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, product.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /products} : get all the products.
     *
     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of products in body.
     */
    @GetMapping("/products")
    public List<Product> getAllProducts(@RequestParam(required = false) String filter) {
        if ("orderitems-is-null".equals(filter)) {
            log.debug("REST request to get all Products where orderItems is null");
            return StreamSupport
                .stream(productRepository.findAll().spliterator(), false)
                .filter(product -> product.getOrderItems() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all Products");
        return productRepository.findAll();
    }

    /**
     * {@code GET  /products/:id} : get the "id" product.
     *
     * @param id the id of the product to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the product, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/products/{id}")
    public ResponseEntity<Product> getProduct(@PathVariable Long id) {
        log.debug("REST request to get Product : {}", id);
        Optional<Product> product = productRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(product);
    }

    /**
     * {@code DELETE  /products/:id} : delete the "id" product.
     *
     * @param id the id of the product to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/products/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        log.debug("REST request to delete Product : {}", id);
        productRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
  
    // SABIKE

    @GetMapping("/products/bybikecategory/{category}")
    public ResponseEntity<List<Product>> findProductByBikeCategory(Pageable pageable, @PathVariable String category) {
        List<Product> products = productRepository.getAllByBikeCategory(pageable, category);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/products/bypartcategory/{category}")
    public ResponseEntity<List<Product>> findProductByPartCategory(
        Pageable pageable,
        @PathVariable String category
    ){
        List<Product> products = productRepository.getAllByPartCategory(pageable, category);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/products/bikes/all")
    public ResponseEntity<List<Product>> findBikes(Pageable pageable) {
        List<Product> products = productRepository.getAllBikes(pageable);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/products/parts/all")
    public ResponseEntity<List<Product>> findParts(Pageable pageable) {
        List<Product> products = productRepository.getAllParts(pageable);
  
    @GetMapping("/products/search/{name}")
    public ResponseEntity<List<Product>> findProductByName(Pageable pageable, @PathVariable String name) {
        List<Product> products = productRepository.getProductsByName(pageable, name);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/products/search")
    public ResponseEntity<List<Product>> findAllProducts(Pageable pageable) {
        List<Product> products = productRepository.getMyProducts(pageable);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/products/searchLike/{name}")
    public ResponseEntity<List<Product>> findProductsByName(Pageable pageable, @PathVariable String name) {
        List<Product> products = productRepository.searchByNameLike(pageable, name);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }
}
