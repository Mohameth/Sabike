package com.sabi.bikes.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A SABIKEUser.
 */
@Entity
@Table(name = "sabike_user")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class SABIKEUser implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "password")
    private String password;

    @Column(name = "email")
    private String email;

    @Column(name = "first")
    private String first;

    @Column(name = "last")
    private String last;

    @Column(name = "is_admin")
    private Boolean isAdmin;

    @Column(name = "delivery_address_number")
    private String deliveryAddressNumber;

    @Column(name = "delivery_address_street")
    private String deliveryAddressStreet;

    @Column(name = "delivery_address_city")
    private String deliveryAddressCity;

    @Column(name = "delivery_address_postal_code")
    private String deliveryAddressPostalCode;

    @Column(name = "delivery_address_country")
    private String deliveryAddressCountry;

    @Column(name = "billing_address_number")
    private String billingAddressNumber;

    @Column(name = "billing_address_street")
    private String billingAddressStreet;

    @Column(name = "billing_address_city")
    private String billingAddressCity;

    @Column(name = "billing_address_postal_code")
    private String billingAddressPostalCode;

    @Column(name = "billing_address_country")
    private String billingAddressCountry;

    @OneToOne(mappedBy = "userId")
    @JsonIgnore
    private SABIKECart cartId;

    @ManyToOne
    @JsonIgnoreProperties("userIds")
    private SABIKECommande orderId;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getUserId() {
        return userId;
    }

    public SABIKEUser userId(Integer userId) {
        this.userId = userId;
        return this;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getPassword() {
        return password;
    }

    public SABIKEUser password(String password) {
        this.password = password;
        return this;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public SABIKEUser email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirst() {
        return first;
    }

    public SABIKEUser first(String first) {
        this.first = first;
        return this;
    }

    public void setFirst(String first) {
        this.first = first;
    }

    public String getLast() {
        return last;
    }

    public SABIKEUser last(String last) {
        this.last = last;
        return this;
    }

    public void setLast(String last) {
        this.last = last;
    }

    public Boolean isIsAdmin() {
        return isAdmin;
    }

    public SABIKEUser isAdmin(Boolean isAdmin) {
        this.isAdmin = isAdmin;
        return this;
    }

    public void setIsAdmin(Boolean isAdmin) {
        this.isAdmin = isAdmin;
    }

    public String getDeliveryAddressNumber() {
        return deliveryAddressNumber;
    }

    public SABIKEUser deliveryAddressNumber(String deliveryAddressNumber) {
        this.deliveryAddressNumber = deliveryAddressNumber;
        return this;
    }

    public void setDeliveryAddressNumber(String deliveryAddressNumber) {
        this.deliveryAddressNumber = deliveryAddressNumber;
    }

    public String getDeliveryAddressStreet() {
        return deliveryAddressStreet;
    }

    public SABIKEUser deliveryAddressStreet(String deliveryAddressStreet) {
        this.deliveryAddressStreet = deliveryAddressStreet;
        return this;
    }

    public void setDeliveryAddressStreet(String deliveryAddressStreet) {
        this.deliveryAddressStreet = deliveryAddressStreet;
    }

    public String getDeliveryAddressCity() {
        return deliveryAddressCity;
    }

    public SABIKEUser deliveryAddressCity(String deliveryAddressCity) {
        this.deliveryAddressCity = deliveryAddressCity;
        return this;
    }

    public void setDeliveryAddressCity(String deliveryAddressCity) {
        this.deliveryAddressCity = deliveryAddressCity;
    }

    public String getDeliveryAddressPostalCode() {
        return deliveryAddressPostalCode;
    }

    public SABIKEUser deliveryAddressPostalCode(String deliveryAddressPostalCode) {
        this.deliveryAddressPostalCode = deliveryAddressPostalCode;
        return this;
    }

    public void setDeliveryAddressPostalCode(String deliveryAddressPostalCode) {
        this.deliveryAddressPostalCode = deliveryAddressPostalCode;
    }

    public String getDeliveryAddressCountry() {
        return deliveryAddressCountry;
    }

    public SABIKEUser deliveryAddressCountry(String deliveryAddressCountry) {
        this.deliveryAddressCountry = deliveryAddressCountry;
        return this;
    }

    public void setDeliveryAddressCountry(String deliveryAddressCountry) {
        this.deliveryAddressCountry = deliveryAddressCountry;
    }

    public String getBillingAddressNumber() {
        return billingAddressNumber;
    }

    public SABIKEUser billingAddressNumber(String billingAddressNumber) {
        this.billingAddressNumber = billingAddressNumber;
        return this;
    }

    public void setBillingAddressNumber(String billingAddressNumber) {
        this.billingAddressNumber = billingAddressNumber;
    }

    public String getBillingAddressStreet() {
        return billingAddressStreet;
    }

    public SABIKEUser billingAddressStreet(String billingAddressStreet) {
        this.billingAddressStreet = billingAddressStreet;
        return this;
    }

    public void setBillingAddressStreet(String billingAddressStreet) {
        this.billingAddressStreet = billingAddressStreet;
    }

    public String getBillingAddressCity() {
        return billingAddressCity;
    }

    public SABIKEUser billingAddressCity(String billingAddressCity) {
        this.billingAddressCity = billingAddressCity;
        return this;
    }

    public void setBillingAddressCity(String billingAddressCity) {
        this.billingAddressCity = billingAddressCity;
    }

    public String getBillingAddressPostalCode() {
        return billingAddressPostalCode;
    }

    public SABIKEUser billingAddressPostalCode(String billingAddressPostalCode) {
        this.billingAddressPostalCode = billingAddressPostalCode;
        return this;
    }

    public void setBillingAddressPostalCode(String billingAddressPostalCode) {
        this.billingAddressPostalCode = billingAddressPostalCode;
    }

    public String getBillingAddressCountry() {
        return billingAddressCountry;
    }

    public SABIKEUser billingAddressCountry(String billingAddressCountry) {
        this.billingAddressCountry = billingAddressCountry;
        return this;
    }

    public void setBillingAddressCountry(String billingAddressCountry) {
        this.billingAddressCountry = billingAddressCountry;
    }

    public SABIKECart getCartId() {
        return cartId;
    }

    public SABIKEUser cartId(SABIKECart sABIKECart) {
        this.cartId = sABIKECart;
        return this;
    }

    public void setCartId(SABIKECart sABIKECart) {
        this.cartId = sABIKECart;
    }

    public SABIKECommande getOrderId() {
        return orderId;
    }

    public SABIKEUser orderId(SABIKECommande sABIKECommande) {
        this.orderId = sABIKECommande;
        return this;
    }

    public void setOrderId(SABIKECommande sABIKECommande) {
        this.orderId = sABIKECommande;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SABIKEUser)) {
            return false;
        }
        return id != null && id.equals(((SABIKEUser) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "SABIKEUser{" +
            "id=" + getId() +
            ", userId=" + getUserId() +
            ", password='" + getPassword() + "'" +
            ", email='" + getEmail() + "'" +
            ", first='" + getFirst() + "'" +
            ", last='" + getLast() + "'" +
            ", isAdmin='" + isIsAdmin() + "'" +
            ", deliveryAddressNumber='" + getDeliveryAddressNumber() + "'" +
            ", deliveryAddressStreet='" + getDeliveryAddressStreet() + "'" +
            ", deliveryAddressCity='" + getDeliveryAddressCity() + "'" +
            ", deliveryAddressPostalCode='" + getDeliveryAddressPostalCode() + "'" +
            ", deliveryAddressCountry='" + getDeliveryAddressCountry() + "'" +
            ", billingAddressNumber='" + getBillingAddressNumber() + "'" +
            ", billingAddressStreet='" + getBillingAddressStreet() + "'" +
            ", billingAddressCity='" + getBillingAddressCity() + "'" +
            ", billingAddressPostalCode='" + getBillingAddressPostalCode() + "'" +
            ", billingAddressCountry='" + getBillingAddressCountry() + "'" +
            "}";
    }
}
