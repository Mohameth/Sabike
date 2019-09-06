package com.sabi.bikes.repository;

import com.sabi.bikes.domain.SABIKECommande;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the SABIKECommande entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SABIKECommandeRepository extends JpaRepository<SABIKECommande, Long> {

}
