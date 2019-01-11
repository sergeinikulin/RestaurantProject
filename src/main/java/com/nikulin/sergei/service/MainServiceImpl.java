/**
 *
 */
package com.nikulin.sergei.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.nikulin.sergei.domain.MainJson;

@Component("mainService")
@Service
public class MainServiceImpl implements MainService {

	//TODO: write some jackson objects to return json to the UI
	@Override
	public List<MainJson> getJsonCollection() {
		final List<MainJson> list = new ArrayList<>();
		list.add(new MainJson(1, "obj1", "JSON OBJ1 from Service"));
		list.add(new MainJson(2, "obj2", "JSON OBJ2 from Service"));
		return list;
	}
}