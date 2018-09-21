<div class="info-message">
  <p><%= t("This record has been submitted and cannot be edited within this App") %>.
</div>
<ul class="table-view core inputs info no-top">
  <li class="table-view-cell species">
    <span class="media-object pull-left icon icon-leaf"></span>
    <span class="media-object pull-right descript"><%- obj.commonName %></span>
    <%= t("Species") %>
  </li>
  <li class="table-view-cell">
    <span class="media-object pull-left icon icon-location"></span>
    <span class="media-object pull-right descript"><%- obj.coords %></span>
    <%= t("Location") %>
  </li>
  <% if (obj.country) { %>
    <li class="table-view-cell">
      <span class="media-object pull-left icon icon-address"></span>
      <span class="media-object pull-right descript"><%- obj.country %></span>
      <%= t("Country") %>
    </li>
  <% } %>
  <li class="table-view-cell">
    <span class="media-object pull-left icon icon-low-vision"></span>
    <span class="media-object pull-right descript"><%- obj.sensitive ? 'Yes' : 'No' %></span>
    <%= t("Sensitive") %>
  </li>
<li class="table-view-cell">
    <span class="media-object pull-left icon icon-calendar"></span>
    <span class="media-object pull-right descript"><%- obj.date %></span>
    <%= t("Date") %>
  </li>

  <li class="table-view-cell">
    <span class="media-object pull-left icon icon-bandage"></span>
    <%= t("Injury") %>
    <% if (obj.injurySymptoms) { %>
      <span class="media-object pull-right descript"><%- obj.injurySymptoms %></span>
    <% } %>
    <% if (obj.injuryColour) { %>
      <span class="media-object pull-right descript"><%- obj.injuryColour %></span>
    <% } %>
    <% if (obj.injuryLocation) { %>
      <span class="media-object pull-right descript"><%- obj.injuryLocation %></span>
    <% } %>
    <% if (obj.injurySide) { %>
      <span class="media-object pull-right descript"><%- obj.injurySide %></span>
    <% } %>
    <% if (obj.injuryAge) { %>
      <span class="media-object pull-right descript"><%- obj.injuryAge %></span>
    <% } %>
    <% if (obj.injuryExtent) { %>
      <span class="media-object pull-right descript"><%- obj.injuryExtent %></span>
    <% } %>
    <% if (obj.injuryEvidence) { %>
      <span class="media-object pull-right descript"><%- obj['injuryEvidence'].join(', ') %></span>
    <% } %>
    <% if (obj.injuryEvidenceOther) { %>
      <span class="media-object pull-right descript"><%- obj.injuryEvidenceOther %></span>
    <% } %>
  </li>

  <li class="table-view-cell">
    <span class="media-object pull-left icon icon-cloud-sun"></span>
    <%= t("Weather") %>
    <% if (obj.weatherTemp) { %>
      <span class="media-object pull-right descript"><%- obj.weatherTemp %></span>
    <% } %>
    <% if (obj.weatherRain) { %>
      <span class="media-object pull-right descript"><%- obj.weatherRain %></span>
    <% } %>
  </li>

  <li class="table-view-cell">
    <span class="media-object pull-left icon icon-pollution"></span>
    <%= t("Pollution") %>
    <% if (obj.pollutionConcentration) { %>
      <span class="media-object pull-right descript"><%- obj.pollutionConcentration %></span>
    <% } %>
    <% if (obj.pollutionDuration) { %>
      <span class="media-object pull-right descript"><%- obj.pollutionDuration %></span>
    <% } %>
  </li>

  <% if (obj.media.length) { %>
    <li id="img-array">
      <% obj.media.each((image) =>{ %>
        <img src="<%- image.getURL() %>" alt="">
      <% }) %>
    </li>
  <% } %>
</ul>

<% if (obj.useExperiments) { %>
  <button id="resend-btn" class="btn btn-narrow btn-negative btn-block"><%= t("Resend the record") %></button>
<% } %>

<div id="occurrence-id"><%- obj.cid %></div>
