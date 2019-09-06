package com.sabi.bikes.web.rest;

import com.sabi.bikes.SabikeApp;
import com.sabi.bikes.domain.SABIKEUser;
import com.sabi.bikes.repository.SABIKEUserRepository;
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
 * Integration tests for the {@link SABIKEUserResource} REST controller.
 */
@SpringBootTest(classes = SabikeApp.class)
public class SABIKEUserResourceIT {

    private static final Integer DEFAULT_USER_ID = 1;
    private static final Integer UPDATED_USER_ID = 2;
    private static final Integer SMALLER_USER_ID = 1 - 1;

    private static final String DEFAULT_PASSWORD = "AAAAAAAAAA";
    private static final String UPDATED_PASSWORD = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_FIRST = "AAAAAAAAAA";
    private static final String UPDATED_FIRST = "BBBBBBBBBB";

    private static final String DEFAULT_LAST = "AAAAAAAAAA";
    private static final String UPDATED_LAST = "BBBBBBBBBB";

    private static final Boolean DEFAULT_IS_ADMIN = false;
    private static final Boolean UPDATED_IS_ADMIN = true;

    private static final String DEFAULT_DELIVERY_ADDRESS_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_DELIVERY_ADDRESS_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_DELIVERY_ADDRESS_STREET = "AAAAAAAAAA";
    private static final String UPDATED_DELIVERY_ADDRESS_STREET = "BBBBBBBBBB";

    private static final String DEFAULT_DELIVERY_ADDRESS_CITY = "AAAAAAAAAA";
    private static final String UPDATED_DELIVERY_ADDRESS_CITY = "BBBBBBBBBB";

    private static final String DEFAULT_DELIVERY_ADDRESS_POSTAL_CODE = "AAAAAAAAAA";
    private static final String UPDATED_DELIVERY_ADDRESS_POSTAL_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_DELIVERY_ADDRESS_COUNTRY = "AAAAAAAAAA";
    private static final String UPDATED_DELIVERY_ADDRESS_COUNTRY = "BBBBBBBBBB";

    private static final String DEFAULT_BILLING_ADDRESS_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_BILLING_ADDRESS_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_BILLING_ADDRESS_STREET = "AAAAAAAAAA";
    private static final String UPDATED_BILLING_ADDRESS_STREET = "BBBBBBBBBB";

    private static final String DEFAULT_BILLING_ADDRESS_CITY = "AAAAAAAAAA";
    private static final String UPDATED_BILLING_ADDRESS_CITY = "BBBBBBBBBB";

    private static final String DEFAULT_BILLING_ADDRESS_POSTAL_CODE = "AAAAAAAAAA";
    private static final String UPDATED_BILLING_ADDRESS_POSTAL_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_BILLING_ADDRESS_COUNTRY = "AAAAAAAAAA";
    private static final String UPDATED_BILLING_ADDRESS_COUNTRY = "BBBBBBBBBB";

    @Autowired
    private SABIKEUserRepository sABIKEUserRepository;

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

    private MockMvc restSABIKEUserMockMvc;

