package com.WT.LibraryApp.Exemplaar;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.WT.LibraryApp.Boek.Boek;
import com.WT.LibraryApp.Exemplaar.Exemplaar.Status;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class ExemplaarService {

	@Autowired
	private IExemplaarRepository repository;
	
	public Optional<Exemplaar> vindExemplaarOpId(int id) {
		return repository.findById(id);
	}

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
		Exemplaar e = repository.getById(id);
		repository.save(e);
	}

	// Hierbij wordt aangenomen dat er geen exemplaren worden verwijdert maar dat de status dan wordt aangepast

	public int bepaalIndividueelId(Boek boek) {
		int hoeveelheid = countByBoek(boek);
		return hoeveelheid + 1;
	}

	public List<Integer> vindBoekIndividueleIds(int boekId) {
		List<Exemplaar> exemplaren = repository.findByBoekId(boekId);
		List<Integer> individueleIds = new ArrayList<Integer>();
		for (Exemplaar exemplaar : exemplaren) {
			individueleIds.add(exemplaar.getIndividueelId());
		}
		return individueleIds;
	}
	
	public int vindIndividueelId(int id) {
		Optional<Exemplaar> optionalExemplaar = repository.findById(id);
		if (optionalExemplaar.isPresent()) {
			Exemplaar exemplaar = optionalExemplaar.get();
			return exemplaar.getIndividueelId();
		}
		return 0;
	}
	
	public int vindBoekId(int id) {
		Optional<Exemplaar> optionalExemplaar = repository.findById(id);
		if (optionalExemplaar.isPresent()) {
			Exemplaar exemplaar = optionalExemplaar.get();
			return exemplaar.getBoek().getId();
		}
		return 0;
	}

}
