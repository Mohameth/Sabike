package com.sabi.bikes.repository;

import com.sabi.bikes.domain.SABIKEPart;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the SABIKEPart entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SABIKEPartRepository extends JpaRepository<SABIKEPart, Long> {

}
