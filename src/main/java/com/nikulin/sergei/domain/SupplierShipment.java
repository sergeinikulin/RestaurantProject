package com.nikulin.sergei.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/*Поставщик*/

@Entity
@Table(name = "supplier_shipment")
public class SupplierShipment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_supplier_shipment")
    private Integer id_supplier_shipment;
    
    @Column(name = "id_provider")
    private Integer id_provider;
    
    @Column(name = "id_shipment")
    private Integer id_shipment;
    
    @Column(name = "provider_name")
    private String provider_name;

    public Integer getId_supplier_shipment() {
        return id_supplier_shipment;
    }

    public void setId_supplier_shipment(Integer id_supplier_shipment) {
        this.id_supplier_shipment = id_supplier_shipment;
    }

    public Integer getId_provider() {
        return id_provider;
    }

    public void setId_provider(Integer id_provider) {
        this.id_provider = id_provider;
    }

    public Integer getId_shipment() {
        return id_shipment;
    }

    public void setId_shipment(Integer id_shipment) {
        this.id_shipment = id_shipment;
    }

    public String getProvider_name() {
        return provider_name;
    }

    public void setProvider_name(String provider_name) {
        this.provider_name = provider_name;
    }
}