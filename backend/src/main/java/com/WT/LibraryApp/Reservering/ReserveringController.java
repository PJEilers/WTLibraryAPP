package com.WT.LibraryApp.Reservering;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.WT.LibraryApp.Boek.BoekService;
import com.WT.LibraryApp.Persoon.PersoonService;

@RestController
@CrossOrigin(maxAge = 3600)
public class ReserveringController {

	@Autowired
	private ReserveringService service;

	@Autowired
	private PersoonService servicePersoon;

	@Autowired
	private BoekService serviceBoek;

	@RequestMapping("/reservering/{mijnid}") // werkt nog niet
	public Optional<Reservering> vindEentje(@PathVariable int mijnid) {
		return service.vindEentje(mijnid);
	}

	@RequestMapping(value = "/reserveringen")
	public List<Reservering> vind() {
		return service.vindAlleReserveringen();
	}

	@RequestMapping(method = RequestMethod.POST, value = "/maakreserveringaan") // nieuwe versie met datum, werkt als de
																				// string yyyy-mm-dd is
	public Map<String, Object> maakReserveringAan(
			@RequestBody @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Reservering reservering) {
		Optional<Reservering> reserveringBestaat = service.vindReserveringMetPersoonEnBoek(reservering);
		if (reserveringBestaat.isPresent()) {
			return Collections.singletonMap("bestaat", reserveringBestaat.get());
		}
		return Collections.singletonMap("bestaatNiet", service.maakReserveringAan(reservering));
	}

	/*
	 * @RequestMapping(method = RequestMethod.POST, value = "/maakreserveringaan")
	 * // oude versie met String public Reservering maakReserveringAan(@RequestBody
	 * Reservering reservering) { return service.maakReserveringAan(reservering); }
	 */

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

//	@RequestMapping(value = "/reserveringMetIds")
//	public Optional<Reservering> vindReserveringMetPersoonIdEnBoekId () {
//		return service.vindReserveringMetPersoonIdEnBoekId(reservering);
//	}

	@RequestMapping(value = "/reserveringMetPersoonEnBoek")
	public List<Map<String, Object>> vindReservering() {
		List<Reservering> reserveringen = service.vindAlleReserveringen();
		List<Map<String, Object>> reserveringArray = new ArrayList<>();
		for (Reservering reservering : reserveringen) {
			Map<String, Object> reserveringMap = new HashMap<>();

			// geef boekId, persoonId en datum mee naar frontend
			reserveringMap.put("boekId", reservering.getBoek().getId());
			reserveringMap.put("persoonId", reservering.getPersoon().getId());
			reserveringMap.put("datum", reservering.getDatum());

			// Persoon naam en email toevoegen
			reserveringMap.put("naam", reservering.getPersoon().getNaam());

			// Boek titel en auteur toevoegen
			reserveringMap.put("titel", reservering.getBoek().getTitel());
			reserveringMap.put("auteur", reservering.getBoek().getAuteur());

			reserveringArray.add(reserveringMap);

		}
		return reserveringArray;
	}

}
