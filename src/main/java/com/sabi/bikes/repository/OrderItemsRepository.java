package com.sabi.bikes.repository;

import com.sabi.bikes.domain.OrderItems;
import com.sabi.bikes.domain.Product;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the OrderItems entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OrderItemsRepository extends JpaRepository<OrderItems, Long> {

    @Query("DELETE FROM OrderItems WHERE id = ?1")
    List<OrderItems> deleteCustomById(Pageable pageable, Long orderItemId);
}
