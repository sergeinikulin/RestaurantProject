package com.nikulin.sergei;

import com.nikulin.sergei.domain.Executor;
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
@RequestMapping(path = "/exc")
public class ExecutorController {
    @Autowired
    private GenericTypeService service;

    @RequestMapping(method = RequestMethod.GET, path = "/executor/")
    public ResponseEntity<?> getAllExecutor() {
        ArrayList<Executor> executors = new ArrayList<>();
        executors.addAll(service.findAll(Executor.class));
        return ResponseEntity.status(HttpStatus.OK).body(executors);
    }

    @RequestMapping(method = RequestMethod.GET, path = "/executor/{executorID}")
    public ResponseEntity<?> getExecutor(@PathVariable Integer executorID) {
        Executor executor = service.getById(Executor.class, executorID);
        return ResponseEntity.status(HttpStatus.OK).body(executor);
    }

    @RequestMapping(method = RequestMethod.DELETE, path = "/executor/{executorID}")
    public ResponseEntity<?> deleteExecutor(@PathVariable Integer executorID) {
        service.delete(Executor.class, executorID);
        return ResponseEntity.status(HttpStatus.OK).body("Executor was successfully deleted");
    }

    /*RequestMethod.POST - по сути добавление новой сущность*/
    @RequestMapping(method = RequestMethod.POST, path = "/executor/")
    public ResponseEntity<?> createExecutor(@RequestBody Executor executor) {
        service.add(executor);
        return ResponseEntity.status(HttpStatus.OK).body("Executor was succesfully created");
    }

    /*RequestMethod.PUT - по сути обновление существующей сущности*/
    @RequestMapping(method = RequestMethod.PUT, path = "/executor")
    public ResponseEntity<?> updateExecutor(@RequestBody Executor executor) {
        service.update(executor);
        return ResponseEntity.status(HttpStatus.OK).body("Executor was successfully updated");
    }
}
