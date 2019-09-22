package com.sabi.bikes.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.*;

import javax.persistence.*;
import javax.persistence.Entity;
import javax.persistence.Table;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;

import com.sabi.bikes.domain.enumeration.OrderState;
import org.hibernate.annotations.Cache;

/**
 * A Command.
 */
@Entity
@Table(name = "command")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Command implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "state")
    private OrderState state;

    @Column(name = "order_date")
    private LocalDate orderDate;

    @Column(name = "total_amount")
    private Float totalAmount;

    @Column(name = "payment_date")
    private ZonedDateTime paymentDate;

    @ManyToOne
    @JsonIgnoreProperties("commands")
    private Client client;

    // @OneToMany(mappedBy = "command", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @OneToMany(mappedBy = "command", fetch = FetchType.EAGER)
//    @Fetch(value = FetchMode.SELECT)
    @NotFound(action = NotFoundAction.IGNORE)
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<OrderItems> orderItems = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public OrderState getState() {
        return state;
    }

    public Command state(OrderState state) {
        this.state = state;
        return this;
    }

    public void setState(OrderState state) {
        this.state = state;
    }

    public LocalDate getOrderDate() {
        return orderDate;
    }

    public Command orderDate(LocalDate orderDate) {
        this.orderDate = orderDate;
        return this;
    }

    public void setOrderDate(LocalDate orderDate) {
        this.orderDate = orderDate;
    }

    public Float getTotalAmount() {
        return totalAmount;
    }

    public Command totalAmount(Float totalAmount) {
        this.totalAmount = totalAmount;
        return this;
    }

    public void setTotalAmount(Float totalAmount) {
        this.totalAmount = totalAmount;
    }

    public ZonedDateTime getPaymentDate() {
        return paymentDate;
    }

    public Command paymentDate(ZonedDateTime paymentDate) {
        this.paymentDate = paymentDate;
        return this;
    }

    public void setPaymentDate(ZonedDateTime paymentDate) {
        this.paymentDate = paymentDate;
    }

    public Client getClient() {
        return client;
    }

    public Command client(Client client) {
        this.client = client;
        return this;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public Set<OrderItems> getOrderItems() {
        return orderItems;
    }

    public Command orderItems(Set<OrderItems> orderItems) {
        this.orderItems = orderItems;
        return this;
    }

    public Command addOrderItems(OrderItems orderItems) {
        this.orderItems.add(orderItems);
        return this;
    }

    public Command removeOrderItems(OrderItems orderItems) {
        this.orderItems.remove(orderItems);
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
        if (!(o instanceof Command)) {
            return false;
        }
        return id != null && id.equals(((Command) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Command{" +
            "id=" + getId() +
            ", state='" + getState() + "'" +
            ", orderDate='" + getOrderDate() + "'" +
            ", totalAmount=" + getTotalAmount() +
            ", paymentDate='" + getPaymentDate() + "'" +
            "}";
    }
}
