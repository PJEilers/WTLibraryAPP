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
	private int boek_id;

	@Column(nullable = true)
	private int reservering_id;

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

	public int getReservering_id() {
		return reservering_id;
	}

	public void setReservering_id(int reservering_id) {
		this.reservering_id = reservering_id;
	}

}
