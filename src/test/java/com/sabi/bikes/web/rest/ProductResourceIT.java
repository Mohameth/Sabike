package com.sabi.bikes.web.rest;

import com.sabi.bikes.SabikeApp;
import com.sabi.bikes.domain.Product;
import com.sabi.bikes.repository.ProductRepository;
import com.sabi.bikes.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.sabi.bikes.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.sabi.bikes.domain.enumeration.ProductType;
import com.sabi.bikes.domain.enumeration.BikeCategory;
import com.sabi.bikes.domain.enumeration.PartCategory;
import com.sabi.bikes.domain.enumeration.PartCategoryType;
/**
 * Integration tests for the {@link ProductResource} REST controller.
 */
@SpringBootTest(classes = SabikeApp.class)
public class ProductResourceIT {

    private static final Float DEFAULT_PRICE = 1F;
    private static final Float UPDATED_PRICE = 2F;
    private static final Float SMALLER_PRICE = 1F - 1F;

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_STOCK = 1;
    private static final Integer UPDATED_STOCK = 2;
    private static final Integer SMALLER_STOCK = 1 - 1;

    private static final String DEFAULT_PICTURE = "AAAAAAAAAA";
    private static final String UPDATED_PICTURE = "BBBBBBBBBB";

    private static final String DEFAULT_BRAND = "AAAAAAAAAA";
    private static final String UPDATED_BRAND = "BBBBBBBBBB";

    private static final ProductType DEFAULT_TYPE = ProductType.BIKE;
    private static final ProductType UPDATED_TYPE = ProductType.PART;

    private static final BikeCategory DEFAULT_BIKE_CATEGORY = BikeCategory.MOUNTAIN;
    private static final BikeCategory UPDATED_BIKE_CATEGORY = BikeCategory.ROAD;

    private static final String DEFAULT_BIKE_SIZE = "AAAAAAAAAA";
    private static final String UPDATED_BIKE_SIZE = "BBBBBBBBBB";

    private static final Integer DEFAULT_BIKE_SEEDS = 1;
    private static final Integer UPDATED_BIKE_SEEDS = 2;
    private static final Integer SMALLER_BIKE_SEEDS = 1 - 1;

    private static final String DEFAULT_BIKE_COLOR = "AAAAAAAAAA";
    private static final String UPDATED_BIKE_COLOR = "BBBBBBBBBB";

    private static final PartCategory DEFAULT_PART_CATEGORY = PartCategory.FRAMES_FORKS;
    private static final PartCategory UPDATED_PART_CATEGORY = PartCategory.DRIVETRAIN;

    private static final PartCategoryType DEFAULT_PART_CATEGORY_TYPE = PartCategoryType.FORKS;
    private static final PartCategoryType UPDATED_PART_CATEGORY_TYPE = PartCategoryType.SADDLE;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restProductMockMvc;

