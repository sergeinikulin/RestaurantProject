package com.nikulin.sergei.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/*еда*/
@Entity
@Table(name = "dish")
public class Dish{    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_dish")
    private Integer id_dish;
    
    @Column(name = "name_dish")
    private String name_dish;
    
    @Column(name = "calorie")
    private String calorie;
    
    @Column(name = "price")
    private Integer price;
    
    @Column(name = "product")
    private Integer product;
    
    @Column(name = "order_id")
    private Integer order_id;

    public Integer getId_dish() {
        return id_dish;
    }

    public void setId_dish(Integer id_dish) {
        this.id_dish = id_dish;
    }

    public String getName_dish() {
        return name_dish;
    }

    public void setName_dish(String name_dish) {
        this.name_dish = name_dish;
    }

    public String getCalorie() {
        return calorie;
    }

    public void setCalorie(String calorie) {
        this.calorie = calorie;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Integer getProduct() {
        return product;
    }

    public void setProduct(Integer product) {
        this.product = product;
    }

    public Integer getOrder_id() {
        return order_id;
    }

    public void setOrder_id(Integer order_id) {
        this.order_id = order_id;
    }
}