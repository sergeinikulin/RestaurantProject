package com.nikulin.sergei;

import com.nikulin.sergei.domain.Shipment;
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
@RequestMapping(path = "/shmnt") /*контекстый путь на эту сущность*/
public class ShipmentController {
    @Autowired
    private GenericTypeService service;

    @RequestMapping(method = RequestMethod.GET, path = "/shipment/")
    public ResponseEntity<?> getAllShipment() {
        ArrayList<Shipment> shipments = new ArrayList<>();
        shipments.addAll(service.findAll(Shipment.class));
        return ResponseEntity.status(HttpStatus.OK).body(shipments);
    }

    @RequestMapping(method = RequestMethod.GET, path = "/shipment/{shipmentID}")
    public ResponseEntity<?> getShipment(@PathVariable Integer shipmentID) {
        Shipment shipment = service.getById(Shipment.class, shipmentID);
        return ResponseEntity.status(HttpStatus.OK).body(shipment);
    }

    @RequestMapping(method = RequestMethod.DELETE, path = "/shipment/{shipmentID}")
    public ResponseEntity<?> deleteShipment(@PathVariable Integer shipmentID) {
        service.delete(Shipment.class, shipmentID);
        return ResponseEntity.status(HttpStatus.OK).body("Shipment was successfully deleted");
    }

    /*RequestMethod.POST - по сути добавление новой сущность*/
    @RequestMapping(method = RequestMethod.POST, path = "/shipment/")
    public ResponseEntity<?> createShipment(@RequestBody Shipment shipment) {
        service.add(shipment);
        return ResponseEntity.status(HttpStatus.OK).body("Shipment was succesfully created");
    }

    /*RequestMethod.PUT - по сути обновление существующей сущности*/
    @RequestMapping(method = RequestMethod.PUT, path = "/shipment")
    public ResponseEntity<?> updateShipment(@RequestBody Shipment shipment) {
        service.update(shipment);
        return ResponseEntity.status(HttpStatus.OK).body("Shipment was successfully updated");
    }
}
