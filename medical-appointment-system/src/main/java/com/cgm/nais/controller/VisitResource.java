package com.cgm.nais.controller;

import com.cgm.nais.dto.VisitDto;
import com.cgm.nais.entity.Visit;
import com.cgm.nais.service.VisitService;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@ApplicationScoped
@Path("/v1/visits")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class VisitResource {

    @Inject
    private VisitService visitService;

    /**
     * @param visit the visit to add to the database
     * @return the new add visit object
     */
    @POST
    @Path("")
    public Visit addVisit(Visit visit){
        return visitService.addVisit(visit);
    }

    /**
     * @param id the id of the visit we want to delete
     * @return http response based on the success of the operation
     */
    @DELETE
    @Path("/{id}")
    public Response deleteVisit(@PathParam("id") long id){
        Visit visit = visitService.deleteVisit(id);
        if(visit != null) return Response.status(Response.Status.OK).build();
        else return Response.status(Response.Status.NOT_FOUND).build();
    }

    /**
     * @param visit the new visit data
     * @param id id the id of the visit stored in the database and that need to be updated
     * @return the updated visit
     */
    @PUT
    @Path("/{id}")
    public Visit updateVisit(Visit visit, @PathParam("id") long id){
        return visitService.updateVisit(visit, id);
    }

    /**
     * @return all visits
     */
    @GET
    @Path("")
    public List<Visit> getVisits(){
        return visitService.getAllVisits();
    }

    /**
     * @param id the unique id of the visit to retrieve
     * @return the visit whom id is provided as parameter
     */
    @GET
    @Path("/{id}")
    public Visit getVisit(@PathParam("id") long id){
        return visitService.getVisitById(id);
    }

    /**
     * @param patientId the id of the patient
     * @return all the visits of the patient whom id is provided as parameter
     */
    @GET
    @Path("/patient/{patientId}")
    public List<VisitDto> getPatientVisits(@PathParam("patientId") long patientId){
        return visitService.getPatientVisitsByPatientId(patientId);
    }


}
