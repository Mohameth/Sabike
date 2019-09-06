package com.sabi.bikes.repository;

import com.sabi.bikes.domain.SABIKECart;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the SABIKECart entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SABIKECartRepository extends JpaRepository<SABIKECart, Long> {

}
