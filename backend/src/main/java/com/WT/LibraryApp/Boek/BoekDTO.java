package com.WT.LibraryApp.Boek;

// Dit is een Data Transfer Object(DTO) dat in zijn geheel word gestuurd naar de frontend.
public class BoekDTO {
	private int id;
	private String titel;
	private String auteur;
	private String isbn;
	private String tags;
	private int exemplarenTotaal;
	private int beschikbaar;
	private int hoeveeluitleningen;
	
	// Constructor, zodat je niet alles apart moet gaan invullen.
	public BoekDTO(Boek boek, int exemplarenTotaal,
			int beschikbaar, int hoeveeluitleningen) {
		super();
		this.id = boek.getId();
		this.titel = boek.getTitel();
		this.auteur = boek.getAuteur();
		this.isbn = boek.getIsbn();
		this.tags = boek.getTags();
		this.exemplarenTotaal = exemplarenTotaal;
		this.beschikbaar = beschikbaar;
		this.hoeveeluitleningen = hoeveeluitleningen;
	}

	// Getters and Setters, nodig voor goed laten werken.
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
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

	public String getIsbn() {
		return isbn;
	}

	public void setIsbn(String isbn) {
		this.isbn = isbn;
	}

	public String getTags() {
		return tags;
	}

	public void setTags(String tags) {
		this.tags = tags;
	}

	public int getExemplarenTotaal() {
		return exemplarenTotaal;
	}

	public void setExemplarenTotaal(int exemplarenTotaal) {
		this.exemplarenTotaal = exemplarenTotaal;
	}

	public int getBeschikbaar() {
		return beschikbaar;
	}

	public void setBeschikbaar(int beschikbaar) {
		this.beschikbaar = beschikbaar;
	}

	public int getHoeveeluitleningen() {
		return hoeveeluitleningen;
	}

	public void setHoeveeluitleningen(int hoeveeluitleningen) {
		this.hoeveeluitleningen = hoeveeluitleningen;
	}
	
}
