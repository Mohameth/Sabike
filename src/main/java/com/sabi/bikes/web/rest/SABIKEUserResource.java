package com.sabi.bikes.web.rest;

import com.sabi.bikes.domain.SABIKEUser;
import com.sabi.bikes.repository.SABIKEUserRepository;
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
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing {@link com.sabi.bikes.domain.SABIKEUser}.
 */
@RestController
@RequestMapping("/api")
public class SABIKEUserResource {

    private final Logger log = LoggerFactory.getLogger(SABIKEUserResource.class);

    private static final String ENTITY_NAME = "sABIKEUser";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SABIKEUserRepository sABIKEUserRepository;

    public SABIKEUserResource(SABIKEUserRepository sABIKEUserRepository) {
        this.sABIKEUserRepository = sABIKEUserRepository;
    }

    /**
     * {@code POST  /sabike-users} : Create a new sABIKEUser.
     *
     * @param sABIKEUser the sABIKEUser to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new sABIKEUser, or with status {@code 400 (Bad Request)} if the sABIKEUser has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/sabike-users")
    public ResponseEntity<SABIKEUser> createSABIKEUser(@RequestBody SABIKEUser sABIKEUser) throws URISyntaxException {
        log.debug("REST request to save SABIKEUser : {}", sABIKEUser);
        if (sABIKEUser.getId() != null) {
            throw new BadRequestAlertException("A new sABIKEUser cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SABIKEUser result = sABIKEUserRepository.save(sABIKEUser);
        return ResponseEntity.created(new URI("/api/sabike-users/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /sabike-users} : Updates an existing sABIKEUser.
     *
     * @param sABIKEUser the sABIKEUser to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated sABIKEUser,
     * or with status {@code 400 (Bad Request)} if the sABIKEUser is not valid,
     * or with status {@code 500 (Internal Server Error)} if the sABIKEUser couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/sabike-users")
    public ResponseEntity<SABIKEUser> updateSABIKEUser(@RequestBody SABIKEUser sABIKEUser) throws URISyntaxException {
        log.debug("REST request to update SABIKEUser : {}", sABIKEUser);
        if (sABIKEUser.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SABIKEUser result = sABIKEUserRepository.save(sABIKEUser);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, sABIKEUser.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /sabike-users} : get all the sABIKEUsers.
     *

     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of sABIKEUsers in body.
     */
    @GetMapping("/sabike-users")
    public List<SABIKEUser> getAllSABIKEUsers(@RequestParam(required = false) String filter) {
        if ("cartid-is-null".equals(filter)) {
            log.debug("REST request to get all SABIKEUsers where cartId is null");
            return StreamSupport
                .stream(sABIKEUserRepository.findAll().spliterator(), false)
                .filter(sABIKEUser -> sABIKEUser.getCartId() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all SABIKEUsers");
        return sABIKEUserRepository.findAll();
    }

    /**
     * {@code GET  /sabike-users/:id} : get the "id" sABIKEUser.
     *
     * @param id the id of the sABIKEUser to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the sABIKEUser, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/sabike-users/{id}")
    public ResponseEntity<SABIKEUser> getSABIKEUser(@PathVariable Long id) {
        log.debug("REST request to get SABIKEUser : {}", id);
        Optional<SABIKEUser> sABIKEUser = sABIKEUserRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(sABIKEUser);
    }

    /**
     * {@code DELETE  /sabike-users/:id} : delete the "id" sABIKEUser.
     *
     * @param id the id of the sABIKEUser to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/sabike-users/{id}")
    public ResponseEntity<Void> deleteSABIKEUser(@PathVariable Long id) {
        log.debug("REST request to delete SABIKEUser : {}", id);
        sABIKEUserRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
