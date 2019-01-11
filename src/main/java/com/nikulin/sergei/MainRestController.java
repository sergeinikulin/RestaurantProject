package com.nikulin.sergei;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.nikulin.sergei.domain.MainJson;
import com.nikulin.sergei.service.MainService;

/**
 * Handles requests for the application home page.
 */
@RestController
//@Controller
public class MainRestController {
//
	private static final Logger logger = LoggerFactory.getLogger(MainRestController.class);
	@Autowired private MainService mainService;

//
//	/**
//	 * Simply selects the home view to render by returning its name.
//	 */
	@RequestMapping(value = "/main/ajax", method = RequestMethod.GET)
	public Map<String, Object> getJson(HttpServletRequest request) {
		logger.info("MainRestController!");
		final Collection<MainJson> list = mainService.getJsonCollection();
		final Map<String, Object> map = new HashMap<>();

		for(final MainJson obj: list) {
			map.put(obj.getName(), obj);
			map.put(obj.getName(), obj);
		}

		return map;
	}

	@RequestMapping(path = "/error")
	public Map<String, Object> handleError(HttpServletRequest request) {
		logger.error("MainRestController Error!");
		final Map<String, Object> map = new HashMap<>();
		map.put("status", request.getAttribute("javax.servlet.error.status_code"));
		map.put("reason", request.getAttribute("javax.servlet.error.message"));
		return map;
	}

	public MainService getMainService() {
		return mainService;
	}

	public void setMainService(MainService mainService) {
		this.mainService = mainService;
	}
}
