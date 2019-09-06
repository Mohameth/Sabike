package com.sabi.bikes.web.rest;

import com.sabi.bikes.domain.SABIKEBike;
import com.sabi.bikes.repository.SABIKEBikeRepository;
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
 * REST controller for managing {@link com.sabi.bikes.domain.SABIKEBike}.
 */
@RestController
@RequestMapping("/api")
public class SABIKEBikeResource {

    private final Logger log = LoggerFactory.getLogger(SABIKEBikeResource.class);

    private static final String ENTITY_NAME = "sABIKEBike";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SABIKEBikeRepository sABIKEBikeRepository;

    public SABIKEBikeResource(SABIKEBikeRepository sABIKEBikeRepository) {
        this.sABIKEBikeRepository = sABIKEBikeRepository;
    }

    /**
     * {@code POST  /sabike-bikes} : Create a new sABIKEBike.
     *
     * @param sABIKEBike the sABIKEBike to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new sABIKEBike, or with status {@code 400 (Bad Request)} if the sABIKEBike has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/sabike-bikes")
    public ResponseEntity<SABIKEBike> createSABIKEBike(@RequestBody SABIKEBike sABIKEBike) throws URISyntaxException {
        log.debug("REST request to save SABIKEBike : {}", sABIKEBike);
        if (sABIKEBike.getId() != null) {
            throw new BadRequestAlertException("A new sABIKEBike cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SABIKEBike result = sABIKEBikeRepository.save(sABIKEBike);
        return ResponseEntity.created(new URI("/api/sabike-bikes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /sabike-bikes} : Updates an existing sABIKEBike.
     *
     * @param sABIKEBike the sABIKEBike to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated sABIKEBike,
     * or with status {@code 400 (Bad Request)} if the sABIKEBike is not valid,
     * or with status {@code 500 (Internal Server Error)} if the sABIKEBike couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/sabike-bikes")
    public ResponseEntity<SABIKEBike> updateSABIKEBike(@RequestBody SABIKEBike sABIKEBike) throws URISyntaxException {
        log.debug("REST request to update SABIKEBike : {}", sABIKEBike);
        if (sABIKEBike.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SABIKEBike result = sABIKEBikeRepository.save(sABIKEBike);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, sABIKEBike.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /sabike-bikes} : get all the sABIKEBikes.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of sABIKEBikes in body.
     */
    @GetMapping("/sabike-bikes")
    public List<SABIKEBike> getAllSABIKEBikes() {
        log.debug("REST request to get all SABIKEBikes");
        return sABIKEBikeRepository.findAll();
    }

    /**
     * {@code GET  /sabike-bikes/:id} : get the "id" sABIKEBike.
     *
     * @param id the id of the sABIKEBike to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the sABIKEBike, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/sabike-bikes/{id}")
    public ResponseEntity<SABIKEBike> getSABIKEBike(@PathVariable Long id) {
        log.debug("REST request to get SABIKEBike : {}", id);
        Optional<SABIKEBike> sABIKEBike = sABIKEBikeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(sABIKEBike);
    }

    /**
     * {@code DELETE  /sabike-bikes/:id} : delete the "id" sABIKEBike.
     *
     * @param id the id of the sABIKEBike to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/sabike-bikes/{id}")
    public ResponseEntity<Void> deleteSABIKEBike(@PathVariable Long id) {
        log.debug("REST request to delete SABIKEBike : {}", id);
        sABIKEBikeRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
