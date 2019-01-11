package com.nikulin.sergei;

import com.nikulin.sergei.domain.Officiant;
import com.nikulin.sergei.service.GenericTypeService;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
/**
 *
 * @author nikulin
 */
@RestController
@RequestMapping(path = "/offc") /*контекстый путь на эту сущность*/
public class OfficiantController{
    @Autowired
    private GenericTypeService service;

    @RequestMapping(method = RequestMethod.GET, path = "/officiant/")
    public ResponseEntity<?> getAllOfficiants() {
        ArrayList<Officiant> officiants = new ArrayList<>();
        officiants.addAll(service.findAll(Officiant.class));
        return ResponseEntity.status(HttpStatus.OK).body(officiants);
    }

    @RequestMapping(method = RequestMethod.GET, path = "/officiant/{officiantID}")
    public ResponseEntity<?> getOfficiants(@PathVariable Integer officiantID) {
        Officiant officiant = service.getById(Officiant.class, officiantID);
        return ResponseEntity.status(HttpStatus.OK).body(officiant);
    }

    @RequestMapping(method = RequestMethod.DELETE, path = "/officiant/{officiantID}")
    public ResponseEntity<?> deleteOfficiants(@PathVariable Integer officiantID) {
        service.delete(Officiant.class, officiantID);
        return ResponseEntity.status(HttpStatus.OK).body("Officiant was successfully deleted");
    }

    /*RequestMethod.POST - по сути добавление новой сущность*/
    @RequestMapping(method = RequestMethod.POST, path = "/officiant/")
    public ResponseEntity<?> createOfficiant(@RequestBody Officiant officiant) {
        service.add(officiant);
        return ResponseEntity.status(HttpStatus.OK).body("Officiant was succesfully created");
    }

    /*RequestMethod.PUT - по сути обновление существующей сущности*/
    @RequestMapping(method = RequestMethod.PUT, path = "/officiant")
    public ResponseEntity<?> updateOfficiant(@RequestBody Officiant officiant) {
        service.update(officiant);
        return ResponseEntity.status(HttpStatus.OK).body("Officiant was successfully updated");
    }
}
