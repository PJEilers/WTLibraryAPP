package com.WT.LibraryApp.Reservering;

import java.sql.Date;

import com.WT.LibraryApp.Boek.Boek;
import com.WT.LibraryApp.Persoon.Persoon;

// Data Transfer Object (DTO) om naar de frontend te sturen
public class ReserveringPersoonBoekDTO {
	// State
	int id;
	int boekId;
	int persoonId;
	Date datum;
	String naam;
	String titel;
	String auteur;
	
	// Constructor
	public ReserveringPersoonBoekDTO(Reservering reservering, Persoon persoon, Boek boek) {
		this.id = reservering.getId();
		this.datum = reservering.getDatum();
		this.persoonId = persoon.getId();
		this.naam = persoon.getNaam();	
		this.boekId = boek.getId();
		this.titel = boek.getTitel();
		this.auteur = boek.getAuteur();
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

	// Getters en setters
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public Date getDatum() {
		return datum;
	}
	public void setDatum(Date datum) {
		this.datum = datum;
	}
	public String getNaam() {
		return naam;
	}
	public void setNaam(String naam) {
		this.naam = naam;
	}
	public String getTitel() {
		return titel;
	}
	public void setTitel(String titel) {
		this.titel = titel;
	}
	public String getAuteur() {
		return auteur;
	}
	public void setAuteur(String auteur) {
		this.auteur = auteur;
	}

}
