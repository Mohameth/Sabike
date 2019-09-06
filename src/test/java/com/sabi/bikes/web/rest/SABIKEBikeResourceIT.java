package com.sabi.bikes.web.rest;

import com.sabi.bikes.SabikeApp;
import com.sabi.bikes.domain.SABIKEBike;
import com.sabi.bikes.repository.SABIKEBikeRepository;
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

import com.sabi.bikes.domain.enumeration.SABIKEBikeType;
/**
 * Integration tests for the {@link SABIKEBikeResource} REST controller.
 */
@SpringBootTest(classes = SabikeApp.class)
public class SABIKEBikeResourceIT {

    private static final SABIKEBikeType DEFAULT_TYPE = SABIKEBikeType.VTT;
    private static final SABIKEBikeType UPDATED_TYPE = SABIKEBikeType.COURSE;

    private static final Float DEFAULT_SIZE = 1F;
    private static final Float UPDATED_SIZE = 2F;
    private static final Float SMALLER_SIZE = 1F - 1F;

    private static final Integer DEFAULT_SPEEDS = 1;
    private static final Integer UPDATED_SPEEDS = 2;
    private static final Integer SMALLER_SPEEDS = 1 - 1;

    private static final String DEFAULT_COLOR = "AAAAAAAAAA";
    private static final String UPDATED_COLOR = "BBBBBBBBBB";

    @Autowired
    private SABIKEBikeRepository sABIKEBikeRepository;

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

    private MockMvc restSABIKEBikeMockMvc;

