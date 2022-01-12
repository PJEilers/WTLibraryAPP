package com.WT.LibraryApp.Exemplaar;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "exemplaar")
public class Exemplaar {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@Column(nullable = false)
	private int boekId;

	@Column(nullable = true)
	private int reserveringId;

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

	public int getReserveringId() {
		return reserveringId;
	}

	public void setReserveringId(int reserveringId) {
		this.reserveringId = reserveringId;
	}


}
