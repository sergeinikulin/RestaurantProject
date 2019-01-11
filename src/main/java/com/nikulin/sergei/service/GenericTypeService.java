package com.nikulin.sergei.service;

/**
 *
 * @author nikulin
 */
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/* сервис по сути для всех уникальный */

@Service
public class GenericTypeService {    
    @Autowired
    private EntityManagerFactory factory;    
    public <T> List<T> findAll(Class<T> tClass){
        EntityManager manager = factory.createEntityManager();
        manager.getTransaction().begin();
        CriteriaBuilder criteriaBuilder = manager.getCriteriaBuilder();
        CriteriaQuery<T> criteriaQuery = criteriaBuilder.createQuery(tClass);
        Root<T> root = criteriaQuery.from(tClass);
        criteriaQuery.select(root);
        List<T> result = manager.createQuery(criteriaQuery).getResultList();
        manager.getTransaction().commit();
        manager.close();
        return result;
    }    
    public <T> T getById(Class<T> tClass, long id){
        EntityManager manager = factory.createEntityManager();
        manager.getTransaction().begin();
        T result = manager.find(tClass,id);
        manager.getTransaction().commit();
        manager.close();
        return result;
    }
    public void add(Object obj) {
        EntityManager manager = factory.createEntityManager();
        manager.getTransaction().begin();
        manager.persist(obj);
        manager.getTransaction().commit();
        manager.close();
    }
    public void update(Object obj){
        EntityManager manager = factory.createEntityManager();
        manager.getTransaction().begin();
        obj = manager.merge(obj);
        manager.getTransaction().commit();
        manager.close();
    }
    public <T> void delete(Class<T> tClass, Integer id) {
        T obj = this.getById(tClass, id);
        EntityManager manager = factory.createEntityManager();
        manager.getTransaction().begin();
        Object entity1 = manager.merge(obj);
        manager.remove(entity1);
        manager.getTransaction().commit();
        manager.close();
    }
    public EntityManager getEntityManager(){
        return factory.createEntityManager();
    }
}