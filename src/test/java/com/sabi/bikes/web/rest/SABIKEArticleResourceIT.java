package com.sabi.bikes.web.rest;

import com.sabi.bikes.SabikeApp;
import com.sabi.bikes.domain.SABIKEArticle;
import com.sabi.bikes.repository.SABIKEArticleRepository;
import com.sabi.bikes.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

import static com.sabi.bikes.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link SABIKEArticleResource} REST controller.
 */
@SpringBootTest(classes = SabikeApp.class)
public class SABIKEArticleResourceIT {

    private static final Integer DEFAULT_ARTICLE_ID = 1;
    private static final Integer UPDATED_ARTICLE_ID = 2;
    private static final Integer SMALLER_ARTICLE_ID = 1 - 1;

    private static final Float DEFAULT_PRICE = 1F;
    private static final Float UPDATED_PRICE = 2F;
    private static final Float SMALLER_PRICE = 1F - 1F;

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_STOCK = 1;
    private static final Integer UPDATED_STOCK = 2;
    private static final Integer SMALLER_STOCK = 1 - 1;

    private static final Integer DEFAULT_PICTURE = 1;
    private static final Integer UPDATED_PICTURE = 2;
    private static final Integer SMALLER_PICTURE = 1 - 1;

    @Autowired
    private SABIKEArticleRepository sABIKEArticleRepository;

    @Mock
    private SABIKEArticleRepository sABIKEArticleRepositoryMock;

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

    private MockMvc restSABIKEArticleMockMvc;

