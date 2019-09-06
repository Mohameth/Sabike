package com.sabi.bikes.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A SABIKECart.
 */
@Entity
@Table(name = "sabike_cart")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class SABIKECart implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "cart_id")
    private Integer cartId;

    @OneToOne
    @JoinColumn(unique = true)
    private SABIKEUser userId;

    @ManyToMany(mappedBy = "cartIds")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<SABIKEArticle> articleIds = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getCartId() {
        return cartId;
    }

    public SABIKECart cartId(Integer cartId) {
        this.cartId = cartId;
        return this;
    }

    public void setCartId(Integer cartId) {
        this.cartId = cartId;
    }

    public SABIKEUser getUserId() {
        return userId;
    }

    public SABIKECart userId(SABIKEUser sABIKEUser) {
        this.userId = sABIKEUser;
        return this;
    }

    public void setUserId(SABIKEUser sABIKEUser) {
        this.userId = sABIKEUser;
    }

    public Set<SABIKEArticle> getArticleIds() {
        return articleIds;
    }

    public SABIKECart articleIds(Set<SABIKEArticle> sABIKEArticles) {
        this.articleIds = sABIKEArticles;
        return this;
    }

    public SABIKECart addArticleId(SABIKEArticle sABIKEArticle) {
        this.articleIds.add(sABIKEArticle);
        sABIKEArticle.getCartIds().add(this);
        return this;
    }

    public SABIKECart removeArticleId(SABIKEArticle sABIKEArticle) {
        this.articleIds.remove(sABIKEArticle);
        sABIKEArticle.getCartIds().remove(this);
        return this;
    }

    public void setArticleIds(Set<SABIKEArticle> sABIKEArticles) {
        this.articleIds = sABIKEArticles;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SABIKECart)) {
            return false;
        }
        return id != null && id.equals(((SABIKECart) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "SABIKECart{" +
            "id=" + getId() +
            ", cartId=" + getCartId() +
            "}";
    }
}
