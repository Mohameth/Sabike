package com.sabi.bikes.web.rest;

import com.sabi.bikes.SabikeApp;
import com.sabi.bikes.domain.SABIKECommande;
import com.sabi.bikes.repository.SABIKECommandeRepository;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static com.sabi.bikes.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.sabi.bikes.domain.enumeration.SABIKECommandeStatus;
/**
 * Integration tests for the {@link SABIKECommandeResource} REST controller.
 */
@SpringBootTest(classes = SabikeApp.class)
public class SABIKECommandeResourceIT {

    private static final Integer DEFAULT_ORDER_ID = 1;
    private static final Integer UPDATED_ORDER_ID = 2;
    private static final Integer SMALLER_ORDER_ID = 1 - 1;

    private static final String DEFAULT_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_NUMBER = "BBBBBBBBBB";

    private static final SABIKECommandeStatus DEFAULT_STATUS = SABIKECommandeStatus.PENDING;
    private static final SABIKECommandeStatus UPDATED_STATUS = SABIKECommandeStatus.VALIDATED;

    private static final LocalDate DEFAULT_ORDER_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_ORDER_DATE = LocalDate.now(ZoneId.systemDefault());
    private static final LocalDate SMALLER_ORDER_DATE = LocalDate.ofEpochDay(-1L);

    private static final String DEFAULT_ORDER_ITEMS = "AAAAAAAAAA";
    private static final String UPDATED_ORDER_ITEMS = "BBBBBBBBBB";

    @Autowired
    private SABIKECommandeRepository sABIKECommandeRepository;

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

    private MockMvc restSABIKECommandeMockMvc;

