package com.WT.LibraryApp.Exemplaar;

import java.util.List;

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

	public int bepaalIndividueelId(int boekId) {
		int hoeveelheid = countByBoekId(boekId);
		List<AlleenIndiviueleIds> individueleIds = vindBoekIndividueleIds(boekId);
		int individueelId = hoeveelheid + 1;
		
		// Check of er een lege Id beschikbaar is
		// Id start vanaf 1
		for (int i = 1; i < hoeveelheid + 1; i++) {
			if (individueleIds.contains(i)) {
				individueelId = i;
			}
		}
		
		return individueelId;
	}

	public List<AlleenIndiviueleIds> vindBoekIndividueleIds(int boekId) {
		return repository.findIndividueelIdByBoekId(boekId);
	}

}
