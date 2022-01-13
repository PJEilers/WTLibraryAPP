package com.WT.LibraryApp.Exemplaar;

public class ExemplaarStatus{
	
	private boolean status;
	private Exemplaar exemplaar;
	
	public ExemplaarStatus(boolean status, Exemplaar exemplaar) {
		super();
		this.status = status;
		this.exemplaar = exemplaar;
	}

	public boolean isStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

	public Exemplaar getExemplaar() {
		return exemplaar;
	}

	public void setExemplaar(Exemplaar exemplaar) {
		this.exemplaar = exemplaar;
	}
	
	
	
}
