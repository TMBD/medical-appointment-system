package com.cgm.nais.controller;

import com.cgm.nais.entity.Patient;
import com.cgm.nais.service.PatientService;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@ApplicationScoped
@Path("/v1/patients")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class PatientResource {

    @Inject
    private PatientService patientService;

    /**
     * @param patient the patient to add to the database
     * @return the new added patient
     */
    @POST
    @Path("")
    public Patient addPatient(Patient patient){
        return patientService.addPatient(patient);
    }

    /**
     * @param id the id of the patient we wanted to delete
     * @return http response based on the success of the operation
     */
    @DELETE
    @Path("/{id}")
    public Response deletePatient(@PathParam("id") long id){
        Patient patient = patientService.deletePatient(id);
        if(patient != null) return Response.status(Response.Status.OK).build();
        else return Response.status(Response.Status.NOT_FOUND).build();
    }

    /**
     * @param patient the new patient data
     * @param id the id of the patient stored in the database and that need to be updated
     * @return the updated patient
     */
    @PUT
    @Path("/{id}")
    public Patient updatePatient(Patient patient, @PathParam("id") long id){
        return patientService.updatePatient(patient, id);
    }

    /**
     * @return return all the patients
     */
    @GET
    @Path("")
    public List<Patient> getPatients(){
        return patientService.getAllPatients();
    }

    /**
     * @param id the unique id of the patient to retrieve
     * @return the patient whom id is provided as parameter
     */
    @GET
    @Path("/{id}")
    public Patient getPatient(@PathParam("id") long id){
        return patientService.getPatientById(id);
    }

}
