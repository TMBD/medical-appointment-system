package com.cgm.nais.entity;

import com.cgm.nais.utils.VisitType;
import com.fasterxml.jackson.annotation.JsonFormat;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.sql.Timestamp;

@Entity
public class Visit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "date", nullable = false)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private Timestamp date;

    @Column(name = "type", nullable = false)
    @NotBlank
    private VisitType type;

    @Column(name = "reason", nullable = false)
    @NotBlank
    @Size(max = 50)
    private String reason;

    @Column(name = "history", nullable = false)
    @NotBlank
    @Size(max = 256)
    private String history;

    @ManyToOne(fetch = FetchType.EAGER)
    private Patient patient;

    public Visit(){}

    public Visit(Long id, Timestamp date, @NotBlank VisitType type, @NotBlank @Size(max = 50) String reason, @NotBlank @Size(max = 256) String history) {
        this.id = id;
        this.date = date;
        this.type = type;
        this.reason = reason;
        this.history = history;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Timestamp getDate() {
        return date;
    }

    public void setDate(Timestamp date) {
        this.date = date;
    }

    public VisitType getType() {
        return type;
    }

    public void setType(VisitType type) {
        this.type = type;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getHistory() {
        return history;
    }

    public void setHistory(String history) {
        this.history = history;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }
}
