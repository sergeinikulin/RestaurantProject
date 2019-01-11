package com.nikulin.sergei;

import com.nikulin.sergei.domain.Order;
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
@RequestMapping(path = "/ordr") /*контекстый путь на эту сущность*/
public class OrderController {
    @Autowired
    private GenericTypeService service;

    @RequestMapping(method = RequestMethod.GET, path = "/order/")
    public ResponseEntity<?> getAllOrder() {
        ArrayList<Order> orders = new ArrayList<>();
        orders.addAll(service.findAll(Order.class));
        return ResponseEntity.status(HttpStatus.OK).body(orders);
    }

    @RequestMapping(method = RequestMethod.GET, path = "/order/{orderID}")
    public ResponseEntity<?> getOrder(@PathVariable Integer orderID) {
        Order order = service.getById(Order.class, orderID);
        return ResponseEntity.status(HttpStatus.OK).body(order);
    }

    @RequestMapping(method = RequestMethod.DELETE, path = "/order/{orderID}")
    public ResponseEntity<?> deleteOrder(@PathVariable Integer orderID) {
        service.delete(Order.class, orderID);
        return ResponseEntity.status(HttpStatus.OK).body("Order was successfully deleted");
    }

    /*RequestMethod.POST - по сути добавление новой сущность*/
    @RequestMapping(method = RequestMethod.POST, path = "/order/")
    public ResponseEntity<?> createOrder(@RequestBody Order order) {
        service.add(order);
        return ResponseEntity.status(HttpStatus.OK).body("Order was succesfully created");
    }

    /*RequestMethod.PUT - по сути обновление существующей сущности*/
    @RequestMapping(method = RequestMethod.PUT, path = "/order")
    public ResponseEntity<?> updateOrder(@RequestBody Order order) {
        service.update(order);
        return ResponseEntity.status(HttpStatus.OK).body("Order was successfully updated");
    }
}
