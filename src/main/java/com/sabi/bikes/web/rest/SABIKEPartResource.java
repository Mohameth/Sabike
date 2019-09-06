package com.sabi.bikes.web.rest;

import com.sabi.bikes.domain.SABIKEPart;
import com.sabi.bikes.repository.SABIKEPartRepository;
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
 * REST controller for managing {@link com.sabi.bikes.domain.SABIKEPart}.
 */
@RestController
@RequestMapping("/api")
public class SABIKEPartResource {

    private final Logger log = LoggerFactory.getLogger(SABIKEPartResource.class);

    private static final String ENTITY_NAME = "sABIKEPart";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SABIKEPartRepository sABIKEPartRepository;

    public SABIKEPartResource(SABIKEPartRepository sABIKEPartRepository) {
        this.sABIKEPartRepository = sABIKEPartRepository;
    }

    /**
     * {@code POST  /sabike-parts} : Create a new sABIKEPart.
     *
     * @param sABIKEPart the sABIKEPart to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new sABIKEPart, or with status {@code 400 (Bad Request)} if the sABIKEPart has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/sabike-parts")
    public ResponseEntity<SABIKEPart> createSABIKEPart(@RequestBody SABIKEPart sABIKEPart) throws URISyntaxException {
        log.debug("REST request to save SABIKEPart : {}", sABIKEPart);
        if (sABIKEPart.getId() != null) {
            throw new BadRequestAlertException("A new sABIKEPart cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SABIKEPart result = sABIKEPartRepository.save(sABIKEPart);
        return ResponseEntity.created(new URI("/api/sabike-parts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /sabike-parts} : Updates an existing sABIKEPart.
     *
     * @param sABIKEPart the sABIKEPart to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated sABIKEPart,
     * or with status {@code 400 (Bad Request)} if the sABIKEPart is not valid,
     * or with status {@code 500 (Internal Server Error)} if the sABIKEPart couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/sabike-parts")
    public ResponseEntity<SABIKEPart> updateSABIKEPart(@RequestBody SABIKEPart sABIKEPart) throws URISyntaxException {
        log.debug("REST request to update SABIKEPart : {}", sABIKEPart);
        if (sABIKEPart.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SABIKEPart result = sABIKEPartRepository.save(sABIKEPart);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, sABIKEPart.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /sabike-parts} : get all the sABIKEParts.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of sABIKEParts in body.
     */
    @GetMapping("/sabike-parts")
    public List<SABIKEPart> getAllSABIKEParts() {
        log.debug("REST request to get all SABIKEParts");
        return sABIKEPartRepository.findAll();
    }

    /**
     * {@code GET  /sabike-parts/:id} : get the "id" sABIKEPart.
     *
     * @param id the id of the sABIKEPart to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the sABIKEPart, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/sabike-parts/{id}")
    public ResponseEntity<SABIKEPart> getSABIKEPart(@PathVariable Long id) {
        log.debug("REST request to get SABIKEPart : {}", id);
        Optional<SABIKEPart> sABIKEPart = sABIKEPartRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(sABIKEPart);
    }

    /**
     * {@code DELETE  /sabike-parts/:id} : delete the "id" sABIKEPart.
     *
     * @param id the id of the sABIKEPart to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/sabike-parts/{id}")
    public ResponseEntity<Void> deleteSABIKEPart(@PathVariable Long id) {
        log.debug("REST request to delete SABIKEPart : {}", id);
        sABIKEPartRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
