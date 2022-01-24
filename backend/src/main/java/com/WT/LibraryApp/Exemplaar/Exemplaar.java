package com.WT.LibraryApp.Exemplaar;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.WT.LibraryApp.Boek.Boek;

@Entity
@Table(name = "exemplaar")
public class Exemplaar {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@ManyToOne
	private Boek boek;

	@Column(nullable = false)
	private int individueelId;

	@Column
	@Enumerated(EnumType.STRING)
	private Status status;
	
	public enum Status {
		BESCHIKBAAR,
		UITGELEEND,
		ONBRUIKBAAR
	}
	
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

	public int getIndividueelId() {
		return individueelId;
	}

	public void setIndividueelId(int individueelId) {
		this.individueelId = individueelId;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}	

}
