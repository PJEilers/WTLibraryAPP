package com.WT.LibraryApp.Reservering;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(maxAge = 3600)
public class ReserveringController {
	
	@Autowired
	private ReserveringService service;
	
	// /persoon/1
	// /persoon/9999
	@RequestMapping("/persoon/{mijnid}")
	public Optional<Reservering> vindEentje(@PathVariable int mijnid) {
		return service.vindEentje(mijnid);
	}
	
	@RequestMapping(value = "/personen")
	public List<Reservering> vind() {
		return service.vindAllePersonen();
		
	}
	
	@RequestMapping(method = RequestMethod.POST, value = "/maakreserveringaan")
	public Reservering maakPersoonAan(@RequestBody Reservering reservering) {
		return service.maakPersoonAan(reservering);
	}

}
