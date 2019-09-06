package com.sabi.bikes.web.rest;

import com.sabi.bikes.domain.SABIKECommande;
import com.sabi.bikes.repository.SABIKECommandeRepository;
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
 * REST controller for managing {@link com.sabi.bikes.domain.SABIKECommande}.
 */
@RestController
@RequestMapping("/api")
public class SABIKECommandeResource {

    private final Logger log = LoggerFactory.getLogger(SABIKECommandeResource.class);

    private static final String ENTITY_NAME = "sABIKECommande";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SABIKECommandeRepository sABIKECommandeRepository;

    public SABIKECommandeResource(SABIKECommandeRepository sABIKECommandeRepository) {
        this.sABIKECommandeRepository = sABIKECommandeRepository;
    }

    /**
     * {@code POST  /sabike-commandes} : Create a new sABIKECommande.
     *
     * @param sABIKECommande the sABIKECommande to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new sABIKECommande, or with status {@code 400 (Bad Request)} if the sABIKECommande has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/sabike-commandes")
    public ResponseEntity<SABIKECommande> createSABIKECommande(@RequestBody SABIKECommande sABIKECommande) throws URISyntaxException {
        log.debug("REST request to save SABIKECommande : {}", sABIKECommande);
        if (sABIKECommande.getId() != null) {
            throw new BadRequestAlertException("A new sABIKECommande cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SABIKECommande result = sABIKECommandeRepository.save(sABIKECommande);
        return ResponseEntity.created(new URI("/api/sabike-commandes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /sabike-commandes} : Updates an existing sABIKECommande.
     *
     * @param sABIKECommande the sABIKECommande to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated sABIKECommande,
     * or with status {@code 400 (Bad Request)} if the sABIKECommande is not valid,
     * or with status {@code 500 (Internal Server Error)} if the sABIKECommande couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/sabike-commandes")
    public ResponseEntity<SABIKECommande> updateSABIKECommande(@RequestBody SABIKECommande sABIKECommande) throws URISyntaxException {
        log.debug("REST request to update SABIKECommande : {}", sABIKECommande);
        if (sABIKECommande.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SABIKECommande result = sABIKECommandeRepository.save(sABIKECommande);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, sABIKECommande.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /sabike-commandes} : get all the sABIKECommandes.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of sABIKECommandes in body.
     */
    @GetMapping("/sabike-commandes")
    public List<SABIKECommande> getAllSABIKECommandes() {
        log.debug("REST request to get all SABIKECommandes");
        return sABIKECommandeRepository.findAll();
    }

    /**
     * {@code GET  /sabike-commandes/:id} : get the "id" sABIKECommande.
     *
     * @param id the id of the sABIKECommande to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the sABIKECommande, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/sabike-commandes/{id}")
    public ResponseEntity<SABIKECommande> getSABIKECommande(@PathVariable Long id) {
        log.debug("REST request to get SABIKECommande : {}", id);
        Optional<SABIKECommande> sABIKECommande = sABIKECommandeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(sABIKECommande);
    }

    /**
     * {@code DELETE  /sabike-commandes/:id} : delete the "id" sABIKECommande.
     *
     * @param id the id of the sABIKECommande to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/sabike-commandes/{id}")
    public ResponseEntity<Void> deleteSABIKECommande(@PathVariable Long id) {
        log.debug("REST request to delete SABIKECommande : {}", id);
        sABIKECommandeRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
