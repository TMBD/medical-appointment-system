package com.cgm.nais.service;


import com.cgm.nais.dto.VisitDto;
import com.cgm.nais.entity.Patient;
import com.cgm.nais.entity.Visit;
import com.cgm.nais.repository.VisitRepository;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class VisitService {

    @Inject
    VisitRepository visitRepository;

    @Transactional
    public Visit addVisit(Visit visit){
        visitRepository.persist(visit);
        return visit;
    }

    @Transactional
    public Visit deleteVisit(long id){
        Visit visit = getVisitById(id);
        if(visit != null){
            visitRepository.delete(visit);
        }
        return visit;
    }

    @Transactional
    public Visit updateVisit(Visit visit, long id){
        Visit existingVisit = getVisitById(id);
        if(existingVisit != null){
            existingVisit.setDate(visit.getDate());
            existingVisit.setType(visit.getType());
            existingVisit.setReason(visit.getReason());
            existingVisit.setHistory(visit.getHistory());
            return existingVisit;
        }else return null;
    }


    public Visit getVisitById(long id){
        return visitRepository.findByIdOptional(id).orElse(null);
    }

    public List<Visit> getAllVisits(){
        return visitRepository.listAll();
    }

    public List<VisitDto> getPatientVisitsByPatientId(long patientId){
        List<Visit> visits = visitRepository.find("patient_id = ?1", patientId).list();
        List<VisitDto> visitsDto = new ArrayList<VisitDto>();
        for (Visit visit : visits) {
            visitsDto.add(new VisitDto(visit.getId(), visit.getDate(), visit.getType(), visit.getReason(), visit.getHistory()));
        }
        return  visitsDto;
    }
}
