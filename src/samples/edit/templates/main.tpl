<ul class="table-view core inputs no-top <%- obj.isSynchronising ? 'disabled' : '' %>">
  <li class="table-view-cell">
    <a id="species-button" class="navigate-right">
      <span class="media-object pull-left icon icon-leaf"></span>
      <% if (obj.commonName) { %>
      <span class="media-object pull-right descript long"><%= obj.commonName %></span>
      <% } %>
      <span class="media-object pull-right descript long"><i><%= obj.scientificName %></i></span>
      <%= t("Species") %>
    </a>
  </li>

  <li class="table-view-cell">
    <a href="#samples/<%- obj.id %>/edit/location" id="location-button"
       class="<%- obj.locks['smp:location'] || obj.locks['smp:locationName'] ? '' : 'navigate-right' %>">
      <span class="media-object pull-left icon icon-location"></span>

      <% if (obj['smp:location']) { %>
      <span class="location media-object pull-right descript <%- obj.locks['smp:location'] ? 'lock' : '' %>"><%- obj['smp:location'] %></span>
      <% } else { %>
      <% if (obj.isLocating) { %>
      <span class="media-object pull-right descript warn"><%= t("Locating") %>...</span>
      <% } else { %>
      <span class="media-object pull-right descript error"><%= t("Location missing") %></span>
      <% } %>
      <% } %>

     <%= t("Location") %>
    </a>
  </li>

  <li class="table-view-cell">
    <a href="#samples/<%- obj.id %>/edit/smp:date" id="date-button"
       class="<%- obj.locks['smp:date'] ? 'lock' : 'navigate-right' %>">
      <span class="media-object pull-left icon icon-calendar"></span>
      <span class="media-object pull-right descript"><%- obj['smp:date'] %></span>
      <%= t("Date") %>
    </a>
  </li>

  <li class="table-view-cell">
    <a href="#samples/<%- obj.id %>/edit/injury" id="injury-button" 
      class="navigate-right">
      <span class="media-object pull-left icon icon-bandage"></span>
      <span class="media-object pull-right descript"><%- obj.soil %></span>
      <%= t("Injury") %>
    </a>
  </li>

  <li class="table-view-cell">
    <a href="#samples/<%- obj.id %>/edit/weather" id="weather-button" 
      class="navigate-right">
      <span class="media-object pull-left icon icon-cloud-sun"></span>
      <span class="media-object pull-right descript"><%- obj.soil %></span>
      <%= t("Weather") %>
    </a>
  </li>

  <li class="table-view-cell">
    <a href="#samples/<%- obj.id %>/edit/pollution" id="pollution-button" 
      class="navigate-right">
      <span class="media-object pull-left icon icon-pollution"></span>
      <span class="media-object pull-right descript"><%- obj.soil %></span>
      <%= t("Pollution") %>
    </a>
  </li>

  <% if (obj['smp:activity']) { %>
      <li class="table-view-cell">
        <a href="#samples/<%- obj.id %>/edit/activity" id="activity-button"
           class="<%- obj.locks['smp:activity'] ? 'lock' : 'navigate-right' %>">
          <span class="media-object pull-left icon icon-users"></span>
          <span class="media-object pull-right descript"><%- obj['smp:activity'] %></span>
          <%= t("Activity") %>
        </a>
      </li>
  <% } %>
</ul>

<ul id="attrs"></ul>
