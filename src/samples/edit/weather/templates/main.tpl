<div class="info-message">
    <p>Please provide an indication of weather, in the last week, where the injury 
      was seen.</p>
  </div>
  
  <ul class="table-view core inputs no-top <%- obj.isSynchronising ? 'disabled' : '' %>">
  </li>
  <li class="table-view-cell">
    <a href="#samples/<%- obj.id %>/edit/smp:weather-temp" id="weather-temp-button"
      class="<%- obj.locks['weather-temp'] ? 'lock' : 'navigate-right' %> question">
     <%- obj.labels['weather-temp'] %>
     <span class="media-object pull-right answer"><%- obj['weather-temp'] %></span>
   </a>
 </li>
  <li class="table-view-cell">
    <a href="#samples/<%- obj.id %>/edit/smp:weather-rain" id="weather-rain-button"
      class="<%- obj.locks['weather-rain'] ? 'lock' : 'navigate-right' %> question">
     <%- obj.labels['weather-rain'] %>
     <span class="media-object pull-right answer"><%- obj['weather-rain'] %></span>
   </a>
 </li>
</ul>
