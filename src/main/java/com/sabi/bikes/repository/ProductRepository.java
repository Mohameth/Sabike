package com.sabi.bikes.repository;

import com.sabi.bikes.domain.Product;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Pageable;

import java.util.List;

/**
 * Spring Data  repository for the Product entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("FROM Product WHERE name = ?1")
    List<Product> getProductsByName(Pageable pageable, String name);

    @Query("FROM Product")
    List<Product> getMyProducts(Pageable pageable);

    @Query("FROM Product WHERE lower(name) LIKE lower(concat('%', ?1,'%'))")
    List<Product> searchByNameLike(Pageable pageable, String name);

    @Query("FROM Product WHERE bike_category = ?1")
    List<Product> getBikeByCategory(Pageable pageable, String chosenCategory);

    @Query("SELECT COUNT(p) FROM Product p WHERE bike_category = ?1")
    List<Long> getBikeByCategoryCount(Pageable pageable, String chosenCategory);

    @Query("FROM Product WHERE part_category = ?1")
    List<Product> getPartByCategory(Pageable pageable, String category);

    @Query("SELECT COUNT(p) FROM Product p WHERE part_category = ?1")
    List<Long> getPartByCategoryCount(Pageable pageable, String category);

    @Query("FROM Product WHERE part_category_type = ?1")
    List<Product> getPartByCategoryType(Pageable pageable, String category);

    @Query("SELECT COUNT(p) FROM Product p WHERE part_category_type = ?1")
    List<Long> getPartByCategoryTypeCount(Pageable pageable, String category);

    @Query("FROM Product WHERE type = 'BIKE'")
    List<Product> getAllBikes(Pageable pageable);

    @Query("SELECT COUNT(p) FROM Product p WHERE type = 'BIKE'")
    List<Long> getAllBikesCount(Pageable pageable);

    @Query("FROM Product WHERE type = 'PART'")
    List<Product> getAllParts(Pageable pageable);

    @Query("SELECT COUNT(p) FROM Product p WHERE type = 'PART'")
    List<Long> getAllPartsCount(Pageable pageable);

    @Query("UPDATE Product SET stock = ?2 WHERE id = ?1")
    List<Product> decreaseProductQuantity(Pageable pageable, int productID, int quantity);
}

