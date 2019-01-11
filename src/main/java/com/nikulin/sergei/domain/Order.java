package com.nikulin.sergei.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/*заказ*/
@Entity
@Table(name = "orderTable")
public class Order{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_orderTable")
    private Integer id_orderTable;
    
    @Column(name = "id_officiant")
    private Integer id_officiant;
    
    @Column(name = "id_executor")
    private Integer id_executor;
    
    @Column(name = "count_guest")
    private Integer count_guest;
    
    @Column(name = "price_order")
    private Integer price_order;
    
    @Column(name = "datetime_shipment")
    private String datetime_shipment;
    
    @Column(name = "number_table")
    private String number_table;
    
    @Column(name = "text_order_dishs")
    private String text_order_dishs;

    public Integer getId_orderTable() {
        return id_orderTable;
    }

    public void setId_orderTable(Integer id_orderTable) {
        this.id_orderTable = id_orderTable;
    }

    public Integer getId_officiant() {
        return id_officiant;
    }

    public void setId_officiant(Integer id_officiant) {
        this.id_officiant = id_officiant;
    }

    public Integer getId_executor() {
        return id_executor;
    }

    public void setId_executor(Integer id_executor) {
        this.id_executor = id_executor;
    }

    public Integer getCount_guest() {
        return count_guest;
    }

    public void setCount_guest(Integer count_guest) {
        this.count_guest = count_guest;
    }

    public Integer getPrice_order() {
        return price_order;
    }

    public void setPrice_order(Integer price_order) {
        this.price_order = price_order;
    }

    public String getDatetime_shipment() {
        return datetime_shipment;
    }

    public void setDatetime_shipment(String datetime_shipment) {
        this.datetime_shipment = datetime_shipment;
    }

    public String getNumber_table() {
        return number_table;
    }

    public void setNumber_table(String number_table) {
        this.number_table = number_table;
    }    

    public String getText_order_dishs() {
        return text_order_dishs;
    }

    public void setText_order_dishs(String text_order_dishs) {
        this.text_order_dishs = text_order_dishs;
    }    
}