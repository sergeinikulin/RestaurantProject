package com.nikulin.sergei;

import com.nikulin.sergei.domain.SupplierShipment;
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

@RestController
@RequestMapping(path = "/sship") /*контекстый путь на эту сущность*/
public class SupplierShipmentController {
    @Autowired
    private GenericTypeService service;

    @RequestMapping(method = RequestMethod.GET, path = "/suppliershipment/")
    public ResponseEntity<?> getAllSuppliershipment() {
        ArrayList<SupplierShipment> suppliershipments = new ArrayList<>();
        suppliershipments.addAll(service.findAll(SupplierShipment.class));
        return ResponseEntity.status(HttpStatus.OK).body(suppliershipments);
    }

    @RequestMapping(method = RequestMethod.GET, path = "/suppliershipment/{suppliershipmentID}")
    public ResponseEntity<?> getSuppliershipment(@PathVariable Integer suppliershipmentID) {
        SupplierShipment suppliershipment = service.getById(SupplierShipment.class, suppliershipmentID);
        return ResponseEntity.status(HttpStatus.OK).body(suppliershipment);
    }

    @RequestMapping(method = RequestMethod.DELETE, path = "/suppliershipment/{suppliershipmentID}")
    public ResponseEntity<?> deleteSuppliershipment(@PathVariable Integer suppliershipmentID) {
        service.delete(SupplierShipment.class, suppliershipmentID);
        return ResponseEntity.status(HttpStatus.OK).body("Suppliershipment was successfully deleted");
    }

    /*RequestMethod.POST - по сути добавление новой сущность*/
    @RequestMapping(method = RequestMethod.POST, path = "/suppliershipment/")
    public ResponseEntity<?> createSupplierShipment(@RequestBody SupplierShipment suppliershipment) {
        service.add(suppliershipment);
        return ResponseEntity.status(HttpStatus.OK).body("SupplierShipment was succesfully created");
    }

    /*RequestMethod.PUT - по сути обновление существующей сущности*/
    @RequestMapping(method = RequestMethod.PUT, path = "/suppliershipment")
    public ResponseEntity<?> updateSupplierShipment(@RequestBody SupplierShipment suppliershipment) {
        service.update(suppliershipment);
        return ResponseEntity.status(HttpStatus.OK).body("SupplierShipment was successfully updated");
    }
}
