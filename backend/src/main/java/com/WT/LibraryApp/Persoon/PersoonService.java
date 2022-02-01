package com.WT.LibraryApp.Persoon;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

// De implements UserDetailsService zorgt ervoor dat je de koppeling kunt maken met JWT.
@Service
public class PersoonService implements UserDetailsService {

	@Autowired
	private IPersoonRepository repository;

	private BCryptPasswordEncoder bcryptEncoder = new BCryptPasswordEncoder();

	public PersoonDTO maakPersoonAan(Persoon persoon) {
		String wachtwoord = persoon.getWachtwoord();
		persoon.setWachtwoord(bcryptEncoder.encode(wachtwoord));
		persoon.setLocked(false);
		persoon.setUitDienst(false);
		repository.save(persoon);
		PersoonDTO persoonDTO = new PersoonDTO(persoon.getNaam(), persoon.getEmail(), persoon.getRole(),
				persoon.getId());

		return persoonDTO;
	}

	public List<PersoonDTO> vindAllePersonen() {
		List<Persoon> personen = repository.findAll();
		List<PersoonDTO> personenDTO = new ArrayList<>();
		for (Persoon persoon : personen) {
			personenDTO.add(new PersoonDTO(persoon.getNaam(), persoon.getEmail(), persoon.getRole(), persoon.getId()));
		}
		return personenDTO;

	}

	public Optional<Persoon> vindPersoon(int id) {
		return repository.findById(id);
	}

	public int vindPersoonIdEmail(String email) {
		Optional<Persoon> persoon = repository.findByEmail(email);
		if (persoon.isPresent()) {
			return persoon.get().getId();
		} else {
			throw new UsernameNotFoundException("Persoon niet gevonden met email: " + email);
		}
	}

	public Optional<Persoon> login(LoginForm loginform) {
		return repository.findByEmailAndWachtwoord(loginform.getEmail(), loginform.getWachtwoord());
	}

	public Optional<Persoon> vindPersoonEmail(String email) {
		return repository.findByEmail(email);
	}

	// Dit maakt de koppeling tussen onze database en de JWT implementatie
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		Optional<Persoon> persoon = repository.findByEmail(email);
		List<SimpleGrantedAuthority> authorities = new ArrayList<SimpleGrantedAuthority>();

		if (persoon.isPresent()) {
			authorities.add(new SimpleGrantedAuthority(persoon.get().getRole()));
			return new org.springframework.security.core.userdetails.User(persoon.get().getEmail(),
					persoon.get().getWachtwoord(), authorities);
		} else {
			throw new UsernameNotFoundException("Persoon niet gevonden met email: " + email);
		}
	}

	// Haal de uitdienst status op van een persoon
	public boolean vindPersoonUitDienst(String email) {
		Optional<Persoon> persoon = repository.findByEmail(email);
		return persoon.get().getUitDienst();
	}

	public String vindPersoonRoleEmail(String email) {
		Optional<Persoon> persoon = repository.findByEmail(email);
		if (persoon.isPresent()) {
			return persoon.get().getRole();
		} else {
			throw new UsernameNotFoundException("Persoon niet gevonden met email: " + email);
		}
	}

	// Verwijdert persoonsgegevens en verandert deze in placeholders
	public void uitDienst(int persoonId) {
		Persoon persoon = repository.getById(persoonId);
		persoon.setNaam("Uit dienst");
		persoon.setEmail("Geen info voor persoon Id " + persoonId);
		persoon.setUitDienst(true);
		repository.save(persoon);
	}

}
