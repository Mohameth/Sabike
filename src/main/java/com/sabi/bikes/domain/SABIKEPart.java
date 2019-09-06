package com.sabi.bikes.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

import com.sabi.bikes.domain.enumeration.SABIKEPartCategory;

import com.sabi.bikes.domain.enumeration.SABIKEPartCategoryType;

/**
 * A SABIKEPart.
 */
@Entity
@Table(name = "sabike_part")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class SABIKEPart implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "category")
    private SABIKEPartCategory category;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private SABIKEPartCategoryType type;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public SABIKEPartCategory getCategory() {
        return category;
    }

    public SABIKEPart category(SABIKEPartCategory category) {
        this.category = category;
        return this;
    }

    public void setCategory(SABIKEPartCategory category) {
        this.category = category;
    }

    public SABIKEPartCategoryType getType() {
        return type;
    }

    public SABIKEPart type(SABIKEPartCategoryType type) {
        this.type = type;
        return this;
    }

    public void setType(SABIKEPartCategoryType type) {
        this.type = type;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SABIKEPart)) {
            return false;
        }
        return id != null && id.equals(((SABIKEPart) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "SABIKEPart{" +
            "id=" + getId() +
            ", category='" + getCategory() + "'" +
            ", type='" + getType() + "'" +
            "}";
    }
}
