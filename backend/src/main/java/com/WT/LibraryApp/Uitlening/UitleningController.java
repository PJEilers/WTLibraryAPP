package com.WT.LibraryApp.Uitlening;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(maxAge = 3600)
public class UitleningController {
	@Autowired
	private UitleningService service;

	@RequestMapping("/uitlening/{mijnid}") // werkt nog niet
	public Optional<Uitlening> vindEentje(@PathVariable int mijnid) {
		return service.vindEentje(mijnid);
	}

//	@RequestMapping("/vindexemplaar/{exemplaarid}") // werkt nog niet
//	public Uitlening vindExemplaar(@PathVariable int exemplaarid) {
//		return service.vindExemplaar(exemplaarid);
//	}
//	
	@RequestMapping(value = "/uitleningen")
	public List<Uitlening> vind() {
		return service.vindAlleUitleningen();
	}
	
	@RequestMapping(method = RequestMethod.POST, value = "/maakuitleningaan") // Werkt als de string yyyy-mm-dd is
	public Uitlening maakUitleningAan(@RequestBody
			@DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Uitlening uitlening){
		return service.maakUitleningAan(uitlening);
	}

	// Werkt als de string yyyy-mm-dd is
	@RequestMapping(method = RequestMethod.POST, value = "/maakuitleningenaan")
	public List<Uitlening> maakUitleningenAan(@RequestBody @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) List<Uitlening> uitleningen) {
		List<Uitlening> opgeslagenUitleningen = new ArrayList<>();
		for (Uitlening uitlening: uitleningen) {
			opgeslagenUitleningen.add(service.maakUitleningAan(uitlening));
		}
		return opgeslagenUitleningen;
	}
}
