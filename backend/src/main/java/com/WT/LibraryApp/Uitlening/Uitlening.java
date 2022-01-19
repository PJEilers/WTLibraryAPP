package com.WT.LibraryApp.Uitlening;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "uitleningen")
public class Uitlening {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(length = 10, nullable = false)
	private int exemplaarId;
	
	@Column(length = 10, nullable = false)
	private int persoonId;
	
	@Column(length = 10, nullable = false)
	private Date beginDatum;
	
	@Column(length = 10, nullable = true)
	private Date eindDatum;
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getExemplaarId() {
		return exemplaarId;
	}

	public void setExemplaarId(int exemplaarId) {
		this.exemplaarId = exemplaarId;
	}

	public int getPersoonId() {
		return persoonId;
	}

	public void setPersoonId(int persoonId) {
		this.persoonId = persoonId;
	}

	public Date getBeginDatum() {
		return beginDatum;
	}

	public void setBeginDatum(Date beginDatum) {
		this.beginDatum = beginDatum;
	}
	
	public Date getEindDatum() {
		return eindDatum;
	}

	public void setEindDatum(Date eindDatum) {
		this.eindDatum = eindDatum;
	}

}