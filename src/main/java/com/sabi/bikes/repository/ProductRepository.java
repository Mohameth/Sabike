package com.sabi.bikes.repository;

import com.sabi.bikes.domain.Product;
import org.springframework.data.jpa.repository.*;
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
}
