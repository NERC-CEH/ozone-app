<ul class="table-view accordion" id="accordion">
  <li class="table-view-divider"><%= t("Records") %></li>
  <li class="table-view-cell">
    <a class="collapsed" data-toggle="collapse" data-parent="#accordion"
       href="#c1" aria-expanded="false" aria-controls="c1">
      <span class="icon icon-collapse pull-left"></span>
      <%= t("How to make a new record") %>
    </a>
    <p id="c1" class="collapse" aria-labelledby="headingOne" aria-expanded="false">
      <%= t("Please press the Record Ozone Injury") %> 
      <span class="icon icon-plus"></span> 
      <%= t("button on the home page. This will bring you to the recording form where you should fill in the details of the sighting. Tap the camera icon at the bottom of the screen to add a photo. Please add two photos, a close up of the injury and another of the plant in its surroundings.") %>
      <br><br>
      <%= t("When finished, set for submission by pressing the paper plane") %>
      <span class="icon icon-send"></span> 
      <%= t("button.") %>
      <br><br>
      <%= t("You will then be taken to your record list. You can also add a record from here by pressing the plus button in the header") %>
      <span class="icon icon-plus"></span>.
    </p>
  </li>
  <li class="table-view-cell">
    <a class="collapsed" data-toggle="collapse" data-parent="#accordion"
       href="#c2" aria-expanded="false" aria-controls="c2">
      <span class="icon icon-collapse pull-left"></span>
      <%= t("Searching for species") %>
    </a>
    <p id="c2" class="collapse" aria-labelledby="headingOne" aria-expanded="false">
      <%= t("The application has a list of the species you are most likely to record, organised in a logical hierarchy. If the species you are recording is not listed, pick the 'Other' option for the relevant vegetation category. A text box appears in which you can type the species name.") %>
    </p>
  </li>
  <li class="table-view-cell">
    <a class="collapsed" data-toggle="collapse" data-parent="#accordion"
       href="#c25" aria-expanded="false" aria-controls="c25">
      <span class="icon icon-collapse pull-left"></span>
      <%= t("Sensitive records") %>
    </a>
    <p id="c25" class="collapse" aria-labelledby="heading One" aria-expanded="false">
      <%= t("In some cases, an app user may not want to give the exact location of where ozone injury has been seen. When filling in your record of ozone injury, it is possible to mask the location by clicking on the Sensitive button on the Location page of the recording form. The record is submitted accurately but treated in confidence. Any listing of records that is publicly visible will truncate coordinates of those marked sensitive e.g. 47.42213N 2.17174E becomes 47.42N 2.17E. (For UK records, coordinates are converted to Ordnance Survey grid references and sensitive records are reduced to 10km resolution.) When showing records on maps, sensitive records will be displayed with this reduced precision.") %>
    </p>
  </li>
  <li class="table-view-cell">
    <a class="collapsed" data-toggle="collapse" data-parent="#accordion"
       href="#c3" aria-expanded="false" aria-controls="c3">
      <span class="icon icon-collapse pull-left"></span>
      <%= t("Sync. with the database") %>
    </a>
    <p id="c3" class="collapse" aria-labelledby="headingTwo" aria-expanded="false">
      <%= t("It is possible to complete a record while offline. If you try to send a record while offline, you will receive a message. If you click OK, the completed record will appear in your Record List on the home page. By default a record is in") %> 
      <i><%= t("draft") %></i> 
      <%= t("mode until it is set for submission. While it is in") %> 
      <i><%= t("draft") %></i> 
      <%= t("mode the application will not synchronise your record with the database. To set it for sending, open the record and press the") %> 
      <span class="icon icon-send"></span> 
      <%= t("button in the header. The application will try to submit your record once there is a good network connection.") %>
      <%= t("If the record has reached the database a red") %> 
      <span class="icon icon-send" style="color: red;"></span>
      <%= t("(set for submission & saved locally) will become green") %> 
      <span class="icon icon-send" style="color: green;"></span> 
      <%= t("(synced to the database). Once it has successfully reached the database the record becomes unavailable for new edits.") %>
      <br><br>
      <b><%= t("Note") %>:</b> 
      <%= t("you have to be signed in to your ICP Vegetation account and have a network connection, for the records to be automatically synchronised in the background.") %>
  </li>
  <li class="table-view-cell">
    <a class="collapsed" data-toggle="collapse" data-parent="#accordion"
       href="#c4" aria-expanded="false" aria-controls="c4">
      <span class="icon icon-collapse pull-left"></span>
      <%= t("Send all records") %>
    </a>
    <p id="c4" class="collapse" aria-labelledby="headingTwo" aria-expanded="false">
      <%= t("You can set all your draft records for submission. To do that go to the App Information > Settings page") %> 
      <span class="icon icon-settings"></span> 
      <%= t("and click Submit All") %> 
      <span class="icon icon-send"></span> 
      <%= t("button. This will try to send all the valid records.") %>
    </p>
  </li>
  <li class="table-view-cell">
    <a class="collapsed" data-toggle="collapse" data-parent="#accordion"
       href="#c5" aria-expanded="false" aria-controls="c5">
      <span class="icon icon-collapse pull-left"></span>
      <%= t("Delete a record") %>
    </a>
    <p id="c5" class="collapse" aria-labelledby="headingTwo" aria-expanded="false">
      <%= t("To delete a record, swipe it left in the Record List page and click the delete") %> 
      <span class="icon icon-delete"></span> 
      <%= t("button.") %>
      <img src="images/swipe_record.png">
      <br><br>
      <%= t("You can also remove all the locally saved records that have been successfully synchronised with the database. This will leave the records on the database untouched. To do that go to settings page") %>
      <span class="icon icon-settings"></span> 
      <%= t("and click Remove All Saved") %>
      <span class="icon icon-delete"></span> 
      <%= t("button.") %>
    </p>
  </li>
  <li class="table-view-cell">
    <a class="collapsed" data-toggle="collapse" data-parent="#accordion"
       href="#locks" aria-expanded="false" aria-controls="locks">
      <span class="icon icon-collapse pull-left"></span>
      <%= t("Lock an attribute") %>
    </a>
    <p id="locks" class="collapse" aria-labelledby="headingTwo" aria-expanded="false">
      <%= t("You can lock record attributes like date, location, etc, which will preserve your current attribute value for the subsequently added records.") %>
      <br><br>
      <%= t("To lock an attribute click on the lock") %> 
      <span class="icon icon-lock-open"></span> 
      <%= t("button in the attribute edit page header. This will change the symbol to locked") %> 
      <span class="icon icon-lock-closed"></span> 
      <%= t("both on the button and next to the attribute.") %>
      <br><br>
      <b><%= t("Note") %>:</b> 
      <%= t("You cannot lock a GPS-sourced location. As you move about, the GPS value will change. You can lock a location if it is selected using a map or entered manually.") %>
    </p>
  </li>

  <li class="table-view-divider"><%= t("User") %></li>
  <li class="table-view-cell">
    <a class="collapsed" data-toggle="collapse" data-parent="#accordion"
       href="#c9" aria-expanded="false" aria-controls="c9">
      <span class="icon icon-collapse pull-left"></span>
      <%= t("Sign in/out or register") %>
    </a>
    <p id="c9" class="collapse" aria-labelledby="headingTwo" aria-expanded="false">
      <%= t("To login, open the App Information page") %> 
      <span class="icon icon-settings"></span>,
      <%= t("click Login") %> 
      <span class="icon icon-user"></span>
      <%= t("or Register") %> 
      <span class="icon icon-user-plus"></span>
      <%= t("buttons and follow the instructions.") %>
      <br><br>
      <%= t("To logout,press the logout") %> 
      <span class="icon icon-logout"></span> 
      <%= t("button.") %>
      <br><br>
      <b><%= t("Note:") %></b> 
      <%= t("after registering a new account you must verify your email address by clicking on a verification link sent to your email.") %>
    </p>
  </li>

  <li class="table-view-divider"><%= t("Other") %></li>
  <li class="table-view-cell">
    <a class="collapsed" data-toggle="collapse" data-parent="#accordion"
       href="#c8" aria-expanded="false" aria-controls="c8">
      <span class="icon icon-collapse pull-left"></span>
      <%= t("Reset the application") %>
    </a>
    <p id="c8" class="collapse" aria-labelledby="headingTwo" aria-expanded="false">
      <%= t("Go to the App Information > Settings page") %> 
      <span class="icon icon-settings"></span> 
      <%= t("and click on the Reset") %> 
      <span class="icon icon-undo"></span>
      <%= t("button.") %>
    </p>
  </li>
</ul>


