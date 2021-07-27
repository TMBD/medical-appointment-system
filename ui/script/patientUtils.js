/**
 * This file just contains all javaScipt stuff ralated to patient.
 * It just aggragate funtions that are used to process patient data
 * and then allows us to separate display from processing.
 */

//The base url of our api for everything related to patients
const baseUrl = "http://localhost:8080/api/v1/patients/"; 

/**
 * This funtion allow us to load all the patient data to the html table view.
 * It just fetch all the patients from the api and build the html table to display the data.
 */
function loadPatients(){
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
                    +"<th>Name</th>"
                    +"<th>Surname</th>"
                    +"<th>Birth date</th>"
                    +"<th>Social security number</th>"
                    +"<th colspan='3'>Actions</th>"
                +"</tr>";
                jsonData.forEach(element => {
                    tableContent += 
                    "<tr>"
                        +"<td>"+element.name+"</td>"
                        +"<td>"+element.surname+"</td>"
                        +"<td>"+element.birthDate+"</td>"
                        +"<td>"+element.ssn+"</td>"
                        +"<td><a href='updatePatient.html?id="+element.id+"'>Update</a></td>"
                        +"<td><a href='#'onClick=deletePatient("+element.id+")>Delete</a></td>"
                        +"<td><a href='patientVisits.html?id="+element.id+"&name="+element.name+"&surname="+element.surname+"'>See visits</a></td>"
                    +"</tr>"
                });
                
                let $patientTableHtmlDom = $("#patient-table");
                $patientTableHtmlDom.append(tableContent);
                
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
        }
    });

}


/**
 * This funtion just stand for deleting patient from the database.
 */
function deletePatient(id){
    let response = confirm("Do you really want to delete this user ?");
    if(response){
    $.ajax({
        url: baseUrl+id,
        type: 'DELETE',
        timeout: 5000,
        success: function(data) {
            location.reload();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("An error occured while trying to delete the user !");
        }
    });
    }
}

/**
 * This function is responsible for adding new patient to the database.
 * It just take all the fields from the formular and permform a HTTP call
 * with a POST method to the api resposible for saving new patients
 */
function handleNewPatient(){
    let name = $("#name").val();
    let surname = $("#surname").val();
    let birthDate = $("#birthDate").val();
    let ssn = $("#ssn").val();
    let patient = {
        name: name,
        surname: surname,
        birthDate: birthDate,
        ssn: ssn
    }
    $.ajax({
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json' 
        },
        url: baseUrl,
        dataType: "json",
        data: JSON.stringify(patient),
        type: 'POST',
        cache: false,
        timeout: 5000,
        success: function(data) {
            $("#name").val("");
            $("#surname").val("");
            $("#birthDate").val("");
            $("#ssn").val("");
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Error while adding the patient");
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}

/**
 * This methode is used to display patient data on the formular fields 
 * while updating patient so that the user can directy modify just the fields he want to change.
 */
function loadPatientData(){
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
                $("#name").val(jsonData.name);
                $("#surname").val(jsonData.surname);
                $("#birthDate").val(jsonData.birthDate);
                $("#ssn").val(jsonData.ssn);
                $("#id").val(jsonData.id);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
        }
    });
}

/**
 * This methode is called while updating patient. 
 * It just update the patient to the database according to the new patient data.
 */
function handleUpdatePatient(){
    let name = $("#name").val();
    let surname = $("#surname").val();
    let birthDate = $("#birthDate").val();
    let ssn = $("#ssn").val();
    let id = $("#id").val();
    let patient = {
        name: name,
        surname: surname,
        birthDate: birthDate,
        ssn: ssn,
        id: id
    }
    $.ajax({
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json' 
        },
        url: baseUrl+id,
        dataType: "json",
        data: JSON.stringify(patient),
        type: 'PUT',
        cache: false,
        timeout: 5000,
        success: function(data) {
            $("#name").val("");
            $("#surname").val("");
            $("#birthDate").val("");
            $("#ssn").val("");
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Error while updating the patient");
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}