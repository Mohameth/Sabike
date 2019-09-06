package com.sabi.bikes.repository;

import com.sabi.bikes.domain.SABIKEBike;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the SABIKEBike entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SABIKEBikeRepository extends JpaRepository<SABIKEBike, Long> {

}
