<div id="header-controls">

  <div id="back-btn" class="pull-left">
    <a data-rel="back" class="icon icon-left-nav" style="color: white;"></a>
  </div>

  <div class="input-group">

    <div class="input-row">
      <% if (!obj.hideLocks) { %>
        <button id="location-lock-btn" class="<%= obj.disableLocationLock ? 'disabled' : '' %> lock-btn icon icon-lock-<%- obj.locationLocked ? 'closed' : 'open' %>"></button>
      <% } %>

      <label class="media-object icon icon-location" for="location-gridref" />
      <input type="text" title="set gridreference" id="location-gridref" placeholder="<%= t('Grid reference') %>" value="<%- obj.value %>" data-source="<%- obj.locationSource %>" />
    </div>

    <% if (!obj.hideName) { %>
      <div class="input-row" id="location-name-row">
        <% if (!obj.hideLocks) { %>
          <button id="location-name-lock-btn" class="lock-btn icon icon-lock-<%- obj.nameLocked ? 'closed' : 'open' %>"></button>
        <% } %>
        <label class="media-object icon icon-address" for="location-name" />
        <input class="typeahead" type="text" title="set location name" id="location-name" placeholder="<%= t('Nearest named place') %>" value="<%= obj.locationName %>"/>
      </div>
    <% } %>

    <div class="input-row" id="country-row">
      <% if (!obj.hideLocks) { %>
        <button id="country-lock-btn" class="lock-btn icon icon-lock-<%- obj.countryLocked ? 'closed' : 'open' %>"></button>
      <% } %>
      <label class="media-object icon icon-address" for="country" />
      <input class="typeahead" type="text" title="set country" id="country" placeholder="<%= t('Country') %>" value="<%= obj.country%>"/>
    </div>

    <div class="input-row" id="sensitive-row">
      <% if (!obj.hideLocks) { %>
        <button id="sensitive-lock-btn" class="lock-btn icon icon-lock-<%- obj.sensitiveLocked ? 'closed' : 'open' %>"></button>
      <% } %>
      <span class="media-object icon icon-low-vision"></span>
      <div class="toggle-container" ><%= t("Sensitive") %>
        <div id="sensitive-btn" data-setting="sensitive"
              class="toggle no-yes <%- obj.sensitive ? 'active' : '' %>">
          <div class="toggle-handle"></div>
        </div>
      </div>  
    </div>

    <div class="input-row" id="done-row">
      <button class="btn btn-positive" data-rel="back">Done</button>
    </div>

  </div>
</div>
