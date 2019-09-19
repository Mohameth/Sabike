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
    List<Product> getAllByBikeCategory(Pageable pageable, String chosenCategory);

    @Query("FROM Product WHERE part_category = ?1")
    List<Product> getAllByPartCategory(Pageable pageable, String category);

    @Query("FROM Product WHERE type = 'BIKE'")
    List<Product> getAllBikes(Pageable pageable);

    @Query("FROM Product WHERE type = 'PART'")
    List<Product> getAllParts(Pageable pageable);
  
    @Query("UPDATE Product SET stock = ?2 WHERE id = ?1")
    List<Product> decreaseProductQuantity(Pageable pageable, int productID, int quantity);
}

