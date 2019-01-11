package com.nikulin.sergei.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/*исполнитель, кто делает блюдо, типо повара*/

@Entity
@Table(name = "executor")
public class Executor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_executor")
    private Integer id_executor;
    
    @Column(name = "FIO_executor")
    private String FIO_executor;
    
    @Column(name = "jobRole")
    private String jobRole;

    public Integer getId_executor() {
        return id_executor;
    }

    public void setId_executor(Integer id_executor) {
        this.id_executor = id_executor;
    }

    public String getFIO_executor() {
        return FIO_executor;
    }

    public void setFIO_executor(String FIO_executor) {
        this.FIO_executor = FIO_executor;
    }

    public String getJobRole() {
        return jobRole;
    }

    public void setJobRole(String jobRole) {
        this.jobRole = jobRole;
    }
}