    private Product product;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProductResource productResource = new ProductResource(productRepository);
        this.restProductMockMvc = MockMvcBuilders.standaloneSetup(productResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Product createEntity(EntityManager em) {
        Product product = new Product()
            .price(DEFAULT_PRICE)
            .name(DEFAULT_NAME)
            .stock(DEFAULT_STOCK)
            .picture(DEFAULT_PICTURE)
            .brand(DEFAULT_BRAND)
            .type(DEFAULT_TYPE)
            .bikeCategory(DEFAULT_BIKE_CATEGORY)
            .bikeSize(DEFAULT_BIKE_SIZE)
            .bikeSeeds(DEFAULT_BIKE_SEEDS)
            .bikeColor(DEFAULT_BIKE_COLOR)
            .partCategory(DEFAULT_PART_CATEGORY)
            .partCategoryType(DEFAULT_PART_CATEGORY_TYPE);
        return product;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Product createUpdatedEntity(EntityManager em) {
        Product product = new Product()
            .price(UPDATED_PRICE)
            .name(UPDATED_NAME)
            .stock(UPDATED_STOCK)
            .picture(UPDATED_PICTURE)
            .brand(UPDATED_BRAND)
            .type(UPDATED_TYPE)
            .bikeCategory(UPDATED_BIKE_CATEGORY)
            .bikeSize(UPDATED_BIKE_SIZE)
            .bikeSeeds(UPDATED_BIKE_SEEDS)
            .bikeColor(UPDATED_BIKE_COLOR)
            .partCategory(UPDATED_PART_CATEGORY)
            .partCategoryType(UPDATED_PART_CATEGORY_TYPE);
        return product;
    }

    @BeforeEach
    public void initTest() {
        product = createEntity(em);
    }

    @Test
    @Transactional
    public void createProduct() throws Exception {
        int databaseSizeBeforeCreate = productRepository.findAll().size();

        // Create the Product
        restProductMockMvc.perform(post("/api/products")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(product)))
            .andExpect(status().isCreated());

        // Validate the Product in the database
        List<Product> productList = productRepository.findAll();
        assertThat(productList).hasSize(databaseSizeBeforeCreate + 1);
        Product testProduct = productList.get(productList.size() - 1);
        assertThat(testProduct.getPrice()).isEqualTo(DEFAULT_PRICE);
        assertThat(testProduct.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testProduct.getStock()).isEqualTo(DEFAULT_STOCK);
        assertThat(testProduct.getPicture()).isEqualTo(DEFAULT_PICTURE);
        assertThat(testProduct.getBrand()).isEqualTo(DEFAULT_BRAND);
        assertThat(testProduct.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testProduct.getBikeCategory()).isEqualTo(DEFAULT_BIKE_CATEGORY);
        assertThat(testProduct.getBikeSize()).isEqualTo(DEFAULT_BIKE_SIZE);
        assertThat(testProduct.getBikeSeeds()).isEqualTo(DEFAULT_BIKE_SEEDS);
        assertThat(testProduct.getBikeColor()).isEqualTo(DEFAULT_BIKE_COLOR);
        assertThat(testProduct.getPartCategory()).isEqualTo(DEFAULT_PART_CATEGORY);
        assertThat(testProduct.getPartCategoryType()).isEqualTo(DEFAULT_PART_CATEGORY_TYPE);
    }

    @Test
    @Transactional
    public void createProductWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = productRepository.findAll().size();

        // Create the Product with an existing ID
        product.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProductMockMvc.perform(post("/api/products")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(product)))
            .andExpect(status().isBadRequest());

