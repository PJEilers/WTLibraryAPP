package com.WT.LibraryApp.Persoon;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "persoon")
public class Persoon {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@Column(length = 100, nullable = false)
	private String naam;

	@Column(unique = true, length = 100, nullable = false)
	private String email;

	@Column(length = 100, nullable = false)
	private String wachtwoord;

	@Column(nullable = false)
	private Boolean adminRechten = false;

	@Column(nullable = false)
	private String role;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
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

	public String getWachtwoord() {
		return wachtwoord;
	}

	public void setWachtwoord(String wachtwoord) {
		this.wachtwoord = wachtwoord;
	}

	public Boolean getAdminRechten() {
		return adminRechten;
	}

	public void setAdminRechten(Boolean adminRechten) {
		this.adminRechten = adminRechten;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

}
