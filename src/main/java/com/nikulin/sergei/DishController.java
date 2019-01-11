package com.nikulin.sergei;

import com.nikulin.sergei.domain.Dish;
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
@RequestMapping(path = "/ds") /*контекстый путь на эту сущность*/
public class DishController{
    @Autowired
    private GenericTypeService service;

    @RequestMapping(method = RequestMethod.GET, path = "/dish/")
    public ResponseEntity<?> getAllDish() {
        ArrayList<Dish> dishs = new ArrayList<>();
        dishs.addAll(service.findAll(Dish.class));
        return ResponseEntity.status(HttpStatus.OK).body(dishs);
    }

    @RequestMapping(method = RequestMethod.GET, path = "/dish/{dishID}")
    public ResponseEntity<?> getDish(@PathVariable Integer dishID) {
        Dish dish = service.getById(Dish.class, dishID);
        return ResponseEntity.status(HttpStatus.OK).body(dish);
    }

    @RequestMapping(method = RequestMethod.DELETE, path = "/dish/{dishID}")
    public ResponseEntity<?> deleteDish(@PathVariable Integer dishID) {
        service.delete(Dish.class, dishID);
        return ResponseEntity.status(HttpStatus.OK).body("Dish was successfully deleted");
    }

    /*RequestMethod.POST - по сути добавление новой сущность*/
    @RequestMapping(method = RequestMethod.POST, path = "/dish/")
    public ResponseEntity<?> createDish(@RequestBody Dish dish) {
        service.add(dish);
        return ResponseEntity.status(HttpStatus.OK).body("Dish was succesfully created");
    }

    /*RequestMethod.PUT - по сути обновление существующей сущности*/
    @RequestMapping(method = RequestMethod.PUT, path = "/dish")
    public ResponseEntity<?> updateDish(@RequestBody Dish dish) {
        service.update(dish);
        return ResponseEntity.status(HttpStatus.OK).body("Dish was successfully updated");
    }
}