    private SABIKEUser sABIKEUser;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SABIKEUserResource sABIKEUserResource = new SABIKEUserResource(sABIKEUserRepository);
        this.restSABIKEUserMockMvc = MockMvcBuilders.standaloneSetup(sABIKEUserResource)
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
    public static SABIKEUser createEntity(EntityManager em) {
        SABIKEUser sABIKEUser = new SABIKEUser()
            .userId(DEFAULT_USER_ID)
            .password(DEFAULT_PASSWORD)
            .email(DEFAULT_EMAIL)
            .first(DEFAULT_FIRST)
            .last(DEFAULT_LAST)
            .isAdmin(DEFAULT_IS_ADMIN)
            .deliveryAddressNumber(DEFAULT_DELIVERY_ADDRESS_NUMBER)
            .deliveryAddressStreet(DEFAULT_DELIVERY_ADDRESS_STREET)
            .deliveryAddressCity(DEFAULT_DELIVERY_ADDRESS_CITY)
            .deliveryAddressPostalCode(DEFAULT_DELIVERY_ADDRESS_POSTAL_CODE)
            .deliveryAddressCountry(DEFAULT_DELIVERY_ADDRESS_COUNTRY)
            .billingAddressNumber(DEFAULT_BILLING_ADDRESS_NUMBER)
            .billingAddressStreet(DEFAULT_BILLING_ADDRESS_STREET)
            .billingAddressCity(DEFAULT_BILLING_ADDRESS_CITY)
            .billingAddressPostalCode(DEFAULT_BILLING_ADDRESS_POSTAL_CODE)
            .billingAddressCountry(DEFAULT_BILLING_ADDRESS_COUNTRY);
        return sABIKEUser;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SABIKEUser createUpdatedEntity(EntityManager em) {
        SABIKEUser sABIKEUser = new SABIKEUser()
            .userId(UPDATED_USER_ID)
            .password(UPDATED_PASSWORD)
            .email(UPDATED_EMAIL)
            .first(UPDATED_FIRST)
            .last(UPDATED_LAST)
            .isAdmin(UPDATED_IS_ADMIN)
            .deliveryAddressNumber(UPDATED_DELIVERY_ADDRESS_NUMBER)
            .deliveryAddressStreet(UPDATED_DELIVERY_ADDRESS_STREET)
            .deliveryAddressCity(UPDATED_DELIVERY_ADDRESS_CITY)
            .deliveryAddressPostalCode(UPDATED_DELIVERY_ADDRESS_POSTAL_CODE)
            .deliveryAddressCountry(UPDATED_DELIVERY_ADDRESS_COUNTRY)
            .billingAddressNumber(UPDATED_BILLING_ADDRESS_NUMBER)
            .billingAddressStreet(UPDATED_BILLING_ADDRESS_STREET)
            .billingAddressCity(UPDATED_BILLING_ADDRESS_CITY)
            .billingAddressPostalCode(UPDATED_BILLING_ADDRESS_POSTAL_CODE)
            .billingAddressCountry(UPDATED_BILLING_ADDRESS_COUNTRY);
        return sABIKEUser;
    }

    @BeforeEach
    public void initTest() {
        sABIKEUser = createEntity(em);
    }

    @Test
    @Transactional
    public void createSABIKEUser() throws Exception {
        int databaseSizeBeforeCreate = sABIKEUserRepository.findAll().size();

        // Create the SABIKEUser
        restSABIKEUserMockMvc.perform(post("/api/sabike-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sABIKEUser)))
            .andExpect(status().isCreated());

        // Validate the SABIKEUser in the database
        List<SABIKEUser> sABIKEUserList = sABIKEUserRepository.findAll();
        assertThat(sABIKEUserList).hasSize(databaseSizeBeforeCreate + 1);
        SABIKEUser testSABIKEUser = sABIKEUserList.get(sABIKEUserList.size() - 1);
        assertThat(testSABIKEUser.getUserId()).isEqualTo(DEFAULT_USER_ID);
        assertThat(testSABIKEUser.getPassword()).isEqualTo(DEFAULT_PASSWORD);
        assertThat(testSABIKEUser.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testSABIKEUser.getFirst()).isEqualTo(DEFAULT_FIRST);
        assertThat(testSABIKEUser.getLast()).isEqualTo(DEFAULT_LAST);
        assertThat(testSABIKEUser.isIsAdmin()).isEqualTo(DEFAULT_IS_ADMIN);
        assertThat(testSABIKEUser.getDeliveryAddressNumber()).isEqualTo(DEFAULT_DELIVERY_ADDRESS_NUMBER);
        assertThat(testSABIKEUser.getDeliveryAddressStreet()).isEqualTo(DEFAULT_DELIVERY_ADDRESS_STREET);
        assertThat(testSABIKEUser.getDeliveryAddressCity()).isEqualTo(DEFAULT_DELIVERY_ADDRESS_CITY);
        assertThat(testSABIKEUser.getDeliveryAddressPostalCode()).isEqualTo(DEFAULT_DELIVERY_ADDRESS_POSTAL_CODE);
        assertThat(testSABIKEUser.getDeliveryAddressCountry()).isEqualTo(DEFAULT_DELIVERY_ADDRESS_COUNTRY);
        assertThat(testSABIKEUser.getBillingAddressNumber()).isEqualTo(DEFAULT_BILLING_ADDRESS_NUMBER);
        assertThat(testSABIKEUser.getBillingAddressStreet()).isEqualTo(DEFAULT_BILLING_ADDRESS_STREET);
        assertThat(testSABIKEUser.getBillingAddressCity()).isEqualTo(DEFAULT_BILLING_ADDRESS_CITY);
        assertThat(testSABIKEUser.getBillingAddressPostalCode()).isEqualTo(DEFAULT_BILLING_ADDRESS_POSTAL_CODE);
        assertThat(testSABIKEUser.getBillingAddressCountry()).isEqualTo(DEFAULT_BILLING_ADDRESS_COUNTRY);
    }

    @Test
    @Transactional
    public void createSABIKEUserWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = sABIKEUserRepository.findAll().size();

        // Create the SABIKEUser with an existing ID
        sABIKEUser.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSABIKEUserMockMvc.perform(post("/api/sabike-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sABIKEUser)))
            .andExpect(status().isBadRequest());

        // Validate the SABIKEUser in the database
        List<SABIKEUser> sABIKEUserList = sABIKEUserRepository.findAll();
        assertThat(sABIKEUserList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllSABIKEUsers() throws Exception {
        // Initialize the database
        sABIKEUserRepository.saveAndFlush(sABIKEUser);

        // Get all the sABIKEUserList
        restSABIKEUserMockMvc.perform(get("/api/sabike-users?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(sABIKEUser.getId().intValue())))
            .andExpect(jsonPath("$.[*].userId").value(hasItem(DEFAULT_USER_ID)))
            .andExpect(jsonPath("$.[*].password").value(hasItem(DEFAULT_PASSWORD.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].first").value(hasItem(DEFAULT_FIRST.toString())))
            .andExpect(jsonPath("$.[*].last").value(hasItem(DEFAULT_LAST.toString())))
            .andExpect(jsonPath("$.[*].isAdmin").value(hasItem(DEFAULT_IS_ADMIN.booleanValue())))
            .andExpect(jsonPath("$.[*].deliveryAddressNumber").value(hasItem(DEFAULT_DELIVERY_ADDRESS_NUMBER.toString())))
            .andExpect(jsonPath("$.[*].deliveryAddressStreet").value(hasItem(DEFAULT_DELIVERY_ADDRESS_STREET.toString())))
            .andExpect(jsonPath("$.[*].deliveryAddressCity").value(hasItem(DEFAULT_DELIVERY_ADDRESS_CITY.toString())))
            .andExpect(jsonPath("$.[*].deliveryAddressPostalCode").value(hasItem(DEFAULT_DELIVERY_ADDRESS_POSTAL_CODE.toString())))
            .andExpect(jsonPath("$.[*].deliveryAddressCountry").value(hasItem(DEFAULT_DELIVERY_ADDRESS_COUNTRY.toString())))
            .andExpect(jsonPath("$.[*].billingAddressNumber").value(hasItem(DEFAULT_BILLING_ADDRESS_NUMBER.toString())))
            .andExpect(jsonPath("$.[*].billingAddressStreet").value(hasItem(DEFAULT_BILLING_ADDRESS_STREET.toString())))
            .andExpect(jsonPath("$.[*].billingAddressCity").value(hasItem(DEFAULT_BILLING_ADDRESS_CITY.toString())))
            .andExpect(jsonPath("$.[*].billingAddressPostalCode").value(hasItem(DEFAULT_BILLING_ADDRESS_POSTAL_CODE.toString())))
            .andExpect(jsonPath("$.[*].billingAddressCountry").value(hasItem(DEFAULT_BILLING_ADDRESS_COUNTRY.toString())));
    }
    
    @Test
    @Transactional
    public void getSABIKEUser() throws Exception {
        // Initialize the database
        sABIKEUserRepository.saveAndFlush(sABIKEUser);

        // Get the sABIKEUser
        restSABIKEUserMockMvc.perform(get("/api/sabike-users/{id}", sABIKEUser.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(sABIKEUser.getId().intValue()))
            .andExpect(jsonPath("$.userId").value(DEFAULT_USER_ID))
            .andExpect(jsonPath("$.password").value(DEFAULT_PASSWORD.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.first").value(DEFAULT_FIRST.toString()))
            .andExpect(jsonPath("$.last").value(DEFAULT_LAST.toString()))
            .andExpect(jsonPath("$.isAdmin").value(DEFAULT_IS_ADMIN.booleanValue()))
            .andExpect(jsonPath("$.deliveryAddressNumber").value(DEFAULT_DELIVERY_ADDRESS_NUMBER.toString()))
            .andExpect(jsonPath("$.deliveryAddressStreet").value(DEFAULT_DELIVERY_ADDRESS_STREET.toString()))
            .andExpect(jsonPath("$.deliveryAddressCity").value(DEFAULT_DELIVERY_ADDRESS_CITY.toString()))
            .andExpect(jsonPath("$.deliveryAddressPostalCode").value(DEFAULT_DELIVERY_ADDRESS_POSTAL_CODE.toString()))
            .andExpect(jsonPath("$.deliveryAddressCountry").value(DEFAULT_DELIVERY_ADDRESS_COUNTRY.toString()))
            .andExpect(jsonPath("$.billingAddressNumber").value(DEFAULT_BILLING_ADDRESS_NUMBER.toString()))
            .andExpect(jsonPath("$.billingAddressStreet").value(DEFAULT_BILLING_ADDRESS_STREET.toString()))
            .andExpect(jsonPath("$.billingAddressCity").value(DEFAULT_BILLING_ADDRESS_CITY.toString()))
            .andExpect(jsonPath("$.billingAddressPostalCode").value(DEFAULT_BILLING_ADDRESS_POSTAL_CODE.toString()))
            .andExpect(jsonPath("$.billingAddressCountry").value(DEFAULT_BILLING_ADDRESS_COUNTRY.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSABIKEUser() throws Exception {
        // Get the sABIKEUser
        restSABIKEUserMockMvc.perform(get("/api/sabike-users/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSABIKEUser() throws Exception {
        // Initialize the database
        sABIKEUserRepository.saveAndFlush(sABIKEUser);

        int databaseSizeBeforeUpdate = sABIKEUserRepository.findAll().size();

        // Update the sABIKEUser
        SABIKEUser updatedSABIKEUser = sABIKEUserRepository.findById(sABIKEUser.getId()).get();
        // Disconnect from session so that the updates on updatedSABIKEUser are not directly saved in db
        em.detach(updatedSABIKEUser);
        updatedSABIKEUser
            .userId(UPDATED_USER_ID)
            .password(UPDATED_PASSWORD)
            .email(UPDATED_EMAIL)
            .first(UPDATED_FIRST)
            .last(UPDATED_LAST)
            .isAdmin(UPDATED_IS_ADMIN)
            .deliveryAddressNumber(UPDATED_DELIVERY_ADDRESS_NUMBER)
            .deliveryAddressStreet(UPDATED_DELIVERY_ADDRESS_STREET)
            .deliveryAddressCity(UPDATED_DELIVERY_ADDRESS_CITY)
            .deliveryAddressPostalCode(UPDATED_DELIVERY_ADDRESS_POSTAL_CODE)
            .deliveryAddressCountry(UPDATED_DELIVERY_ADDRESS_COUNTRY)
            .billingAddressNumber(UPDATED_BILLING_ADDRESS_NUMBER)
            .billingAddressStreet(UPDATED_BILLING_ADDRESS_STREET)
            .billingAddressCity(UPDATED_BILLING_ADDRESS_CITY)
            .billingAddressPostalCode(UPDATED_BILLING_ADDRESS_POSTAL_CODE)
            .billingAddressCountry(UPDATED_BILLING_ADDRESS_COUNTRY);

        restSABIKEUserMockMvc.perform(put("/api/sabike-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSABIKEUser)))
            .andExpect(status().isOk());

        // Validate the SABIKEUser in the database
        List<SABIKEUser> sABIKEUserList = sABIKEUserRepository.findAll();
        assertThat(sABIKEUserList).hasSize(databaseSizeBeforeUpdate);
        SABIKEUser testSABIKEUser = sABIKEUserList.get(sABIKEUserList.size() - 1);
        assertThat(testSABIKEUser.getUserId()).isEqualTo(UPDATED_USER_ID);
        assertThat(testSABIKEUser.getPassword()).isEqualTo(UPDATED_PASSWORD);
        assertThat(testSABIKEUser.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testSABIKEUser.getFirst()).isEqualTo(UPDATED_FIRST);
        assertThat(testSABIKEUser.getLast()).isEqualTo(UPDATED_LAST);
        assertThat(testSABIKEUser.isIsAdmin()).isEqualTo(UPDATED_IS_ADMIN);
        assertThat(testSABIKEUser.getDeliveryAddressNumber()).isEqualTo(UPDATED_DELIVERY_ADDRESS_NUMBER);
        assertThat(testSABIKEUser.getDeliveryAddressStreet()).isEqualTo(UPDATED_DELIVERY_ADDRESS_STREET);
        assertThat(testSABIKEUser.getDeliveryAddressCity()).isEqualTo(UPDATED_DELIVERY_ADDRESS_CITY);
        assertThat(testSABIKEUser.getDeliveryAddressPostalCode()).isEqualTo(UPDATED_DELIVERY_ADDRESS_POSTAL_CODE);
        assertThat(testSABIKEUser.getDeliveryAddressCountry()).isEqualTo(UPDATED_DELIVERY_ADDRESS_COUNTRY);
        assertThat(testSABIKEUser.getBillingAddressNumber()).isEqualTo(UPDATED_BILLING_ADDRESS_NUMBER);
        assertThat(testSABIKEUser.getBillingAddressStreet()).isEqualTo(UPDATED_BILLING_ADDRESS_STREET);
        assertThat(testSABIKEUser.getBillingAddressCity()).isEqualTo(UPDATED_BILLING_ADDRESS_CITY);
        assertThat(testSABIKEUser.getBillingAddressPostalCode()).isEqualTo(UPDATED_BILLING_ADDRESS_POSTAL_CODE);
        assertThat(testSABIKEUser.getBillingAddressCountry()).isEqualTo(UPDATED_BILLING_ADDRESS_COUNTRY);
    }

    @Test
    @Transactional
    public void updateNonExistingSABIKEUser() throws Exception {
        int databaseSizeBeforeUpdate = sABIKEUserRepository.findAll().size();

        // Create the SABIKEUser

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSABIKEUserMockMvc.perform(put("/api/sabike-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sABIKEUser)))
            .andExpect(status().isBadRequest());

        // Validate the SABIKEUser in the database
        List<SABIKEUser> sABIKEUserList = sABIKEUserRepository.findAll();
        assertThat(sABIKEUserList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSABIKEUser() throws Exception {
        // Initialize the database
        sABIKEUserRepository.saveAndFlush(sABIKEUser);

        int databaseSizeBeforeDelete = sABIKEUserRepository.findAll().size();

        // Delete the sABIKEUser
        restSABIKEUserMockMvc.perform(delete("/api/sabike-users/{id}", sABIKEUser.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<SABIKEUser> sABIKEUserList = sABIKEUserRepository.findAll();
        assertThat(sABIKEUserList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SABIKEUser.class);
        SABIKEUser sABIKEUser1 = new SABIKEUser();
        sABIKEUser1.setId(1L);
        SABIKEUser sABIKEUser2 = new SABIKEUser();
        sABIKEUser2.setId(sABIKEUser1.getId());
        assertThat(sABIKEUser1).isEqualTo(sABIKEUser2);
        sABIKEUser2.setId(2L);
        assertThat(sABIKEUser1).isNotEqualTo(sABIKEUser2);
        sABIKEUser1.setId(null);
        assertThat(sABIKEUser1).isNotEqualTo(sABIKEUser2);
    }
}
