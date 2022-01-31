package com.WT.LibraryApp.Uitlening;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.WT.LibraryApp.Exemplaar.Exemplaar;
import com.WT.LibraryApp.Persoon.Persoon;

@Entity
@Table(name = "uitleningen")
public class Uitlening {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@ManyToOne(optional = false)
	Exemplaar exemplaar;

	@ManyToOne(optional = false)
	Persoon persoon;

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

	public Exemplaar getExemplaar() {
		return exemplaar;
	}

	public void setExemplaar(Exemplaar exemplaar) {
		this.exemplaar = exemplaar;
	}

	public Persoon getPersoon() {
		return persoon;
	}

	public void setPersoon(Persoon persoon) {
		this.persoon = persoon;
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