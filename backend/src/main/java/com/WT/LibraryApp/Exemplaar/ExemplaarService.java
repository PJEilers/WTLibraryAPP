package com.WT.LibraryApp.Exemplaar;

import java.util.ArrayList;
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

	public int bepaalIndividueelId(int boekId, List<Integer> gebruikteIds) {
		int hoeveelheid = countByBoekId(boekId);
		List<Integer> individueleIds = vindBoekIndividueleIds(boekId);
		int individueelId = hoeveelheid + 1;
		
		// Check of er een lege plek is
		int index = 0;
		for (Integer eenId: individueleIds) {
			index++;
			if (!individueleIds.contains(index)) {
				if (!gebruikteIds.contains(index)) {
					individueelId = index;
					return individueelId;
				}
			}			 
		}
		
		
		return individueelId;
	}

	public List<Integer> vindBoekIndividueleIds(int boekId) {
		List<Exemplaar> exemplaren = repository.findByBoekId(boekId);
		List<Integer> individueleIds = new ArrayList<Integer>();
		for (Exemplaar exemplaar: exemplaren) {
			individueleIds.add(exemplaar.getIndividueelId());
		}
		return individueleIds;
	}

}
