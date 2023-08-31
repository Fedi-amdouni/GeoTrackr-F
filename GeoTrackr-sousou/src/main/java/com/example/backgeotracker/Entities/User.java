package com.example.backgeotracker.Entities;

import jakarta.persistence.*;

@Entity
@Table(name="user")
public class User {
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private Long id;
    @Column(name = "nom")
    private String nom;
    @Column(name = "prenom")
    private String prenom;

    public void setId(Long id) {
        this.id = id;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Long getId() {
        return id;
    }

    public String getNom() {
        return nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public String getEmail() {
        return email;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getRole() {
        return role;
    }
    @Column(name = "email")
    private String email;


    @Column(name = "username")
    private String username;
    @Column(name = "password")
    private String password;
    @Column(name = "role")
    private String role;


}
