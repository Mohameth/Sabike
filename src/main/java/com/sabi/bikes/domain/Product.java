package com.sabi.bikes.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import com.sabi.bikes.domain.enumeration.ProductType;

import com.sabi.bikes.domain.enumeration.BikeCategory;

import com.sabi.bikes.domain.enumeration.PartCategory;

import com.sabi.bikes.domain.enumeration.PartCategoryType;

/**
 * A Product.
 */
@Entity
@Table(name = "product")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Product implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "price")
    private Float price;

    @Column(name = "name")
    private String name;

    @Column(name = "stock")
    private Integer stock;

    @Column(name = "picture")
    private String picture;

    @Column(name = "brand")
    private String brand;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private ProductType type;

    @Enumerated(EnumType.STRING)
    @Column(name = "bike_category")
    private BikeCategory bikeCategory;

    @Column(name = "bike_size")
    private String bikeSize;

    @Column(name = "bike_seeds")
    private Integer bikeSeeds;

    @Column(name = "bike_color")
    private String bikeColor;

    @Enumerated(EnumType.STRING)
    @Column(name = "part_category")
    private PartCategory partCategory;

    @Enumerated(EnumType.STRING)
    @Column(name = "part_category_type")
    private PartCategoryType partCategoryType;

    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "product")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<OrderItems> orderItems = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Float getPrice() {
        return price;
    }

    public Product price(Float price) {
        this.price = price;
        return this;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public String getName() {
        return name;
    }

    public Product name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getStock() {
        return stock;
    }

    public Product stock(Integer stock) {
        this.stock = stock;
        return this;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    public String getPicture() {
        return picture;
    }

    public Product picture(String picture) {
        this.picture = picture;
        return this;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public String getBrand() {
        return brand;
    }

    public Product brand(String brand) {
        this.brand = brand;
        return this;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public ProductType getType() {
        return type;
    }

    public Product type(ProductType type) {
        this.type = type;
        return this;
    }

    public void setType(ProductType type) {
        this.type = type;
    }

    public BikeCategory getBikeCategory() {
        return bikeCategory;
    }

    public Product bikeCategory(BikeCategory bikeCategory) {
        this.bikeCategory = bikeCategory;
        return this;
    }

    public void setBikeCategory(BikeCategory bikeCategory) {
        this.bikeCategory = bikeCategory;
    }

    public String getBikeSize() {
        return bikeSize;
    }

    public Product bikeSize(String bikeSize) {
        this.bikeSize = bikeSize;
        return this;
    }

    public void setBikeSize(String bikeSize) {
        this.bikeSize = bikeSize;
    }

    public Integer getBikeSeeds() {
        return bikeSeeds;
    }

    public Product bikeSeeds(Integer bikeSeeds) {
        this.bikeSeeds = bikeSeeds;
        return this;
    }

    public void setBikeSeeds(Integer bikeSeeds) {
        this.bikeSeeds = bikeSeeds;
    }

    public String getBikeColor() {
        return bikeColor;
    }

    public Product bikeColor(String bikeColor) {
        this.bikeColor = bikeColor;
        return this;
    }

    public void setBikeColor(String bikeColor) {
        this.bikeColor = bikeColor;
    }

    public PartCategory getPartCategory() {
        return partCategory;
    }

    public Product partCategory(PartCategory partCategory) {
        this.partCategory = partCategory;
        return this;
    }

    public void setPartCategory(PartCategory partCategory) {
        this.partCategory = partCategory;
    }

    public PartCategoryType getPartCategoryType() {
        return partCategoryType;
    }

    public Product partCategoryType(PartCategoryType partCategoryType) {
        this.partCategoryType = partCategoryType;
        return this;
    }

    public void setPartCategoryType(PartCategoryType partCategoryType) {
        this.partCategoryType = partCategoryType;
    }

    public String getDescription() {
        return description;
    }

    public Product description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<OrderItems> getOrderItems() {
        return orderItems;
    }

    public Product orderItems(Set<OrderItems> orderItems) {
        this.orderItems = orderItems;
        return this;
    }

    public Product addOrderItems(OrderItems orderItems) {
        this.orderItems.add(orderItems);
        orderItems.setProduct(this);
        return this;
    }

    public Product removeOrderItems(OrderItems orderItems) {
        this.orderItems.remove(orderItems);
        orderItems.setProduct(null);
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
        if (!(o instanceof Product)) {
            return false;
        }
        return id != null && id.equals(((Product) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Product{" +
            "id=" + getId() +
            ", price=" + getPrice() +
            ", name='" + getName() + "'" +
            ", stock=" + getStock() +
            ", picture='" + getPicture() + "'" +
            ", brand='" + getBrand() + "'" +
            ", type='" + getType() + "'" +
            ", bikeCategory='" + getBikeCategory() + "'" +
            ", bikeSize='" + getBikeSize() + "'" +
            ", bikeSeeds=" + getBikeSeeds() +
            ", bikeColor='" + getBikeColor() + "'" +
            ", partCategory='" + getPartCategory() + "'" +
            ", partCategoryType='" + getPartCategoryType() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
