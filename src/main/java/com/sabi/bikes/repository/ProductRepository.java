package com.sabi.bikes.repository;

import com.sabi.bikes.domain.Product;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the Product entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    //    @Query(value = "FROM Product WHERE bikeCategory=?1")
//    List<Product> getAllByBikeCategory(String choice);

    @Query("FROM Product WHERE bike_category = ?1")
//    @Query(value = "SELECT Product FROM Product WHERE bikeCategory=:category")
    List<Product> getAllByBikeCategory(Pageable pageable, String chosenCategory);


//    @Query("FROM Product WHERE bikeCategory=?1")
//    List<Product> getAllByBikeCategory(String choice);

}
