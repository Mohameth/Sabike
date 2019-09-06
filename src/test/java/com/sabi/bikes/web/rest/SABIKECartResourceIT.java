package com.sabi.bikes.web.rest;

import com.sabi.bikes.SabikeApp;
import com.sabi.bikes.domain.SABIKECart;
import com.sabi.bikes.repository.SABIKECartRepository;
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

/**
 * Integration tests for the {@link SABIKECartResource} REST controller.
 */
@SpringBootTest(classes = SabikeApp.class)
public class SABIKECartResourceIT {

    private static final Integer DEFAULT_CART_ID = 1;
    private static final Integer UPDATED_CART_ID = 2;
    private static final Integer SMALLER_CART_ID = 1 - 1;

    @Autowired
    private SABIKECartRepository sABIKECartRepository;

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

    private MockMvc restSABIKECartMockMvc;

    private SABIKECart sABIKECart;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SABIKECartResource sABIKECartResource = new SABIKECartResource(sABIKECartRepository);
        this.restSABIKECartMockMvc = MockMvcBuilders.standaloneSetup(sABIKECartResource)
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
    public static SABIKECart createEntity(EntityManager em) {
        SABIKECart sABIKECart = new SABIKECart()
            .cartId(DEFAULT_CART_ID);
        return sABIKECart;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SABIKECart createUpdatedEntity(EntityManager em) {
        SABIKECart sABIKECart = new SABIKECart()
            .cartId(UPDATED_CART_ID);
        return sABIKECart;
    }

    @BeforeEach
    public void initTest() {
        sABIKECart = createEntity(em);
    }

    @Test
    @Transactional
    public void createSABIKECart() throws Exception {
        int databaseSizeBeforeCreate = sABIKECartRepository.findAll().size();

        // Create the SABIKECart
        restSABIKECartMockMvc.perform(post("/api/sabike-carts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sABIKECart)))
            .andExpect(status().isCreated());

        // Validate the SABIKECart in the database
        List<SABIKECart> sABIKECartList = sABIKECartRepository.findAll();
        assertThat(sABIKECartList).hasSize(databaseSizeBeforeCreate + 1);
        SABIKECart testSABIKECart = sABIKECartList.get(sABIKECartList.size() - 1);
        assertThat(testSABIKECart.getCartId()).isEqualTo(DEFAULT_CART_ID);
    }

    @Test
    @Transactional
    public void createSABIKECartWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = sABIKECartRepository.findAll().size();

        // Create the SABIKECart with an existing ID
        sABIKECart.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSABIKECartMockMvc.perform(post("/api/sabike-carts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sABIKECart)))
            .andExpect(status().isBadRequest());

        // Validate the SABIKECart in the database
        List<SABIKECart> sABIKECartList = sABIKECartRepository.findAll();
        assertThat(sABIKECartList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllSABIKECarts() throws Exception {
        // Initialize the database
        sABIKECartRepository.saveAndFlush(sABIKECart);

        // Get all the sABIKECartList
        restSABIKECartMockMvc.perform(get("/api/sabike-carts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(sABIKECart.getId().intValue())))
            .andExpect(jsonPath("$.[*].cartId").value(hasItem(DEFAULT_CART_ID)));
    }
    
    @Test
    @Transactional
    public void getSABIKECart() throws Exception {
        // Initialize the database
        sABIKECartRepository.saveAndFlush(sABIKECart);

        // Get the sABIKECart
        restSABIKECartMockMvc.perform(get("/api/sabike-carts/{id}", sABIKECart.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(sABIKECart.getId().intValue()))
            .andExpect(jsonPath("$.cartId").value(DEFAULT_CART_ID));
    }

    @Test
    @Transactional
    public void getNonExistingSABIKECart() throws Exception {
        // Get the sABIKECart
        restSABIKECartMockMvc.perform(get("/api/sabike-carts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSABIKECart() throws Exception {
        // Initialize the database
        sABIKECartRepository.saveAndFlush(sABIKECart);

        int databaseSizeBeforeUpdate = sABIKECartRepository.findAll().size();

        // Update the sABIKECart
        SABIKECart updatedSABIKECart = sABIKECartRepository.findById(sABIKECart.getId()).get();
        // Disconnect from session so that the updates on updatedSABIKECart are not directly saved in db
        em.detach(updatedSABIKECart);
        updatedSABIKECart
            .cartId(UPDATED_CART_ID);

        restSABIKECartMockMvc.perform(put("/api/sabike-carts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSABIKECart)))
            .andExpect(status().isOk());

        // Validate the SABIKECart in the database
        List<SABIKECart> sABIKECartList = sABIKECartRepository.findAll();
        assertThat(sABIKECartList).hasSize(databaseSizeBeforeUpdate);
        SABIKECart testSABIKECart = sABIKECartList.get(sABIKECartList.size() - 1);
        assertThat(testSABIKECart.getCartId()).isEqualTo(UPDATED_CART_ID);
    }

    @Test
    @Transactional
    public void updateNonExistingSABIKECart() throws Exception {
        int databaseSizeBeforeUpdate = sABIKECartRepository.findAll().size();

        // Create the SABIKECart

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSABIKECartMockMvc.perform(put("/api/sabike-carts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sABIKECart)))
            .andExpect(status().isBadRequest());

        // Validate the SABIKECart in the database
        List<SABIKECart> sABIKECartList = sABIKECartRepository.findAll();
        assertThat(sABIKECartList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSABIKECart() throws Exception {
        // Initialize the database
        sABIKECartRepository.saveAndFlush(sABIKECart);

        int databaseSizeBeforeDelete = sABIKECartRepository.findAll().size();

        // Delete the sABIKECart
        restSABIKECartMockMvc.perform(delete("/api/sabike-carts/{id}", sABIKECart.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<SABIKECart> sABIKECartList = sABIKECartRepository.findAll();
        assertThat(sABIKECartList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SABIKECart.class);
        SABIKECart sABIKECart1 = new SABIKECart();
        sABIKECart1.setId(1L);
        SABIKECart sABIKECart2 = new SABIKECart();
        sABIKECart2.setId(sABIKECart1.getId());
        assertThat(sABIKECart1).isEqualTo(sABIKECart2);
        sABIKECart2.setId(2L);
        assertThat(sABIKECart1).isNotEqualTo(sABIKECart2);
        sABIKECart1.setId(null);
        assertThat(sABIKECart1).isNotEqualTo(sABIKECart2);
    }
}