    private SABIKECommande sABIKECommande;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SABIKECommandeResource sABIKECommandeResource = new SABIKECommandeResource(sABIKECommandeRepository);
        this.restSABIKECommandeMockMvc = MockMvcBuilders.standaloneSetup(sABIKECommandeResource)
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
    public static SABIKECommande createEntity(EntityManager em) {
        SABIKECommande sABIKECommande = new SABIKECommande()
            .orderId(DEFAULT_ORDER_ID)
            .number(DEFAULT_NUMBER)
            .status(DEFAULT_STATUS)
            .orderDate(DEFAULT_ORDER_DATE)
            .orderItems(DEFAULT_ORDER_ITEMS);
        return sABIKECommande;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SABIKECommande createUpdatedEntity(EntityManager em) {
        SABIKECommande sABIKECommande = new SABIKECommande()
            .orderId(UPDATED_ORDER_ID)
            .number(UPDATED_NUMBER)
            .status(UPDATED_STATUS)
            .orderDate(UPDATED_ORDER_DATE)
            .orderItems(UPDATED_ORDER_ITEMS);
        return sABIKECommande;
    }

    @BeforeEach
    public void initTest() {
        sABIKECommande = createEntity(em);
    }

    @Test
    @Transactional
    public void createSABIKECommande() throws Exception {
        int databaseSizeBeforeCreate = sABIKECommandeRepository.findAll().size();

        // Create the SABIKECommande
        restSABIKECommandeMockMvc.perform(post("/api/sabike-commandes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sABIKECommande)))
            .andExpect(status().isCreated());

        // Validate the SABIKECommande in the database
        List<SABIKECommande> sABIKECommandeList = sABIKECommandeRepository.findAll();
        assertThat(sABIKECommandeList).hasSize(databaseSizeBeforeCreate + 1);
        SABIKECommande testSABIKECommande = sABIKECommandeList.get(sABIKECommandeList.size() - 1);
        assertThat(testSABIKECommande.getOrderId()).isEqualTo(DEFAULT_ORDER_ID);
        assertThat(testSABIKECommande.getNumber()).isEqualTo(DEFAULT_NUMBER);
        assertThat(testSABIKECommande.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testSABIKECommande.getOrderDate()).isEqualTo(DEFAULT_ORDER_DATE);
        assertThat(testSABIKECommande.getOrderItems()).isEqualTo(DEFAULT_ORDER_ITEMS);
    }

    @Test
    @Transactional
    public void createSABIKECommandeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = sABIKECommandeRepository.findAll().size();

        // Create the SABIKECommande with an existing ID
        sABIKECommande.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSABIKECommandeMockMvc.perform(post("/api/sabike-commandes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sABIKECommande)))
            .andExpect(status().isBadRequest());

        // Validate the SABIKECommande in the database
        List<SABIKECommande> sABIKECommandeList = sABIKECommandeRepository.findAll();
        assertThat(sABIKECommandeList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllSABIKECommandes() throws Exception {
        // Initialize the database
        sABIKECommandeRepository.saveAndFlush(sABIKECommande);

        // Get all the sABIKECommandeList
        restSABIKECommandeMockMvc.perform(get("/api/sabike-commandes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(sABIKECommande.getId().intValue())))
            .andExpect(jsonPath("$.[*].orderId").value(hasItem(DEFAULT_ORDER_ID)))
            .andExpect(jsonPath("$.[*].number").value(hasItem(DEFAULT_NUMBER.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].orderDate").value(hasItem(DEFAULT_ORDER_DATE.toString())))
            .andExpect(jsonPath("$.[*].orderItems").value(hasItem(DEFAULT_ORDER_ITEMS.toString())));
    }
    
    @Test
    @Transactional
    public void getSABIKECommande() throws Exception {
        // Initialize the database
        sABIKECommandeRepository.saveAndFlush(sABIKECommande);

        // Get the sABIKECommande
        restSABIKECommandeMockMvc.perform(get("/api/sabike-commandes/{id}", sABIKECommande.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(sABIKECommande.getId().intValue()))
            .andExpect(jsonPath("$.orderId").value(DEFAULT_ORDER_ID))
            .andExpect(jsonPath("$.number").value(DEFAULT_NUMBER.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.orderDate").value(DEFAULT_ORDER_DATE.toString()))
            .andExpect(jsonPath("$.orderItems").value(DEFAULT_ORDER_ITEMS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSABIKECommande() throws Exception {
        // Get the sABIKECommande
        restSABIKECommandeMockMvc.perform(get("/api/sabike-commandes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSABIKECommande() throws Exception {
        // Initialize the database
        sABIKECommandeRepository.saveAndFlush(sABIKECommande);

        int databaseSizeBeforeUpdate = sABIKECommandeRepository.findAll().size();

        // Update the sABIKECommande
        SABIKECommande updatedSABIKECommande = sABIKECommandeRepository.findById(sABIKECommande.getId()).get();
        // Disconnect from session so that the updates on updatedSABIKECommande are not directly saved in db
        em.detach(updatedSABIKECommande);
        updatedSABIKECommande
            .orderId(UPDATED_ORDER_ID)
            .number(UPDATED_NUMBER)
            .status(UPDATED_STATUS)
            .orderDate(UPDATED_ORDER_DATE)
            .orderItems(UPDATED_ORDER_ITEMS);

        restSABIKECommandeMockMvc.perform(put("/api/sabike-commandes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSABIKECommande)))
            .andExpect(status().isOk());

        // Validate the SABIKECommande in the database
        List<SABIKECommande> sABIKECommandeList = sABIKECommandeRepository.findAll();
        assertThat(sABIKECommandeList).hasSize(databaseSizeBeforeUpdate);
        SABIKECommande testSABIKECommande = sABIKECommandeList.get(sABIKECommandeList.size() - 1);
        assertThat(testSABIKECommande.getOrderId()).isEqualTo(UPDATED_ORDER_ID);
        assertThat(testSABIKECommande.getNumber()).isEqualTo(UPDATED_NUMBER);
        assertThat(testSABIKECommande.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testSABIKECommande.getOrderDate()).isEqualTo(UPDATED_ORDER_DATE);
        assertThat(testSABIKECommande.getOrderItems()).isEqualTo(UPDATED_ORDER_ITEMS);
    }

    @Test
    @Transactional
    public void updateNonExistingSABIKECommande() throws Exception {
        int databaseSizeBeforeUpdate = sABIKECommandeRepository.findAll().size();

        // Create the SABIKECommande

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSABIKECommandeMockMvc.perform(put("/api/sabike-commandes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sABIKECommande)))
            .andExpect(status().isBadRequest());

        // Validate the SABIKECommande in the database
        List<SABIKECommande> sABIKECommandeList = sABIKECommandeRepository.findAll();
        assertThat(sABIKECommandeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSABIKECommande() throws Exception {
        // Initialize the database
        sABIKECommandeRepository.saveAndFlush(sABIKECommande);

        int databaseSizeBeforeDelete = sABIKECommandeRepository.findAll().size();

        // Delete the sABIKECommande
        restSABIKECommandeMockMvc.perform(delete("/api/sabike-commandes/{id}", sABIKECommande.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<SABIKECommande> sABIKECommandeList = sABIKECommandeRepository.findAll();
        assertThat(sABIKECommandeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SABIKECommande.class);
        SABIKECommande sABIKECommande1 = new SABIKECommande();
        sABIKECommande1.setId(1L);
        SABIKECommande sABIKECommande2 = new SABIKECommande();
        sABIKECommande2.setId(sABIKECommande1.getId());
        assertThat(sABIKECommande1).isEqualTo(sABIKECommande2);
        sABIKECommande2.setId(2L);
        assertThat(sABIKECommande1).isNotEqualTo(sABIKECommande2);
        sABIKECommande1.setId(null);
        assertThat(sABIKECommande1).isNotEqualTo(sABIKECommande2);
    }
}
