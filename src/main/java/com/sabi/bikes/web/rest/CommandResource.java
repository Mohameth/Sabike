package com.sabi.bikes.web.rest;

import com.sabi.bikes.domain.Command;
import com.sabi.bikes.domain.enumeration.OrderState;
import com.sabi.bikes.repository.CommandRepository;
import com.sabi.bikes.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Pageable;

import java.net.URI;
import java.net.URISyntaxException;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.sabi.bikes.domain.Command}.
 */
@RestController
@RequestMapping("/api")
public class CommandResource {

    private final Logger log = LoggerFactory.getLogger(CommandResource.class);

    private static final String ENTITY_NAME = "command";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CommandRepository commandRepository;

    public CommandResource(CommandRepository commandRepository) {
        this.commandRepository = commandRepository;
    }

    /**
     * {@code POST  /commands} : Create a new command.
     *
     * @param command the command to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new command, or with status {@code 400 (Bad Request)} if the command has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/commands")
    public ResponseEntity<Command> createCommand(@RequestBody Command command) throws URISyntaxException {
        log.debug("REST request to save Command : {}", command);
        if (command.getId() != null) {
            throw new BadRequestAlertException("A new command cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Command result = commandRepository.save(command);
        return ResponseEntity.created(new URI("/api/commands/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /commands} : Updates an existing command.
     *
     * @param command the command to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated command,
     * or with status {@code 400 (Bad Request)} if the command is not valid,
     * or with status {@code 500 (Internal Server Error)} if the command couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/commands")
    public ResponseEntity<Command> updateCommand(@RequestBody Command command) throws URISyntaxException {
        log.debug("REST request to update Command : {}", command);
        if (command.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (command.getState() == OrderState.PENDING) {
            log.debug("'++++++++++++++++++++++++''++++++++++++++++++++++++''++++++++++++++++++++++++''++++++++++++++++++++++++'");
            Date date = new Date();
            LocalDate localDate = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
            command.setOrderDate(localDate);
        }
        Command result = commandRepository.save(command);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, command.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /commands} : get all the commands.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of commands in body.
     */
    @GetMapping("/commands")
    public List<Command> getAllCommands() {
        log.debug("REST request to get all Commands");
        return commandRepository.findAll();
    }

    /**
     * {@code GET  /commands/:id} : get the "id" command.
     *
     * @param id the id of the command to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the command, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/commands/{id}")
    public ResponseEntity<Command> getCommand(@PathVariable Long id) {
        log.debug("REST request to get Command : {}", id);
        Optional<Command> command = commandRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(command);
    }

    /**
     * {@code DELETE  /commands/:id} : delete the "id" command.
     *
     * @param id the id of the command to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/commands/{id}")
    public ResponseEntity<Void> deleteCommand(@PathVariable Long id) {
        log.debug("REST request to delete Command : {}", id);
        commandRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }

    @GetMapping("/commands/{id}/hascart")
    public ResponseEntity<List<Command>> getCommandCart(Pageable pageable, @PathVariable Long id) {
        List<Command> commands = commandRepository.getUserCart(pageable, id);
        return new ResponseEntity<>(commands, HttpStatus.OK);
    }

    @GetMapping("/commands/history/{id}")
    public ResponseEntity<List<Command>> getHistory(Pageable pageable, @PathVariable Long id) {
        List<Command> commands = commandRepository.getUserCommandHistoty(pageable, id);
        return new ResponseEntity<>(commands, HttpStatus.OK);
    }

//    @GetMapping("/commands/create")
//    public ResponseEntity<Command> createCart(Pageable pageable, @PathVariable Command cart) {
//        Command command = commandRepository.createUserCart(pageable, cart);
//        return new ResponseEntity<>(commands, HttpStatus.OK);
//    }
}
