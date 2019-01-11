package com.nikulin.sergei.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/*партия
 */

@Entity
@Table(name = "shipments")
public class Shipment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_shipment")
    private Integer id_shipment;
    
    @Column(name = "datetime_shipment")
    private String datetime_shipment;
    
    @Column(name = "price_shipment")
    private Integer price_shipment;
    
    @Column(name = "count_product_shipment")
    private Integer count_product_shipment;
    
    @Column(name = "name_shipment")
    private String name_shipment;

    public Integer getId_shipment() {
        return id_shipment;
    }

    public void setId_shipment(Integer id_shipment) {
        this.id_shipment = id_shipment;
    }

    public String getDatetime_shipment() {
        return datetime_shipment;
    }

    public void setDatetime_shipment(String datetime_shipment) {
        this.datetime_shipment = datetime_shipment;
    }

    public Integer getPrice_shipment() {
        return price_shipment;
    }

    public void setPrice_shipment(Integer price_shipment) {
        this.price_shipment = price_shipment;
    }

    public Integer getCount_product_shipment() {
        return count_product_shipment;
    }

    public void setCount_product_shipment(Integer count_product_shipment) {
        this.count_product_shipment = count_product_shipment;
    }

    public String getName_shipment() {
        return name_shipment;
    }

    public void setName_shipment(String name_shipment) {
        this.name_shipment = name_shipment;
    }
}