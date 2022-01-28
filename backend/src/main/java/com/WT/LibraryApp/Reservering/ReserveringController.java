package com.WT.LibraryApp.Reservering;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(maxAge = 3600)
public class ReserveringController {

	@Autowired
	private ReserveringService service;

	// Maakt een reservering aan als deze nog niet bestaat. Gebruikt in Reserveren.js
	@RequestMapping(method = RequestMethod.POST, value = "/maakreserveringaan")
	public Map<String, Object> maakReserveringAan(
			@RequestBody @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Reservering reservering) {
		Optional<Reservering> reserveringBestaat = service.vindReserveringMetPersoonEnBoek(reservering);
		if (reserveringBestaat.isPresent()) {
			return Collections.singletonMap("bestaat", reserveringBestaat.get());
		}
		return Collections.singletonMap("bestaatNiet", service.maakReserveringAan(reservering));
	}

	// Meerdere Reservering toepassen voor testen
	@RequestMapping(method = RequestMethod.POST, value = "/maakreserveringenaan")
	public List<Reservering> maakReserveringenAan(
			@RequestBody @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) List<Reservering> reserveringen) {

		List<Reservering> nieuweReserveringen = new ArrayList<>();
		for (Reservering reservering : reserveringen) {
			nieuweReserveringen.add(service.maakReserveringAan(reservering));
		}
		return nieuweReserveringen;

	}

	// Haalt informatie van alle reserveringen op met info over persoon en boek, via DTO. Gebruik in ReserveringTabel.js
    @RequestMapping(method = RequestMethod.GET, value = "/reserveringenPersoonBoek")
    public List<ReserveringPersoonBoekDTO> reserveringenPersoonBoek() {
        List <ReserveringPersoonBoekDTO> reserveringenPersoonBoek = service.alleReserveringenPersoonBoek();
        return reserveringenPersoonBoek;
    }

}
