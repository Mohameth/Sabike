package com.sabi.bikes.web.rest;

import com.sabi.bikes.domain.SABIKECart;
import com.sabi.bikes.repository.SABIKECartRepository;
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
 * REST controller for managing {@link com.sabi.bikes.domain.SABIKECart}.
 */
@RestController
@RequestMapping("/api")
public class SABIKECartResource {

    private final Logger log = LoggerFactory.getLogger(SABIKECartResource.class);

    private static final String ENTITY_NAME = "sABIKECart";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SABIKECartRepository sABIKECartRepository;

    public SABIKECartResource(SABIKECartRepository sABIKECartRepository) {
        this.sABIKECartRepository = sABIKECartRepository;
    }

    /**
     * {@code POST  /sabike-carts} : Create a new sABIKECart.
     *
     * @param sABIKECart the sABIKECart to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new sABIKECart, or with status {@code 400 (Bad Request)} if the sABIKECart has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/sabike-carts")
    public ResponseEntity<SABIKECart> createSABIKECart(@RequestBody SABIKECart sABIKECart) throws URISyntaxException {
        log.debug("REST request to save SABIKECart : {}", sABIKECart);
        if (sABIKECart.getId() != null) {
            throw new BadRequestAlertException("A new sABIKECart cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SABIKECart result = sABIKECartRepository.save(sABIKECart);
        return ResponseEntity.created(new URI("/api/sabike-carts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /sabike-carts} : Updates an existing sABIKECart.
     *
     * @param sABIKECart the sABIKECart to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated sABIKECart,
     * or with status {@code 400 (Bad Request)} if the sABIKECart is not valid,
     * or with status {@code 500 (Internal Server Error)} if the sABIKECart couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/sabike-carts")
    public ResponseEntity<SABIKECart> updateSABIKECart(@RequestBody SABIKECart sABIKECart) throws URISyntaxException {
        log.debug("REST request to update SABIKECart : {}", sABIKECart);
        if (sABIKECart.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SABIKECart result = sABIKECartRepository.save(sABIKECart);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, sABIKECart.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /sabike-carts} : get all the sABIKECarts.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of sABIKECarts in body.
     */
    @GetMapping("/sabike-carts")
    public List<SABIKECart> getAllSABIKECarts() {
        log.debug("REST request to get all SABIKECarts");
        return sABIKECartRepository.findAll();
    }

    /**
     * {@code GET  /sabike-carts/:id} : get the "id" sABIKECart.
     *
     * @param id the id of the sABIKECart to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the sABIKECart, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/sabike-carts/{id}")
    public ResponseEntity<SABIKECart> getSABIKECart(@PathVariable Long id) {
        log.debug("REST request to get SABIKECart : {}", id);
        Optional<SABIKECart> sABIKECart = sABIKECartRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(sABIKECart);
    }

    /**
     * {@code DELETE  /sabike-carts/:id} : delete the "id" sABIKECart.
     *
     * @param id the id of the sABIKECart to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/sabike-carts/{id}")
    public ResponseEntity<Void> deleteSABIKECart(@PathVariable Long id) {
        log.debug("REST request to delete SABIKECart : {}", id);
        sABIKECartRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
