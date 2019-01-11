package com.nikulin.sergei.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/*официант*/
@Entity
@Table(name = "officiant")
public class Officiant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_officiant")
    private Integer id_officiant;
    
    @Column(name = "fio_officiant")
    private String fio_officiant;
    
    public Integer getId_officiant() {
        return id_officiant;
    }

    public void setId_officiant(Integer id_officiant) {
        this.id_officiant = id_officiant;
    }

    public String getFIO_officiant() {
        return fio_officiant;
    }

    public void setFIO_officiant(String fio_officiant) {
        this.fio_officiant = fio_officiant;
    }
}