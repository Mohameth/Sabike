package com.sabi.bikes.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;

/**
 * A Cart.
 */
@Entity
@Table(name = "cart")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Cart implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "expire_on")
    private ZonedDateTime expireOn;

    @OneToMany(mappedBy = "cart")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<OrderItems> orderItems = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getExpireOn() {
        return expireOn;
    }

    public Cart expireOn(ZonedDateTime expireOn) {
        this.expireOn = expireOn;
        return this;
    }

    public void setExpireOn(ZonedDateTime expireOn) {
        this.expireOn = expireOn;
    }

    public Set<OrderItems> getOrderItems() {
        return orderItems;
    }

    public Cart orderItems(Set<OrderItems> orderItems) {
        this.orderItems = orderItems;
        return this;
    }

    public Cart addOrderItems(OrderItems orderItems) {
        this.orderItems.add(orderItems);
        orderItems.setCart(this);
        return this;
    }

    public Cart removeOrderItems(OrderItems orderItems) {
        this.orderItems.remove(orderItems);
        orderItems.setCart(null);
        return this;
    }

    public void setOrderItems(Set<OrderItems> orderItems) {
        this.orderItems = orderItems;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Cart)) {
            return false;
        }
        return id != null && id.equals(((Cart) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Cart{" +
            "id=" + getId() +
            ", expireOn='" + getExpireOn() + "'" +
            "}";
    }
}
