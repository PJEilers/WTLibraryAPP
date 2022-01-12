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
	private int boek_id;

	@Column(length = 10, nullable = false)
	private int persoon_id;
	
	@Column(length = 100, nullable = false)
	private String datum;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getBoek_id() {
		return boek_id;
	}

	public void setBoek_id(int boek_id) {
		this.boek_id = boek_id;
	}

	public int getPersoon_id() {
		return persoon_id;
	}

	public void setPersoon_id(int persoon_id) {
		this.persoon_id = persoon_id;
	}

	public String getDatum() {
		return datum;
	}

	public void setDatum(String datum) {
		this.datum = datum;
	}

}
