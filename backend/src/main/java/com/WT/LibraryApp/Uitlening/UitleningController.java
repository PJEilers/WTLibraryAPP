package com.WT.LibraryApp.Uitlening;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.WT.LibraryApp.Exemplaar.Exemplaar.Status;
import com.WT.LibraryApp.Exemplaar.ExemplaarService;

@RestController
@CrossOrigin(maxAge = 3600)
public class UitleningController {

	@Autowired
	private UitleningService service;

	//Nodig voor Status update
	@Autowired
	private ExemplaarService exemplaarService;

	// Maakt een uitlening aan en zet de status van het exemplaar naar uitgeleend. Gebruikt in UitleningToevoegen.js, Constanten.js -> PersoonInformatie.js?, ExemplaarInformatie.js
	@RequestMapping(method = RequestMethod.POST, value = "/maakuitleningaan")
	public Uitlening maakUitleningAan(@RequestBody @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Uitlening uitlening) {
		// Status moet via ExemplaarService worden aangepast naar Uitgeleend:
		exemplaarService.updateStatus(uitlening.getExemplaar().getId(), Status.UITGELEEND);
		return service.maakUitleningAan(uitlening);
	}

	// Meerdere utileningen aanmaken voor testen
	@RequestMapping(method = RequestMethod.POST, value = "/maakuitleningenaan")
	public List<Uitlening> maakUitleningenAan(
			@RequestBody @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) List<Uitlening> uitleningen) {
		List<Uitlening> opgeslagenUitleningen = new ArrayList<>();

		for (Uitlening uitlening : uitleningen) {
			opgeslagenUitleningen.add(service.maakUitleningAan(uitlening));
			exemplaarService.updateStatus(uitlening.getExemplaar().getId(), Status.UITGELEEND);
		}

		return opgeslagenUitleningen;
	}

	// Haalt alle informatie van uitleningen op. Gebruikt in UitleenHistorie.js
	@RequestMapping(value = "/historie")
	public List<Map<String, Object>> uitleenHistorie() {
		List<Uitlening> uitleningen = service.vindAlleUitleningen();
		List<Map<String, Object>> output = new ArrayList<Map<String, Object>>();
		for (Uitlening uitlening : uitleningen) {
			Map<String, Object> map = new HashMap<>();
			map.put("id", uitlening.getId());
			map.put("beginDatum", uitlening.getBeginDatum());
			map.put("eindDatum", uitlening.getEindDatum());
			map.put("persoon", uitlening.getPersoon().getNaam());
			map.put("exemplaarId", uitlening.getExemplaar().getIndividueelId());
			map.put("boekId", uitlening.getExemplaar().getBoek().getId());
			output.add(map);
		}

		return output;
	}
}
