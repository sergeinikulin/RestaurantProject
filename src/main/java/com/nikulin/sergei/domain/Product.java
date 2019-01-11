package com.nikulin.sergei.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/*продукт*/
@Entity
@Table(name = "product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_product")
    private Integer id_product;
    
    @Column(name = "id_shipment")
    private Integer id_shipment;
    
    @Column(name = "name_product")
    private String name_product;
    
    @Column(name = "calorie")
    private String calorie;

    public String getProduct_calorie() {
        return calorie;
    }

    public void setProduct_calorie(String calorie) {
        this.calorie = calorie;
    }
    
    public Integer getProduct_id() {
        return id_product;
    }
    public void setProduct_id(Integer id_product) {
        this.id_product = id_product;
    }
    
    public Integer getShipment_id() {
        return id_shipment;
    }

    public void setShipment_id(Integer id_shipment) {
        this.id_shipment = id_shipment;
    }

    public String getProduct_name() {
        return name_product;
    }

    public void setProduct_name(String name_product) {
        this.name_product = name_product;
    }
}