    private SABIKEArticle sABIKEArticle;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SABIKEArticleResource sABIKEArticleResource = new SABIKEArticleResource(sABIKEArticleRepository);
        this.restSABIKEArticleMockMvc = MockMvcBuilders.standaloneSetup(sABIKEArticleResource)
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
    public static SABIKEArticle createEntity(EntityManager em) {
        SABIKEArticle sABIKEArticle = new SABIKEArticle()
            .articleId(DEFAULT_ARTICLE_ID)
            .price(DEFAULT_PRICE)
            .name(DEFAULT_NAME)
            .stock(DEFAULT_STOCK)
            .picture(DEFAULT_PICTURE);
        return sABIKEArticle;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SABIKEArticle createUpdatedEntity(EntityManager em) {
        SABIKEArticle sABIKEArticle = new SABIKEArticle()
            .articleId(UPDATED_ARTICLE_ID)
            .price(UPDATED_PRICE)
            .name(UPDATED_NAME)
            .stock(UPDATED_STOCK)
            .picture(UPDATED_PICTURE);
        return sABIKEArticle;
    }

    @BeforeEach
    public void initTest() {
        sABIKEArticle = createEntity(em);
    }

    @Test
    @Transactional
    public void createSABIKEArticle() throws Exception {
        int databaseSizeBeforeCreate = sABIKEArticleRepository.findAll().size();

        // Create the SABIKEArticle
        restSABIKEArticleMockMvc.perform(post("/api/sabike-articles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sABIKEArticle)))
            .andExpect(status().isCreated());

        // Validate the SABIKEArticle in the database
        List<SABIKEArticle> sABIKEArticleList = sABIKEArticleRepository.findAll();
        assertThat(sABIKEArticleList).hasSize(databaseSizeBeforeCreate + 1);
        SABIKEArticle testSABIKEArticle = sABIKEArticleList.get(sABIKEArticleList.size() - 1);
        assertThat(testSABIKEArticle.getArticleId()).isEqualTo(DEFAULT_ARTICLE_ID);
        assertThat(testSABIKEArticle.getPrice()).isEqualTo(DEFAULT_PRICE);
        assertThat(testSABIKEArticle.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testSABIKEArticle.getStock()).isEqualTo(DEFAULT_STOCK);
        assertThat(testSABIKEArticle.getPicture()).isEqualTo(DEFAULT_PICTURE);
    }

    @Test
    @Transactional
    public void createSABIKEArticleWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = sABIKEArticleRepository.findAll().size();

        // Create the SABIKEArticle with an existing ID
        sABIKEArticle.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSABIKEArticleMockMvc.perform(post("/api/sabike-articles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sABIKEArticle)))
            .andExpect(status().isBadRequest());

        // Validate the SABIKEArticle in the database
        List<SABIKEArticle> sABIKEArticleList = sABIKEArticleRepository.findAll();
        assertThat(sABIKEArticleList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllSABIKEArticles() throws Exception {
        // Initialize the database
        sABIKEArticleRepository.saveAndFlush(sABIKEArticle);

        // Get all the sABIKEArticleList
        restSABIKEArticleMockMvc.perform(get("/api/sabike-articles?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(sABIKEArticle.getId().intValue())))
            .andExpect(jsonPath("$.[*].articleId").value(hasItem(DEFAULT_ARTICLE_ID)))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE.doubleValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].stock").value(hasItem(DEFAULT_STOCK)))
            .andExpect(jsonPath("$.[*].picture").value(hasItem(DEFAULT_PICTURE)));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllSABIKEArticlesWithEagerRelationshipsIsEnabled() throws Exception {
        SABIKEArticleResource sABIKEArticleResource = new SABIKEArticleResource(sABIKEArticleRepositoryMock);
        when(sABIKEArticleRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restSABIKEArticleMockMvc = MockMvcBuilders.standaloneSetup(sABIKEArticleResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restSABIKEArticleMockMvc.perform(get("/api/sabike-articles?eagerload=true"))
        .andExpect(status().isOk());

        verify(sABIKEArticleRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllSABIKEArticlesWithEagerRelationshipsIsNotEnabled() throws Exception {
        SABIKEArticleResource sABIKEArticleResource = new SABIKEArticleResource(sABIKEArticleRepositoryMock);
            when(sABIKEArticleRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restSABIKEArticleMockMvc = MockMvcBuilders.standaloneSetup(sABIKEArticleResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restSABIKEArticleMockMvc.perform(get("/api/sabike-articles?eagerload=true"))
        .andExpect(status().isOk());

            verify(sABIKEArticleRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getSABIKEArticle() throws Exception {
        // Initialize the database
        sABIKEArticleRepository.saveAndFlush(sABIKEArticle);

        // Get the sABIKEArticle
        restSABIKEArticleMockMvc.perform(get("/api/sabike-articles/{id}", sABIKEArticle.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(sABIKEArticle.getId().intValue()))
            .andExpect(jsonPath("$.articleId").value(DEFAULT_ARTICLE_ID))
            .andExpect(jsonPath("$.price").value(DEFAULT_PRICE.doubleValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.stock").value(DEFAULT_STOCK))
            .andExpect(jsonPath("$.picture").value(DEFAULT_PICTURE));
    }

    @Test
    @Transactional
    public void getNonExistingSABIKEArticle() throws Exception {
        // Get the sABIKEArticle
        restSABIKEArticleMockMvc.perform(get("/api/sabike-articles/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSABIKEArticle() throws Exception {
        // Initialize the database
        sABIKEArticleRepository.saveAndFlush(sABIKEArticle);

        int databaseSizeBeforeUpdate = sABIKEArticleRepository.findAll().size();

        // Update the sABIKEArticle
        SABIKEArticle updatedSABIKEArticle = sABIKEArticleRepository.findById(sABIKEArticle.getId()).get();
        // Disconnect from session so that the updates on updatedSABIKEArticle are not directly saved in db
        em.detach(updatedSABIKEArticle);
        updatedSABIKEArticle
            .articleId(UPDATED_ARTICLE_ID)
            .price(UPDATED_PRICE)
            .name(UPDATED_NAME)
            .stock(UPDATED_STOCK)
            .picture(UPDATED_PICTURE);

        restSABIKEArticleMockMvc.perform(put("/api/sabike-articles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSABIKEArticle)))
            .andExpect(status().isOk());

        // Validate the SABIKEArticle in the database
        List<SABIKEArticle> sABIKEArticleList = sABIKEArticleRepository.findAll();
        assertThat(sABIKEArticleList).hasSize(databaseSizeBeforeUpdate);
        SABIKEArticle testSABIKEArticle = sABIKEArticleList.get(sABIKEArticleList.size() - 1);
        assertThat(testSABIKEArticle.getArticleId()).isEqualTo(UPDATED_ARTICLE_ID);
        assertThat(testSABIKEArticle.getPrice()).isEqualTo(UPDATED_PRICE);
        assertThat(testSABIKEArticle.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testSABIKEArticle.getStock()).isEqualTo(UPDATED_STOCK);
        assertThat(testSABIKEArticle.getPicture()).isEqualTo(UPDATED_PICTURE);
    }

    @Test
    @Transactional
    public void updateNonExistingSABIKEArticle() throws Exception {
        int databaseSizeBeforeUpdate = sABIKEArticleRepository.findAll().size();

        // Create the SABIKEArticle

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSABIKEArticleMockMvc.perform(put("/api/sabike-articles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sABIKEArticle)))
            .andExpect(status().isBadRequest());

        // Validate the SABIKEArticle in the database
        List<SABIKEArticle> sABIKEArticleList = sABIKEArticleRepository.findAll();
        assertThat(sABIKEArticleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSABIKEArticle() throws Exception {
        // Initialize the database
        sABIKEArticleRepository.saveAndFlush(sABIKEArticle);

        int databaseSizeBeforeDelete = sABIKEArticleRepository.findAll().size();

        // Delete the sABIKEArticle
        restSABIKEArticleMockMvc.perform(delete("/api/sabike-articles/{id}", sABIKEArticle.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<SABIKEArticle> sABIKEArticleList = sABIKEArticleRepository.findAll();
        assertThat(sABIKEArticleList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SABIKEArticle.class);
        SABIKEArticle sABIKEArticle1 = new SABIKEArticle();
        sABIKEArticle1.setId(1L);
        SABIKEArticle sABIKEArticle2 = new SABIKEArticle();
        sABIKEArticle2.setId(sABIKEArticle1.getId());
        assertThat(sABIKEArticle1).isEqualTo(sABIKEArticle2);
        sABIKEArticle2.setId(2L);
        assertThat(sABIKEArticle1).isNotEqualTo(sABIKEArticle2);
        sABIKEArticle1.setId(null);
        assertThat(sABIKEArticle1).isNotEqualTo(sABIKEArticle2);
    }
}
