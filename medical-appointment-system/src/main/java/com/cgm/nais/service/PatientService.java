package com.cgm.nais.service;

import com.cgm.nais.entity.Patient;
import com.cgm.nais.repository.PatientRepository;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import java.util.List;

@ApplicationScoped
public class PatientService {

    @Inject
    PatientRepository patientRepository;

    @Transactional
    public Patient addPatient(Patient patient){
        patientRepository.persist(patient);
        return patient;
    }

    @Transactional
    public Patient deletePatient(long id){
        Patient patient = getPatientById(id);
        if(patient != null){
            patientRepository.delete(patient);
        }
        return patient;
    }

    @Transactional
    public Patient updatePatient(Patient patient, long id){
        Patient existingPatient = getPatientById(id);
        if(existingPatient != null){
            existingPatient.setName(patient.getName());
            existingPatient.setSurname(patient.getSurname());
            existingPatient.setBirthDate(patient.getBirthDate());
            existingPatient.setSsn(patient.getSsn());
            patientRepository.persist(existingPatient);
            return existingPatient;
        }else return null;
    }

    public Patient getPatientById(long id){
        return patientRepository.findByIdOptional(id).orElse(null);
    }

    public List<Patient> getAllPatients(){
        return patientRepository.listAll();
    }
}
