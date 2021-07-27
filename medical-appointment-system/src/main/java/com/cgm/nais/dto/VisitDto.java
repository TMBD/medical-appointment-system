package com.cgm.nais.dto;

import com.cgm.nais.utils.VisitType;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.sql.Timestamp;

public class VisitDto {
    private Long id;
    private Timestamp date;
    private VisitType type;
    private String reason;
    private String history;
    public VisitDto(){}

    public VisitDto(Long id, Timestamp date, @NotBlank VisitType type, @NotBlank @Size(max = 50) String reason, @NotBlank @Size(max = 256) String history) {
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
}
