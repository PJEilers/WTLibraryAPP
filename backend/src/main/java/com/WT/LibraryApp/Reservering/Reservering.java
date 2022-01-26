package com.WT.LibraryApp.Reservering;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.WT.LibraryApp.Boek.Boek;
import com.WT.LibraryApp.Persoon.Persoon;

@Entity
@Table(name = "reserveringen")
public class Reservering {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@ManyToOne(optional = false)
	Boek boek;
	
	@ManyToOne(optional = false)
	Persoon persoon;
	
	@Column(length = 100, nullable = false)
	private Date datum;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Boek getBoek() {
		return boek;
	}

	public void setBoek(Boek boek) {
		this.boek = boek;
	}

	public Persoon getPersoon() {
		return persoon;
	}

	public void setPersoon(Persoon persoon) {
		this.persoon = persoon;
	}

	public Date getDatum() {
		return datum;
	}

	public void setDatum(Date datum) {
		this.datum = datum;
	}

}
