package com.sabi.bikes.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import com.sabi.bikes.domain.enumeration.SABIKECommandeStatus;

/**
 * A SABIKECommande.
 */
@Entity
@Table(name = "sabike_commande")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class SABIKECommande implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "order_id")
    private Integer orderId;

    @Column(name = "number")
    private String number;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private SABIKECommandeStatus status;

    @Column(name = "order_date")
    private LocalDate orderDate;

    @Column(name = "order_items")
    private String orderItems;

    @OneToMany(mappedBy = "orderId")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<SABIKEUser> userIds = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getOrderId() {
        return orderId;
    }

    public SABIKECommande orderId(Integer orderId) {
        this.orderId = orderId;
        return this;
    }

    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }

    public String getNumber() {
        return number;
    }

    public SABIKECommande number(String number) {
        this.number = number;
        return this;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public SABIKECommandeStatus getStatus() {
        return status;
    }

    public SABIKECommande status(SABIKECommandeStatus status) {
        this.status = status;
        return this;
    }

    public void setStatus(SABIKECommandeStatus status) {
        this.status = status;
    }

    public LocalDate getOrderDate() {
        return orderDate;
    }

    public SABIKECommande orderDate(LocalDate orderDate) {
        this.orderDate = orderDate;
        return this;
    }

    public void setOrderDate(LocalDate orderDate) {
        this.orderDate = orderDate;
    }

    public String getOrderItems() {
        return orderItems;
    }

    public SABIKECommande orderItems(String orderItems) {
        this.orderItems = orderItems;
        return this;
    }

    public void setOrderItems(String orderItems) {
        this.orderItems = orderItems;
    }

    public Set<SABIKEUser> getUserIds() {
        return userIds;
    }

    public SABIKECommande userIds(Set<SABIKEUser> sABIKEUsers) {
        this.userIds = sABIKEUsers;
        return this;
    }

    public SABIKECommande addUserId(SABIKEUser sABIKEUser) {
        this.userIds.add(sABIKEUser);
        sABIKEUser.setOrderId(this);
        return this;
    }

    public SABIKECommande removeUserId(SABIKEUser sABIKEUser) {
        this.userIds.remove(sABIKEUser);
        sABIKEUser.setOrderId(null);
        return this;
    }

    public void setUserIds(Set<SABIKEUser> sABIKEUsers) {
        this.userIds = sABIKEUsers;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SABIKECommande)) {
            return false;
        }
        return id != null && id.equals(((SABIKECommande) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "SABIKECommande{" +
            "id=" + getId() +
            ", orderId=" + getOrderId() +
            ", number='" + getNumber() + "'" +
            ", status='" + getStatus() + "'" +
            ", orderDate='" + getOrderDate() + "'" +
            ", orderItems='" + getOrderItems() + "'" +
            "}";
    }
}