    private SABIKEBike sABIKEBike;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SABIKEBikeResource sABIKEBikeResource = new SABIKEBikeResource(sABIKEBikeRepository);
        this.restSABIKEBikeMockMvc = MockMvcBuilders.standaloneSetup(sABIKEBikeResource)
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
    public static SABIKEBike createEntity(EntityManager em) {
        SABIKEBike sABIKEBike = new SABIKEBike()
            .type(DEFAULT_TYPE)
            .size(DEFAULT_SIZE)
            .speeds(DEFAULT_SPEEDS)
            .color(DEFAULT_COLOR);
        return sABIKEBike;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SABIKEBike createUpdatedEntity(EntityManager em) {
        SABIKEBike sABIKEBike = new SABIKEBike()
            .type(UPDATED_TYPE)
            .size(UPDATED_SIZE)
            .speeds(UPDATED_SPEEDS)
            .color(UPDATED_COLOR);
        return sABIKEBike;
    }

    @BeforeEach
    public void initTest() {
        sABIKEBike = createEntity(em);
    }

    @Test
    @Transactional
    public void createSABIKEBike() throws Exception {
        int databaseSizeBeforeCreate = sABIKEBikeRepository.findAll().size();

        // Create the SABIKEBike
        restSABIKEBikeMockMvc.perform(post("/api/sabike-bikes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sABIKEBike)))
            .andExpect(status().isCreated());

        // Validate the SABIKEBike in the database
        List<SABIKEBike> sABIKEBikeList = sABIKEBikeRepository.findAll();
        assertThat(sABIKEBikeList).hasSize(databaseSizeBeforeCreate + 1);
        SABIKEBike testSABIKEBike = sABIKEBikeList.get(sABIKEBikeList.size() - 1);
        assertThat(testSABIKEBike.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testSABIKEBike.getSize()).isEqualTo(DEFAULT_SIZE);
        assertThat(testSABIKEBike.getSpeeds()).isEqualTo(DEFAULT_SPEEDS);
        assertThat(testSABIKEBike.getColor()).isEqualTo(DEFAULT_COLOR);
    }

    @Test
    @Transactional
    public void createSABIKEBikeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = sABIKEBikeRepository.findAll().size();

        // Create the SABIKEBike with an existing ID
        sABIKEBike.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSABIKEBikeMockMvc.perform(post("/api/sabike-bikes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sABIKEBike)))
            .andExpect(status().isBadRequest());

        // Validate the SABIKEBike in the database
        List<SABIKEBike> sABIKEBikeList = sABIKEBikeRepository.findAll();
        assertThat(sABIKEBikeList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllSABIKEBikes() throws Exception {
        // Initialize the database
        sABIKEBikeRepository.saveAndFlush(sABIKEBike);

        // Get all the sABIKEBikeList
        restSABIKEBikeMockMvc.perform(get("/api/sabike-bikes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(sABIKEBike.getId().intValue())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].size").value(hasItem(DEFAULT_SIZE.doubleValue())))
            .andExpect(jsonPath("$.[*].speeds").value(hasItem(DEFAULT_SPEEDS)))
            .andExpect(jsonPath("$.[*].color").value(hasItem(DEFAULT_COLOR.toString())));
    }
    
    @Test
    @Transactional
    public void getSABIKEBike() throws Exception {
        // Initialize the database
        sABIKEBikeRepository.saveAndFlush(sABIKEBike);

        // Get the sABIKEBike
        restSABIKEBikeMockMvc.perform(get("/api/sabike-bikes/{id}", sABIKEBike.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(sABIKEBike.getId().intValue()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.size").value(DEFAULT_SIZE.doubleValue()))
            .andExpect(jsonPath("$.speeds").value(DEFAULT_SPEEDS))
            .andExpect(jsonPath("$.color").value(DEFAULT_COLOR.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSABIKEBike() throws Exception {
        // Get the sABIKEBike
        restSABIKEBikeMockMvc.perform(get("/api/sabike-bikes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSABIKEBike() throws Exception {
        // Initialize the database
        sABIKEBikeRepository.saveAndFlush(sABIKEBike);

        int databaseSizeBeforeUpdate = sABIKEBikeRepository.findAll().size();

        // Update the sABIKEBike
        SABIKEBike updatedSABIKEBike = sABIKEBikeRepository.findById(sABIKEBike.getId()).get();
        // Disconnect from session so that the updates on updatedSABIKEBike are not directly saved in db
        em.detach(updatedSABIKEBike);
        updatedSABIKEBike
            .type(UPDATED_TYPE)
            .size(UPDATED_SIZE)
            .speeds(UPDATED_SPEEDS)
            .color(UPDATED_COLOR);

        restSABIKEBikeMockMvc.perform(put("/api/sabike-bikes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSABIKEBike)))
            .andExpect(status().isOk());

        // Validate the SABIKEBike in the database
        List<SABIKEBike> sABIKEBikeList = sABIKEBikeRepository.findAll();
        assertThat(sABIKEBikeList).hasSize(databaseSizeBeforeUpdate);
        SABIKEBike testSABIKEBike = sABIKEBikeList.get(sABIKEBikeList.size() - 1);
        assertThat(testSABIKEBike.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testSABIKEBike.getSize()).isEqualTo(UPDATED_SIZE);
        assertThat(testSABIKEBike.getSpeeds()).isEqualTo(UPDATED_SPEEDS);
        assertThat(testSABIKEBike.getColor()).isEqualTo(UPDATED_COLOR);
    }

    @Test
    @Transactional
    public void updateNonExistingSABIKEBike() throws Exception {
        int databaseSizeBeforeUpdate = sABIKEBikeRepository.findAll().size();

        // Create the SABIKEBike

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSABIKEBikeMockMvc.perform(put("/api/sabike-bikes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sABIKEBike)))
            .andExpect(status().isBadRequest());

        // Validate the SABIKEBike in the database
        List<SABIKEBike> sABIKEBikeList = sABIKEBikeRepository.findAll();
        assertThat(sABIKEBikeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSABIKEBike() throws Exception {
        // Initialize the database
        sABIKEBikeRepository.saveAndFlush(sABIKEBike);

        int databaseSizeBeforeDelete = sABIKEBikeRepository.findAll().size();

        // Delete the sABIKEBike
        restSABIKEBikeMockMvc.perform(delete("/api/sabike-bikes/{id}", sABIKEBike.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<SABIKEBike> sABIKEBikeList = sABIKEBikeRepository.findAll();
        assertThat(sABIKEBikeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SABIKEBike.class);
        SABIKEBike sABIKEBike1 = new SABIKEBike();
        sABIKEBike1.setId(1L);
        SABIKEBike sABIKEBike2 = new SABIKEBike();
        sABIKEBike2.setId(sABIKEBike1.getId());
        assertThat(sABIKEBike1).isEqualTo(sABIKEBike2);
        sABIKEBike2.setId(2L);
        assertThat(sABIKEBike1).isNotEqualTo(sABIKEBike2);
        sABIKEBike1.setId(null);
        assertThat(sABIKEBike1).isNotEqualTo(sABIKEBike2);
    }
}
