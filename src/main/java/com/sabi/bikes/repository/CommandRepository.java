package com.sabi.bikes.repository;

import com.sabi.bikes.domain.Command;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the Command entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CommandRepository extends JpaRepository<Command, Long> {

    @Query("FROM Command WHERE client_id = ?1 AND state = 'CART'")
    List<Command> getUserCart(Pageable pageable, Long clientId);

}
