package com.sabi.bikes.repository;

import com.sabi.bikes.domain.SABIKEUser;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the SABIKEUser entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SABIKEUserRepository extends JpaRepository<SABIKEUser, Long> {

}
