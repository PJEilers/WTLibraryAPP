package com.WT.LibraryApp.Persoon;

// Wordt gebruikt om tegen te houden dat het encrypted password wordt teruggestuurd.
public class PersoonDTO {
	private int id;
	private String naam;
	private String email;
	private String role;

	
	
	public PersoonDTO(String naam, String email, String role, int id) {
		super();
		this.id = id;
		this.naam = naam;
		this.email = email;
		this.role = role;
	}

	public String getNaam() {
		return naam;
	}

	public void setNaam(String naam) {
		this.naam = naam;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}


}
