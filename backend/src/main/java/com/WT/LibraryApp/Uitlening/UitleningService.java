package com.WT.LibraryApp.Uitlening;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.WT.LibraryApp.Exemplaar.Exemplaar;

@Service
public class UitleningService {

	@Autowired
	private IUitleningRepository repository;

	public Optional<Uitlening> vindUitleeningMetId(int id) {
		return repository.findById(id);
	}

	public List<Uitlening> vindAlleUitleningen() {
		List<Uitlening> uitleningen = repository.findAll();
		return uitleningen;
	}

	public Uitlening maakUitleningAan(Uitlening uitlening) {
		return repository.save(uitlening);
	}
	
	// Dit telt alle exemplaren die zijn uitgeleend. Gebruikt voor tellen van een bepaald boek.
	public int countUitleningMetExemplaren(List<Exemplaar> exemplaren) {
		int countUitleningen = 0;
		for (Exemplaar exemplaar:exemplaren) {
			countUitleningen += repository.countByExemplaar(exemplaar);
		}
		return countUitleningen;
	}
	
	public List<Uitlening> vindUitleningenMetPersoon(int persoonId) {
		return repository.findByPersoonId(persoonId);
	}

	public void updateEindDatum(int exemplaarid) {
		Uitlening u = repository.findByExemplaarIdAndEindDatum(exemplaarid, null).get();
		long millis = System.currentTimeMillis();
		Date eindDatum = new Date(millis);
		repository.getById(u.getId()).setEindDatum(eindDatum);
		repository.save(u);
	}

}
