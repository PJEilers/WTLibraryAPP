package com.WT.LibraryApp.Boek;

public class BoekenDTO {
	private int id;
	private String titel;
	private String auteur;
	private String isbn;
	private String tags;
	private int exemplarenTotaal;
	private int beschikbaar;
	private int hoeveeluitleningen;
	
	// Constructor
	public BoekenDTO(Boek boek, int exemplarenTotaal,
			int beschikbaar, int hoeveeluitleningen) {
		super();
		this.id = boek.getId();
		this.titel = boek.getTitel();
		this.auteur = boek.getAuteur();
		this.isbn = boek.getIsbn();
		this.tags = boek.tags;
		this.exemplarenTotaal = exemplarenTotaal;
		this.beschikbaar = beschikbaar;
		this.hoeveeluitleningen = hoeveeluitleningen;
	}
	
	
	
}
