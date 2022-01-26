package com.WT.LibraryApp.Exemplaar;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.WT.LibraryApp.Boek.Boek;
import com.WT.LibraryApp.Exemplaar.Exemplaar.Status;


@Service
public class ExemplaarService {

	@Autowired
	private IExemplaarRepository repository;

	public Exemplaar maakExemplaarAan(Exemplaar exemplaar) {
		return repository.save(exemplaar);
	}

	public List<Exemplaar> vindAlleExemplaren() {
		return repository.findAll();
	}

	public void opslaanExemplaar(Exemplaar exemplaar) {
		repository.save(exemplaar);
	}

	public List<Exemplaar> vindBoekExemplaren(int boekid) {
		return repository.findByBoekId(boekid);
	}

	public int countByBoek(Boek boek) {
		return repository.countByBoek(boek);
	}

	public int countBeschikbaar(Boek boek) {
		return repository.countByBoekAndStatus(boek, Status.BESCHIKBAAR);
	}

	public void updateStatus(int id, Status status) {
		repository.getById(id).setStatus(status);
	}

}
