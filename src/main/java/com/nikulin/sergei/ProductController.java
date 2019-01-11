package com.nikulin.sergei;

import com.nikulin.sergei.domain.Product;
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
@RequestMapping(path = "/pd") /*контекстый путь на эту сущность*/
public class ProductController{
    @Autowired
    private GenericTypeService service;

    @RequestMapping(method = RequestMethod.GET, path = "/product/")
    public ResponseEntity<?> getAllProduct() {
        ArrayList<Product> products = new ArrayList<>();
        products.addAll(service.findAll(Product.class));
        return ResponseEntity.status(HttpStatus.OK).body(products);
    }

    @RequestMapping(method = RequestMethod.GET, path = "/product/{productID}")
    public ResponseEntity<?> getProduct(@PathVariable Integer productID) {
        Product product = service.getById(Product.class, productID);
        return ResponseEntity.status(HttpStatus.OK).body(product);
    }

    @RequestMapping(method = RequestMethod.DELETE, path = "/product/{productID}")
    public ResponseEntity<?> deleteProduct(@PathVariable Integer productID) {
        service.delete(Product.class, productID);
        return ResponseEntity.status(HttpStatus.OK).body("Product was successfully deleted");
    }

    /*RequestMethod.POST - по сути добавление новой сущность*/
    @RequestMapping(method = RequestMethod.POST, path = "/product/")
    public ResponseEntity<?> createProduct(@RequestBody Product product) {
        service.add(product);
        return ResponseEntity.status(HttpStatus.OK).body("Product was succesfully created");
    }

    /*RequestMethod.PUT - по сути обновление существующей сущности*/
    @RequestMapping(method = RequestMethod.PUT, path = "/product")
    public ResponseEntity<?> updateProduct(@RequestBody Product product) {
        service.update(product);
        return ResponseEntity.status(HttpStatus.OK).body("Product was successfully updated");
    }
}
