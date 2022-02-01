package com.WT.LibraryApp.jwt.resource;

import java.io.Serializable;

public class JwtTokenResponse implements Serializable {

	private static final long serialVersionUID = 8317676219297719109L;

	private final String token;
	private final long id;
	private final String role;

	public JwtTokenResponse(String token, long id, String role) {
		this.token = token;
		this.id = id;
		this.role = role;
	}

	public String getToken() {
		return this.token;
	}

	public long getId() {
		return this.id;
	}

	public String getRole() {
		return role;
	}

}