package com.sabi.bikes.web.rest;

import com.sabi.bikes.SabikeApp;
import com.sabi.bikes.domain.Address;
import com.sabi.bikes.repository.AddressRepository;
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
 * Integration tests for the {@link AddressResource} REST controller.
 */
@SpringBootTest(classes = SabikeApp.class)
public class AddressResourceIT {

    private static final String DEFAULT_DELIVERY_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_DELIVERY_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_DELIVERY_STREET = "AAAAAAAAAA";
    private static final String UPDATED_DELIVERY_STREET = "BBBBBBBBBB";

    private static final String DEFAULT_DELIVERY_CITY = "AAAAAAAAAA";
    private static final String UPDATED_DELIVERY_CITY = "BBBBBBBBBB";

    private static final String DEFAULT_DELIVERY_POSTAL_CODE = "AAAAAAAAAA";
    private static final String UPDATED_DELIVERY_POSTAL_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_DELIVERY_COUNTRY = "AAAAAAAAAA";
    private static final String UPDATED_DELIVERY_COUNTRY = "BBBBBBBBBB";

    @Autowired
    private AddressRepository addressRepository;

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

    private MockMvc restAddressMockMvc;

    private Address address;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AddressResource addressResource = new AddressResource(addressRepository);
        this.restAddressMockMvc = MockMvcBuilders.standaloneSetup(addressResource)
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
    public static Address createEntity(EntityManager em) {
        Address address = new Address()
            .deliveryNumber(DEFAULT_DELIVERY_NUMBER)
            .deliveryStreet(DEFAULT_DELIVERY_STREET)
            .deliveryCity(DEFAULT_DELIVERY_CITY)
            .deliveryPostalCode(DEFAULT_DELIVERY_POSTAL_CODE)
            .deliveryCountry(DEFAULT_DELIVERY_COUNTRY);
        return address;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Address createUpdatedEntity(EntityManager em) {
        Address address = new Address()
            .deliveryNumber(UPDATED_DELIVERY_NUMBER)
            .deliveryStreet(UPDATED_DELIVERY_STREET)
            .deliveryCity(UPDATED_DELIVERY_CITY)
            .deliveryPostalCode(UPDATED_DELIVERY_POSTAL_CODE)
            .deliveryCountry(UPDATED_DELIVERY_COUNTRY);
        return address;
    }

    @BeforeEach
    public void initTest() {
        address = createEntity(em);
    }

    @Test
    @Transactional
    public void createAddress() throws Exception {
        int databaseSizeBeforeCreate = addressRepository.findAll().size();

        // Create the Address
        restAddressMockMvc.perform(post("/api/addresses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(address)))
            .andExpect(status().isCreated());

        // Validate the Address in the database
        List<Address> addressList = addressRepository.findAll();
        assertThat(addressList).hasSize(databaseSizeBeforeCreate + 1);
        Address testAddress = addressList.get(addressList.size() - 1);
        assertThat(testAddress.getDeliveryNumber()).isEqualTo(DEFAULT_DELIVERY_NUMBER);
        assertThat(testAddress.getDeliveryStreet()).isEqualTo(DEFAULT_DELIVERY_STREET);
        assertThat(testAddress.getDeliveryCity()).isEqualTo(DEFAULT_DELIVERY_CITY);
        assertThat(testAddress.getDeliveryPostalCode()).isEqualTo(DEFAULT_DELIVERY_POSTAL_CODE);
        assertThat(testAddress.getDeliveryCountry()).isEqualTo(DEFAULT_DELIVERY_COUNTRY);
    }

    @Test
    @Transactional
    public void createAddressWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = addressRepository.findAll().size();

        // Create the Address with an existing ID
        address.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAddressMockMvc.perform(post("/api/addresses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(address)))
            .andExpect(status().isBadRequest());

        // Validate the Address in the database
        List<Address> addressList = addressRepository.findAll();
        assertThat(addressList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllAddresses() throws Exception {
        // Initialize the database
        addressRepository.saveAndFlush(address);

        // Get all the addressList
        restAddressMockMvc.perform(get("/api/addresses?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(address.getId().intValue())))
            .andExpect(jsonPath("$.[*].deliveryNumber").value(hasItem(DEFAULT_DELIVERY_NUMBER.toString())))
            .andExpect(jsonPath("$.[*].deliveryStreet").value(hasItem(DEFAULT_DELIVERY_STREET.toString())))
            .andExpect(jsonPath("$.[*].deliveryCity").value(hasItem(DEFAULT_DELIVERY_CITY.toString())))
            .andExpect(jsonPath("$.[*].deliveryPostalCode").value(hasItem(DEFAULT_DELIVERY_POSTAL_CODE.toString())))
            .andExpect(jsonPath("$.[*].deliveryCountry").value(hasItem(DEFAULT_DELIVERY_COUNTRY.toString())));
    }
    
    @Test
    @Transactional
    public void getAddress() throws Exception {
        // Initialize the database
        addressRepository.saveAndFlush(address);

        // Get the address
        restAddressMockMvc.perform(get("/api/addresses/{id}", address.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(address.getId().intValue()))
            .andExpect(jsonPath("$.deliveryNumber").value(DEFAULT_DELIVERY_NUMBER.toString()))
            .andExpect(jsonPath("$.deliveryStreet").value(DEFAULT_DELIVERY_STREET.toString()))
            .andExpect(jsonPath("$.deliveryCity").value(DEFAULT_DELIVERY_CITY.toString()))
            .andExpect(jsonPath("$.deliveryPostalCode").value(DEFAULT_DELIVERY_POSTAL_CODE.toString()))
            .andExpect(jsonPath("$.deliveryCountry").value(DEFAULT_DELIVERY_COUNTRY.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAddress() throws Exception {
        // Get the address
        restAddressMockMvc.perform(get("/api/addresses/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAddress() throws Exception {
        // Initialize the database
        addressRepository.saveAndFlush(address);

        int databaseSizeBeforeUpdate = addressRepository.findAll().size();

        // Update the address
        Address updatedAddress = addressRepository.findById(address.getId()).get();
        // Disconnect from session so that the updates on updatedAddress are not directly saved in db
        em.detach(updatedAddress);
        updatedAddress
            .deliveryNumber(UPDATED_DELIVERY_NUMBER)
            .deliveryStreet(UPDATED_DELIVERY_STREET)
            .deliveryCity(UPDATED_DELIVERY_CITY)
            .deliveryPostalCode(UPDATED_DELIVERY_POSTAL_CODE)
            .deliveryCountry(UPDATED_DELIVERY_COUNTRY);

        restAddressMockMvc.perform(put("/api/addresses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAddress)))
            .andExpect(status().isOk());

        // Validate the Address in the database
        List<Address> addressList = addressRepository.findAll();
        assertThat(addressList).hasSize(databaseSizeBeforeUpdate);
        Address testAddress = addressList.get(addressList.size() - 1);
        assertThat(testAddress.getDeliveryNumber()).isEqualTo(UPDATED_DELIVERY_NUMBER);
        assertThat(testAddress.getDeliveryStreet()).isEqualTo(UPDATED_DELIVERY_STREET);
        assertThat(testAddress.getDeliveryCity()).isEqualTo(UPDATED_DELIVERY_CITY);
        assertThat(testAddress.getDeliveryPostalCode()).isEqualTo(UPDATED_DELIVERY_POSTAL_CODE);
        assertThat(testAddress.getDeliveryCountry()).isEqualTo(UPDATED_DELIVERY_COUNTRY);
    }

    @Test
    @Transactional
    public void updateNonExistingAddress() throws Exception {
        int databaseSizeBeforeUpdate = addressRepository.findAll().size();

        // Create the Address

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAddressMockMvc.perform(put("/api/addresses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(address)))
            .andExpect(status().isBadRequest());

        // Validate the Address in the database
        List<Address> addressList = addressRepository.findAll();
        assertThat(addressList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAddress() throws Exception {
        // Initialize the database
        addressRepository.saveAndFlush(address);

        int databaseSizeBeforeDelete = addressRepository.findAll().size();

        // Delete the address
        restAddressMockMvc.perform(delete("/api/addresses/{id}", address.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Address> addressList = addressRepository.findAll();
        assertThat(addressList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Address.class);
        Address address1 = new Address();
        address1.setId(1L);
        Address address2 = new Address();
        address2.setId(address1.getId());
        assertThat(address1).isEqualTo(address2);
        address2.setId(2L);
        assertThat(address1).isNotEqualTo(address2);
        address1.setId(null);
        assertThat(address1).isNotEqualTo(address2);
    }
}
