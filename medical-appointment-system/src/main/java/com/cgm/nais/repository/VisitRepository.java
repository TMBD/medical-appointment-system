package com.cgm.nais.repository;

import com.cgm.nais.entity.Visit;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class VisitRepository implements PanacheRepository<Visit> {
}
