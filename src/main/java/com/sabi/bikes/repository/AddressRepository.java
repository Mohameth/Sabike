package com.sabi.bikes.repository;

import com.sabi.bikes.domain.Address;
import com.sabi.bikes.domain.Command;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the Address entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {

    @Query(value = "SELECT * FROM ADDRESS WHERE client_id = ?1", nativeQuery = true)
//    @Query("FROM ADDRESS WHERE client_id = ?1")
    List<Address> getAddressesByClient(Pageable pageable, Long clientId);
}