        // Validate the Product in the database
        List<Product> productList = productRepository.findAll();
        assertThat(productList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllProducts() throws Exception {
        // Initialize the database
        productRepository.saveAndFlush(product);

        // Get all the productList
        restProductMockMvc.perform(get("/api/products?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(product.getId().intValue())))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE.doubleValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].stock").value(hasItem(DEFAULT_STOCK)))
            .andExpect(jsonPath("$.[*].picture").value(hasItem(DEFAULT_PICTURE.toString())))
            .andExpect(jsonPath("$.[*].brand").value(hasItem(DEFAULT_BRAND.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].bikeCategory").value(hasItem(DEFAULT_BIKE_CATEGORY.toString())))
            .andExpect(jsonPath("$.[*].bikeSize").value(hasItem(DEFAULT_BIKE_SIZE.toString())))
            .andExpect(jsonPath("$.[*].bikeSeeds").value(hasItem(DEFAULT_BIKE_SEEDS)))
            .andExpect(jsonPath("$.[*].bikeColor").value(hasItem(DEFAULT_BIKE_COLOR.toString())))
            .andExpect(jsonPath("$.[*].partCategory").value(hasItem(DEFAULT_PART_CATEGORY.toString())))
            .andExpect(jsonPath("$.[*].partCategoryType").value(hasItem(DEFAULT_PART_CATEGORY_TYPE.toString())));
    }

    @Test
    @Transactional
    public void getProduct() throws Exception {
        // Initialize the database
        productRepository.saveAndFlush(product);

        // Get the product
        restProductMockMvc.perform(get("/api/products/{id}", product.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(product.getId().intValue()))
            .andExpect(jsonPath("$.price").value(DEFAULT_PRICE.doubleValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.stock").value(DEFAULT_STOCK))
            .andExpect(jsonPath("$.picture").value(DEFAULT_PICTURE.toString()))
            .andExpect(jsonPath("$.brand").value(DEFAULT_BRAND.toString()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.bikeCategory").value(DEFAULT_BIKE_CATEGORY.toString()))
            .andExpect(jsonPath("$.bikeSize").value(DEFAULT_BIKE_SIZE.toString()))
            .andExpect(jsonPath("$.bikeSeeds").value(DEFAULT_BIKE_SEEDS))
            .andExpect(jsonPath("$.bikeColor").value(DEFAULT_BIKE_COLOR.toString()))
            .andExpect(jsonPath("$.partCategory").value(DEFAULT_PART_CATEGORY.toString()))
            .andExpect(jsonPath("$.partCategoryType").value(DEFAULT_PART_CATEGORY_TYPE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingProduct() throws Exception {
        // Get the product
        restProductMockMvc.perform(get("/api/products/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProduct() throws Exception {
        // Initialize the database
        productRepository.saveAndFlush(product);

        int databaseSizeBeforeUpdate = productRepository.findAll().size();

        // Update the product
        Product updatedProduct = productRepository.findById(product.getId()).get();
        // Disconnect from session so that the updates on updatedProduct are not directly saved in db
        em.detach(updatedProduct);
        updatedProduct
            .price(UPDATED_PRICE)
            .name(UPDATED_NAME)
            .stock(UPDATED_STOCK)
            .picture(UPDATED_PICTURE)
            .brand(UPDATED_BRAND)
            .type(UPDATED_TYPE)
            .bikeCategory(UPDATED_BIKE_CATEGORY)
            .bikeSize(UPDATED_BIKE_SIZE)
            .bikeSeeds(UPDATED_BIKE_SEEDS)
            .bikeColor(UPDATED_BIKE_COLOR)
            .partCategory(UPDATED_PART_CATEGORY)
            .partCategoryType(UPDATED_PART_CATEGORY_TYPE);

        restProductMockMvc.perform(put("/api/products")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedProduct)))
            .andExpect(status().isOk());

        // Validate the Product in the database
        List<Product> productList = productRepository.findAll();
        assertThat(productList).hasSize(databaseSizeBeforeUpdate);
        Product testProduct = productList.get(productList.size() - 1);
        assertThat(testProduct.getPrice()).isEqualTo(UPDATED_PRICE);
        assertThat(testProduct.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testProduct.getStock()).isEqualTo(UPDATED_STOCK);
        assertThat(testProduct.getPicture()).isEqualTo(UPDATED_PICTURE);
        assertThat(testProduct.getBrand()).isEqualTo(UPDATED_BRAND);
        assertThat(testProduct.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testProduct.getBikeCategory()).isEqualTo(UPDATED_BIKE_CATEGORY);
        assertThat(testProduct.getBikeSize()).isEqualTo(UPDATED_BIKE_SIZE);
        assertThat(testProduct.getBikeSeeds()).isEqualTo(UPDATED_BIKE_SEEDS);
        assertThat(testProduct.getBikeColor()).isEqualTo(UPDATED_BIKE_COLOR);
        assertThat(testProduct.getPartCategory()).isEqualTo(UPDATED_PART_CATEGORY);
        assertThat(testProduct.getPartCategoryType()).isEqualTo(UPDATED_PART_CATEGORY_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingProduct() throws Exception {
        int databaseSizeBeforeUpdate = productRepository.findAll().size();

        // Create the Product

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProductMockMvc.perform(put("/api/products")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(product)))
            .andExpect(status().isBadRequest());

        // Validate the Product in the database
        List<Product> productList = productRepository.findAll();
        assertThat(productList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProduct() throws Exception {
        // Initialize the database
        productRepository.saveAndFlush(product);

        int databaseSizeBeforeDelete = productRepository.findAll().size();

        // Delete the product
        restProductMockMvc.perform(delete("/api/products/{id}", product.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Product> productList = productRepository.findAll();
        assertThat(productList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Product.class);
        Product product1 = new Product();
        product1.setId(1L);
        Product product2 = new Product();
        product2.setId(product1.getId());
        assertThat(product1).isEqualTo(product2);
        product2.setId(2L);
        assertThat(product1).isNotEqualTo(product2);
        product1.setId(null);
        assertThat(product1).isNotEqualTo(product2);
    }
}
