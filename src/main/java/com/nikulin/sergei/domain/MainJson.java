/**
 *
 */
package com.nikulin.sergei.domain;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

/**
 * @author garyt_000
 *
 */
//@Entity
//@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
@JsonPropertyOrder({ "id", "name", "value", "updateDate" })
public class MainJson {

	private Long id;
	private String name;
	private String value;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
	//@Pattern(regexp="([0-9]{2})[/]([0-9]{2}[/]([0-9]{4})$", message="Purchase date must be in MM/DD/YYYY format")
	//	@NonNull
	private Date updateDate;

	public MainJson(long id, String name, String val) {
		setId(id);
		setName(name);
		setValue(val);
		setUpdateDate(new Date());
	}

	public MainJson(long id, String name, String val, Date date) {
		setId(id);
		setName(name);
		setValue(val);
		setUpdateDate(date);
	}

	public Date getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}
}
