package com.sabi.bikes.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Address.
 */
@Entity
@Table(name = "address")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Address implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "delivery_number")
    private String deliveryNumber;

    @Column(name = "delivery_street")
    private String deliveryStreet;

    @Column(name = "delivery_city")
    private String deliveryCity;

    @Column(name = "delivery_postal_code")
    private String deliveryPostalCode;

    @Column(name = "delivery_country")
    private String deliveryCountry;

    @ManyToOne
    @JsonIgnoreProperties("addresses")
    private Client client;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDeliveryNumber() {
        return deliveryNumber;
    }

    public Address deliveryNumber(String deliveryNumber) {
        this.deliveryNumber = deliveryNumber;
        return this;
    }

    public void setDeliveryNumber(String deliveryNumber) {
        this.deliveryNumber = deliveryNumber;
    }

    public String getDeliveryStreet() {
        return deliveryStreet;
    }

    public Address deliveryStreet(String deliveryStreet) {
        this.deliveryStreet = deliveryStreet;
        return this;
    }

    public void setDeliveryStreet(String deliveryStreet) {
        this.deliveryStreet = deliveryStreet;
    }

    public String getDeliveryCity() {
        return deliveryCity;
    }

    public Address deliveryCity(String deliveryCity) {
        this.deliveryCity = deliveryCity;
        return this;
    }

    public void setDeliveryCity(String deliveryCity) {
        this.deliveryCity = deliveryCity;
    }

    public String getDeliveryPostalCode() {
        return deliveryPostalCode;
    }

    public Address deliveryPostalCode(String deliveryPostalCode) {
        this.deliveryPostalCode = deliveryPostalCode;
        return this;
    }

    public void setDeliveryPostalCode(String deliveryPostalCode) {
        this.deliveryPostalCode = deliveryPostalCode;
    }

    public String getDeliveryCountry() {
        return deliveryCountry;
    }

    public Address deliveryCountry(String deliveryCountry) {
        this.deliveryCountry = deliveryCountry;
        return this;
    }

    public void setDeliveryCountry(String deliveryCountry) {
        this.deliveryCountry = deliveryCountry;
    }

    public Client getClient() {
        return client;
    }

    public Address client(Client client) {
        this.client = client;
        return this;
    }

    public void setClient(Client client) {
        this.client = client;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Address)) {
            return false;
        }
        return id != null && id.equals(((Address) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Address{" +
            "id=" + getId() +
            ", deliveryNumber='" + getDeliveryNumber() + "'" +
            ", deliveryStreet='" + getDeliveryStreet() + "'" +
            ", deliveryCity='" + getDeliveryCity() + "'" +
            ", deliveryPostalCode='" + getDeliveryPostalCode() + "'" +
            ", deliveryCountry='" + getDeliveryCountry() + "'" +
            "}";
    }
}
