package com.sabi.bikes.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

import com.sabi.bikes.domain.enumeration.SABIKEBikeType;

/**
 * A SABIKEBike.
 */
@Entity
@Table(name = "sabike_bike")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class SABIKEBike implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private SABIKEBikeType type;

    @Column(name = "size")
    private Float size;

    @Column(name = "speeds")
    private Integer speeds;

    @Column(name = "color")
    private String color;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public SABIKEBikeType getType() {
        return type;
    }

    public SABIKEBike type(SABIKEBikeType type) {
        this.type = type;
        return this;
    }

    public void setType(SABIKEBikeType type) {
        this.type = type;
    }

    public Float getSize() {
        return size;
    }

    public SABIKEBike size(Float size) {
        this.size = size;
        return this;
    }

    public void setSize(Float size) {
        this.size = size;
    }

    public Integer getSpeeds() {
        return speeds;
    }

    public SABIKEBike speeds(Integer speeds) {
        this.speeds = speeds;
        return this;
    }

    public void setSpeeds(Integer speeds) {
        this.speeds = speeds;
    }

    public String getColor() {
        return color;
    }

    public SABIKEBike color(String color) {
        this.color = color;
        return this;
    }

    public void setColor(String color) {
        this.color = color;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SABIKEBike)) {
            return false;
        }
        return id != null && id.equals(((SABIKEBike) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "SABIKEBike{" +
            "id=" + getId() +
            ", type='" + getType() + "'" +
            ", size=" + getSize() +
            ", speeds=" + getSpeeds() +
            ", color='" + getColor() + "'" +
            "}";
    }
}
