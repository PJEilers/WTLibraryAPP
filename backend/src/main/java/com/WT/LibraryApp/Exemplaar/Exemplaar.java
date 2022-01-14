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

	@Column(nullable = false)
	private int individueelId;

	@Column(nullable = true)
	private Integer uitleningId;

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

	public Integer getUitleningId() {
		return uitleningId;
	}

	public void setUitleningId(Integer uitleningId) {
		this.uitleningId = uitleningId;
	}

	public int getIndividueelId() {
		return individueelId;
	}

	public void setIndividueelId(int individueelId) {
		this.individueelId = individueelId;
	}

}
