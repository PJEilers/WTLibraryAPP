package com.WT.LibraryApp.Exemplaar;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


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

	public int countByBoekId(int boekid) {
		return repository.countByBoekId(boekid);
	}

	public int countBeschikbaar(int boekid) {
		return repository.countByBoekIdAndUitleningIdIsNull(boekid);
	}

	// Hierbij wordt aangenomen dat er geen exemplaren worden verwijderd maar dat de status dan wordt aangepast
	public int bepaalIndividueelId(int boekId) {
		int hoeveelheid = countByBoekId(boekId);
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
			return exemplaar.getBoekId();
		}
		return 0;
	}
}
