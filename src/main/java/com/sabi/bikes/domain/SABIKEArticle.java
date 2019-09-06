package com.sabi.bikes.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A SABIKEArticle.
 */
@Entity
@Table(name = "sabike_article")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class SABIKEArticle implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "article_id")
    private Integer articleId;

    @Column(name = "price")
    private Float price;

    @Column(name = "name")
    private String name;

    @Column(name = "stock")
    private Integer stock;

    @Column(name = "picture")
    private Integer picture;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "sabike_article_cart_id",
               joinColumns = @JoinColumn(name = "sabikearticle_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "cart_id_id", referencedColumnName = "id"))
    private Set<SABIKECart> cartIds = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getArticleId() {
        return articleId;
    }

    public SABIKEArticle articleId(Integer articleId) {
        this.articleId = articleId;
        return this;
    }

    public void setArticleId(Integer articleId) {
        this.articleId = articleId;
    }

    public Float getPrice() {
        return price;
    }

    public SABIKEArticle price(Float price) {
        this.price = price;
        return this;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public String getName() {
        return name;
    }

    public SABIKEArticle name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getStock() {
        return stock;
    }

    public SABIKEArticle stock(Integer stock) {
        this.stock = stock;
        return this;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    public Integer getPicture() {
        return picture;
    }

    public SABIKEArticle picture(Integer picture) {
        this.picture = picture;
        return this;
    }

    public void setPicture(Integer picture) {
        this.picture = picture;
    }

    public Set<SABIKECart> getCartIds() {
        return cartIds;
    }

    public SABIKEArticle cartIds(Set<SABIKECart> sABIKECarts) {
        this.cartIds = sABIKECarts;
        return this;
    }

    public SABIKEArticle addCartId(SABIKECart sABIKECart) {
        this.cartIds.add(sABIKECart);
        sABIKECart.getArticleIds().add(this);
        return this;
    }

    public SABIKEArticle removeCartId(SABIKECart sABIKECart) {
        this.cartIds.remove(sABIKECart);
        sABIKECart.getArticleIds().remove(this);
        return this;
    }

    public void setCartIds(Set<SABIKECart> sABIKECarts) {
        this.cartIds = sABIKECarts;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SABIKEArticle)) {
            return false;
        }
        return id != null && id.equals(((SABIKEArticle) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "SABIKEArticle{" +
            "id=" + getId() +
            ", articleId=" + getArticleId() +
            ", price=" + getPrice() +
            ", name='" + getName() + "'" +
            ", stock=" + getStock() +
            ", picture=" + getPicture() +
            "}";
    }
}
