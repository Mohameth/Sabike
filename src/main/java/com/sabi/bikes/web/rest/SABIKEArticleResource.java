package com.sabi.bikes.web.rest;

import com.sabi.bikes.domain.SABIKEArticle;
import com.sabi.bikes.repository.SABIKEArticleRepository;
import com.sabi.bikes.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.sabi.bikes.domain.SABIKEArticle}.
 */
@RestController
@RequestMapping("/api")
public class SABIKEArticleResource {

    private final Logger log = LoggerFactory.getLogger(SABIKEArticleResource.class);

    private static final String ENTITY_NAME = "sABIKEArticle";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SABIKEArticleRepository sABIKEArticleRepository;

    public SABIKEArticleResource(SABIKEArticleRepository sABIKEArticleRepository) {
        this.sABIKEArticleRepository = sABIKEArticleRepository;
    }

    /**
     * {@code POST  /sabike-articles} : Create a new sABIKEArticle.
     *
     * @param sABIKEArticle the sABIKEArticle to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new sABIKEArticle, or with status {@code 400 (Bad Request)} if the sABIKEArticle has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/sabike-articles")
    public ResponseEntity<SABIKEArticle> createSABIKEArticle(@RequestBody SABIKEArticle sABIKEArticle) throws URISyntaxException {
        log.debug("REST request to save SABIKEArticle : {}", sABIKEArticle);
        if (sABIKEArticle.getId() != null) {
            throw new BadRequestAlertException("A new sABIKEArticle cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SABIKEArticle result = sABIKEArticleRepository.save(sABIKEArticle);
        return ResponseEntity.created(new URI("/api/sabike-articles/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /sabike-articles} : Updates an existing sABIKEArticle.
     *
     * @param sABIKEArticle the sABIKEArticle to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated sABIKEArticle,
     * or with status {@code 400 (Bad Request)} if the sABIKEArticle is not valid,
     * or with status {@code 500 (Internal Server Error)} if the sABIKEArticle couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/sabike-articles")
    public ResponseEntity<SABIKEArticle> updateSABIKEArticle(@RequestBody SABIKEArticle sABIKEArticle) throws URISyntaxException {
        log.debug("REST request to update SABIKEArticle : {}", sABIKEArticle);
        if (sABIKEArticle.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SABIKEArticle result = sABIKEArticleRepository.save(sABIKEArticle);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, sABIKEArticle.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /sabike-articles} : get all the sABIKEArticles.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of sABIKEArticles in body.
     */
    @GetMapping("/sabike-articles")
    public List<SABIKEArticle> getAllSABIKEArticles(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all SABIKEArticles");
        return sABIKEArticleRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /sabike-articles/:id} : get the "id" sABIKEArticle.
     *
     * @param id the id of the sABIKEArticle to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the sABIKEArticle, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/sabike-articles/{id}")
    public ResponseEntity<SABIKEArticle> getSABIKEArticle(@PathVariable Long id) {
        log.debug("REST request to get SABIKEArticle : {}", id);
        Optional<SABIKEArticle> sABIKEArticle = sABIKEArticleRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(sABIKEArticle);
    }

    /**
     * {@code DELETE  /sabike-articles/:id} : delete the "id" sABIKEArticle.
     *
     * @param id the id of the sABIKEArticle to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/sabike-articles/{id}")
    public ResponseEntity<Void> deleteSABIKEArticle(@PathVariable Long id) {
        log.debug("REST request to delete SABIKEArticle : {}", id);
        sABIKEArticleRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
