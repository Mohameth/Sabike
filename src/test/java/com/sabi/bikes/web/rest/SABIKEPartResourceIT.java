package com.sabi.bikes.web.rest;

import com.sabi.bikes.SabikeApp;
import com.sabi.bikes.domain.SABIKEPart;
import com.sabi.bikes.repository.SABIKEPartRepository;
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

import com.sabi.bikes.domain.enumeration.SABIKEPartCategory;
import com.sabi.bikes.domain.enumeration.SABIKEPartCategoryType;
/**
 * Integration tests for the {@link SABIKEPartResource} REST controller.
 */
@SpringBootTest(classes = SabikeApp.class)
public class SABIKEPartResourceIT {

    private static final SABIKEPartCategory DEFAULT_CATEGORY = SABIKEPartCategory.TRANSMISSION;
    private static final SABIKEPartCategory UPDATED_CATEGORY = SABIKEPartCategory.DIRECTION;

    private static final SABIKEPartCategoryType DEFAULT_TYPE = SABIKEPartCategoryType.GUIDON;
    private static final SABIKEPartCategoryType UPDATED_TYPE = SABIKEPartCategoryType.POTENCE;

    @Autowired
    private SABIKEPartRepository sABIKEPartRepository;

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

    private MockMvc restSABIKEPartMockMvc;

    private SABIKEPart sABIKEPart;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SABIKEPartResource sABIKEPartResource = new SABIKEPartResource(sABIKEPartRepository);
        this.restSABIKEPartMockMvc = MockMvcBuilders.standaloneSetup(sABIKEPartResource)
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
    public static SABIKEPart createEntity(EntityManager em) {
        SABIKEPart sABIKEPart = new SABIKEPart()
            .category(DEFAULT_CATEGORY)
            .type(DEFAULT_TYPE);
        return sABIKEPart;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SABIKEPart createUpdatedEntity(EntityManager em) {
        SABIKEPart sABIKEPart = new SABIKEPart()
            .category(UPDATED_CATEGORY)
            .type(UPDATED_TYPE);
        return sABIKEPart;
    }

    @BeforeEach
    public void initTest() {
        sABIKEPart = createEntity(em);
    }

    @Test
    @Transactional
    public void createSABIKEPart() throws Exception {
        int databaseSizeBeforeCreate = sABIKEPartRepository.findAll().size();

        // Create the SABIKEPart
        restSABIKEPartMockMvc.perform(post("/api/sabike-parts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sABIKEPart)))
            .andExpect(status().isCreated());

        // Validate the SABIKEPart in the database
        List<SABIKEPart> sABIKEPartList = sABIKEPartRepository.findAll();
        assertThat(sABIKEPartList).hasSize(databaseSizeBeforeCreate + 1);
        SABIKEPart testSABIKEPart = sABIKEPartList.get(sABIKEPartList.size() - 1);
        assertThat(testSABIKEPart.getCategory()).isEqualTo(DEFAULT_CATEGORY);
        assertThat(testSABIKEPart.getType()).isEqualTo(DEFAULT_TYPE);
    }

    @Test
    @Transactional
    public void createSABIKEPartWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = sABIKEPartRepository.findAll().size();

        // Create the SABIKEPart with an existing ID
        sABIKEPart.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSABIKEPartMockMvc.perform(post("/api/sabike-parts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sABIKEPart)))
            .andExpect(status().isBadRequest());

        // Validate the SABIKEPart in the database
        List<SABIKEPart> sABIKEPartList = sABIKEPartRepository.findAll();
        assertThat(sABIKEPartList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllSABIKEParts() throws Exception {
        // Initialize the database
        sABIKEPartRepository.saveAndFlush(sABIKEPart);

        // Get all the sABIKEPartList
        restSABIKEPartMockMvc.perform(get("/api/sabike-parts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(sABIKEPart.getId().intValue())))
            .andExpect(jsonPath("$.[*].category").value(hasItem(DEFAULT_CATEGORY.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())));
    }
    
    @Test
    @Transactional
    public void getSABIKEPart() throws Exception {
        // Initialize the database
        sABIKEPartRepository.saveAndFlush(sABIKEPart);

        // Get the sABIKEPart
        restSABIKEPartMockMvc.perform(get("/api/sabike-parts/{id}", sABIKEPart.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(sABIKEPart.getId().intValue()))
            .andExpect(jsonPath("$.category").value(DEFAULT_CATEGORY.toString()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSABIKEPart() throws Exception {
        // Get the sABIKEPart
        restSABIKEPartMockMvc.perform(get("/api/sabike-parts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSABIKEPart() throws Exception {
        // Initialize the database
        sABIKEPartRepository.saveAndFlush(sABIKEPart);

        int databaseSizeBeforeUpdate = sABIKEPartRepository.findAll().size();

        // Update the sABIKEPart
        SABIKEPart updatedSABIKEPart = sABIKEPartRepository.findById(sABIKEPart.getId()).get();
        // Disconnect from session so that the updates on updatedSABIKEPart are not directly saved in db
        em.detach(updatedSABIKEPart);
        updatedSABIKEPart
            .category(UPDATED_CATEGORY)
            .type(UPDATED_TYPE);

        restSABIKEPartMockMvc.perform(put("/api/sabike-parts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSABIKEPart)))
            .andExpect(status().isOk());

        // Validate the SABIKEPart in the database
        List<SABIKEPart> sABIKEPartList = sABIKEPartRepository.findAll();
        assertThat(sABIKEPartList).hasSize(databaseSizeBeforeUpdate);
        SABIKEPart testSABIKEPart = sABIKEPartList.get(sABIKEPartList.size() - 1);
        assertThat(testSABIKEPart.getCategory()).isEqualTo(UPDATED_CATEGORY);
        assertThat(testSABIKEPart.getType()).isEqualTo(UPDATED_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingSABIKEPart() throws Exception {
        int databaseSizeBeforeUpdate = sABIKEPartRepository.findAll().size();

        // Create the SABIKEPart

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSABIKEPartMockMvc.perform(put("/api/sabike-parts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sABIKEPart)))
            .andExpect(status().isBadRequest());

        // Validate the SABIKEPart in the database
        List<SABIKEPart> sABIKEPartList = sABIKEPartRepository.findAll();
        assertThat(sABIKEPartList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSABIKEPart() throws Exception {
        // Initialize the database
        sABIKEPartRepository.saveAndFlush(sABIKEPart);

        int databaseSizeBeforeDelete = sABIKEPartRepository.findAll().size();

        // Delete the sABIKEPart
        restSABIKEPartMockMvc.perform(delete("/api/sabike-parts/{id}", sABIKEPart.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<SABIKEPart> sABIKEPartList = sABIKEPartRepository.findAll();
        assertThat(sABIKEPartList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SABIKEPart.class);
        SABIKEPart sABIKEPart1 = new SABIKEPart();
        sABIKEPart1.setId(1L);
        SABIKEPart sABIKEPart2 = new SABIKEPart();
        sABIKEPart2.setId(sABIKEPart1.getId());
        assertThat(sABIKEPart1).isEqualTo(sABIKEPart2);
        sABIKEPart2.setId(2L);
        assertThat(sABIKEPart1).isNotEqualTo(sABIKEPart2);
        sABIKEPart1.setId(null);
        assertThat(sABIKEPart1).isNotEqualTo(sABIKEPart2);
    }
}
