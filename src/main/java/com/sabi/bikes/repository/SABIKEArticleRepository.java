package com.sabi.bikes.repository;

import com.sabi.bikes.domain.SABIKEArticle;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the SABIKEArticle entity.
 */
@Repository
public interface SABIKEArticleRepository extends JpaRepository<SABIKEArticle, Long> {

    @Query(value = "select distinct sABIKEArticle from SABIKEArticle sABIKEArticle left join fetch sABIKEArticle.cartIds",
        countQuery = "select count(distinct sABIKEArticle) from SABIKEArticle sABIKEArticle")
    Page<SABIKEArticle> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct sABIKEArticle from SABIKEArticle sABIKEArticle left join fetch sABIKEArticle.cartIds")
    List<SABIKEArticle> findAllWithEagerRelationships();

    @Query("select sABIKEArticle from SABIKEArticle sABIKEArticle left join fetch sABIKEArticle.cartIds where sABIKEArticle.id =:id")
    Optional<SABIKEArticle> findOneWithEagerRelationships(@Param("id") Long id);

}
