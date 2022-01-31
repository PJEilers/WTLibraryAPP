//package com.WT.LibraryApp.jwt;
//
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Optional;
//
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.stereotype.Service;
//
//import com.WT.LibraryApp.Persoon.Persoon;
//import com.WT.LibraryApp.Persoon.PersoonService;
//
////Om gebruik te maken van users moet je een implementation geven van UserDetailsService.
////Dat is hier gedaan.
//
//// Wanneer Spring informatie van een user wil wordt dit aangeroepen.
//@Service
//public class JwtInMemoryUserDetailsService implements UserDetailsService {
//	
//	private PersoonService persoonService;
//
//  static List<JwtUserDetails> inMemoryUserList = new ArrayList<>();
//
//  // Hier worden de user en password gemaakt (dummy).
//  /*TODO*/
////  static {
////    inMemoryUserList.add(new JwtUserDetails(1L, "in28minutes@test.com",
////        "$2a$10$3zHzb.Npv1hfZbLEU5qsdOju/tk2je6W6PnNnY.c1ujWPcZh4PL6e", "ROLE_USER_2"));
////  }
//
//  @Override
//  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//    Optional<JwtUserDetails> findFirst = inMemoryUserList.stream()
//        .filter(user -> user.getUsername().equals(username)).findFirst();
//
//    if (!findFirst.isPresent()) {
//      throw new UsernameNotFoundException(String.format("USER_NOT_FOUND '%s'.", username));
//    }
//
//    return findFirst.get();
//  }
//  
//  public List<JwtUserDetails> personenOphalen() {
//	  static List<JwtUserDetails> personenLijst = new ArrayList<>();
//	  List<Persoon> personen = persoonService.vindAllePersonen();
//	  for(Persoon persoon: personen) {
//		  String persoonRol;
//		  if (persoon.getAdminRechten()) {
//			  persoonRol = "ROLE_ADMIN";
//		  } else {
//			  persoonRol = "ROLE_GEBRUIKER";
//		  }
//		  personenLijst.add((long) persoon.getId(), persoon.getEmail(), encodepassword(persoon.getWachtwoord()), persoonRol);
//	  }
//  }
//  
//  public String encodepassword(String password) {
//	  BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
//	  return encoder.encode(password);
//  }
//
//}
//
//
