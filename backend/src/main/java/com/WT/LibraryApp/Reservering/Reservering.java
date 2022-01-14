package com.WT.LibraryApp.Reservering;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "reserveringen")
public class Reservering {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(length = 10, nullable = false)
	private int boekId;

	@Column(length = 10, nullable = false)
	private int persoonId;
	
	@Column(length = 100, nullable = false)
	private String datum;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getBoekId() {
		return boekId;
	}

	public void setBoekId(int boekId) {
		this.boekId = boekId;
	}

	public int getPersoonId() {
		return persoonId;
	}

	public void setPersoonId(int persoonId) {
		this.persoonId = persoonId;
	}

	public String getDatum() {
		return datum;
	}

	public void setDatum(String datum) {
		this.datum = datum;
	}

}
