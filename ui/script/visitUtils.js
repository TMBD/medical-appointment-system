/**
 * This file just contains all javaScipt stuff ralated to visits.
 * It just aggragate funtions that are used to process patients visits data
 * and then allows us to separate display from processing.
 */

//The base url of our api for everything related to patients
const baseUrl = "http://localhost:8080/api/v1/visits/";

/**
 * This funtion allow us to load all the visits of a given patient to the html table view.
 * It just fetch all the patient visits from the api and build the html table to display the data.
 */
function loadVisits(){
    let searchParams = new URLSearchParams(window.location.search);
    let id = searchParams.get('id');
    let name = searchParams.get('name');
    let surname = searchParams.get('surname');
    $.ajax({
        url: baseUrl+"patient/"+id,
        dataType: "text",
        type: 'GET',
        timeout: 5000,
        success: function(data) {
            var jsonData = jQuery.parseJSON(data);
            if(jsonData != null){
                let tableContent = 
                "<tr>"
                    +"<th>Date</th>"
                    +"<th>type</th>"
                    +"<th>reason</th>"
                    +"<th>family history</th>"
                    +"<th colspan='2'>Actions</th>"
                +"</tr>";
                jsonData.forEach(element => {
                    tableContent += 
                    "<tr>"
                        +"<td>"+element.date+"</td>"
                        +"<td>"+element.type+"</td>"
                        +"<td>"+element.reason+"</td>"
                        +"<td>"+element.history+"</td>"
                        +"<td><a href='updateVisit.html?id="+element.id+"'>Update</a></td>"
                        +"<td><a href='#'onClick=deleteVisit("+element.id+")>Delete</a></td>"
                    +"</tr>"
                });
                let $visitTableHtmlDom = $("#visit-table");
                $visitTableHtmlDom.append(tableContent);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
        }
    });
    if(!surname) surname = "";
    if(!name) name = "";
    $("#titre-principal").html(surname+" "+name+" visits");
}

/**
 * This funtion allow us to load all the visit data to the html table view.
 * It just fetch all the visits from the api and build the html table to display the data.
 */
function loadAllVisits(){
    $.ajax({
        url: baseUrl,
        dataType: "text",
        type: 'GET',
        timeout: 5000,
        success: function(data) {
            var jsonData = jQuery.parseJSON(data);
            if(jsonData != null){
                let tableContent = 
                "<tr>"
                    +"<th>Date</th>"
                    +"<th>type</th>"
                    +"<th>reason</th>"
                    +"<th>family history</th>"
                    +"<th colspan='2'>Actions</th>"
                +"</tr>";
                jsonData.forEach(element => {
                    tableContent += 
                    "<tr>"
                        +"<td>"+element.date+"</td>"
                        +"<td>"+element.type+"</td>"
                        +"<td>"+element.reason+"</td>"
                        +"<td>"+element.history+"</td>"
                        +"<td><a href='updateVisit.html?id="+element.id+"'>Update</a></td>"
                        +"<td><a href='#'onClick=deleteVisit("+element.id+")>Delete</a></td>"
                    +"</tr>"
                });
                
                let $visitTableHtmlDom = $("#visit-table");
                $visitTableHtmlDom.append(tableContent);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
        }
    });
}

/**
 * This funtion just stand for deleting visit from the database.
 */
function deleteVisit(id){
    let response = confirm("Do you really want to delete this visit ?");
    if(response){
        $.ajax({
            url: baseUrl+id,
            type: 'DELETE',
            timeout: 5000,
            success: function(data) {
                location.reload();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert("An error occured while trying to delete the visit !");
            }
        });
    }
}

/**
 * Allow us to redirect the use the the page which allow him to add new visit 
 * by setting up the right url parameter for the patient id which allow to find the patient whom the visit belongs.
 */
function gotoNewVisitPage(){
    let searchParams = new URLSearchParams(window.location.search);
    let id = searchParams.get('id');
    window.location.href = "/addVisit.html?id="+id;
}


/**
 * This function is responsible for adding new visit to the database.
 * It just take all the fields from the formular and permform a HTTP call
 * with a POST method to the api resposible for saving new visits.
 */
function handleNewVisit(){
    let searchParams = new URLSearchParams(window.location.search);
    let id = searchParams.get('id');
    let patient = null;
    $.ajax({
        url: "http://localhost:8080/api/v1/patients/"+id,
        dataType: "text",
        type: 'GET',
        timeout: 5000,
        success: function(data) {
            var jsonData = jQuery.parseJSON(data);
            if(jsonData != null){
                patient = jsonData;
                let date = $("#date").val().split("T");
                date = date[0]+" "+date[1];
                let type = $("#type").find(":selected").val();;
                let reason = $("#reason").val();
                let history = $("#history").val();
                let visit = {
                    date: date,
                    type: type,
                    reason: reason,
                    history: history,
                    patient: patient
                }
                $.ajax({
                    headers: { 
                        'Accept': 'application/json',
                        'Content-Type': 'application/json' 
                    },
                    url: baseUrl,
                    dataType: "json",
                    data: JSON.stringify(visit),
                    type: 'POST',
                    cache: false,
                    timeout: 5000,
                    success: function(data) {
                        $("#date").val("");
                        $("#reason").val("");
                        $("#history").val("");
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        alert("Error while adding the visit");
                        console.log(jqXHR);
                        console.log(textStatus);
                        console.log(errorThrown);
                    }
                });
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
        }
    });
}

/**
 * This methode is used to display visit data on the formular fields 
 * while updating visit so that the user can directy modify just the fields he want to change.
 */
function loadVisitData(){
    let searchParams = new URLSearchParams(window.location.search);
    let id = searchParams.get('id');
    $.ajax({
        url: baseUrl+id,
        dataType: "text",
        type: 'GET',
        timeout: 5000,
        success: function(data) {
            var jsonData = jQuery.parseJSON(data);
            if(jsonData != null){
                let tempDate = jsonData.date.split(" ");
                $("#date").val(tempDate[0]+"T"+tempDate[1]);
                $("#type").val(jsonData.type);
                $("#reason").val(jsonData.reason);
                $("#history").val(jsonData.history);
                $("#id").val(jsonData.id);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
        }
    });
}

/**
 * This methode is called while updating a visit. 
 * It just update the visi to the database according to the new visit data.
 */
function handleUpdateVisit(){
    let date = $("#date").val().split("T");
    date = date[0]+" "+date[1];
    let type = $("#type").find(":selected").val();;
    let reason = $("#reason").val();
    let history = $("#history").val();
    let id = $("#id").val();
    let visit = {
        date: date,
        type: type,
        reason: reason,
        history: history,
        id: id
    }
    $.ajax({
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json' 
        },
        url: baseUrl+id,
        dataType: "json",
        data: JSON.stringify(visit),
        type: 'PUT',
        cache: false,
        timeout: 5000,
        success: function(data) {
            $("#date").val("");
            $("#reason").val("");
            $("#history").val("");
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Error while updating the visit");
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}