package com.WT.LibraryApp;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class BcryptEncoderTest {

	public static void main(String[] args) {
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		String encodedString = encoder.encode("password");
		System.out.println(encodedString);
		//$2a$10$OwBwyhaQDZxm0ThSCkce9OhGp5EPboVZ7cO.4j0oRjpynNLLV.mjS

	}

}
