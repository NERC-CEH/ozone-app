
<div class="info-message">
  <p>If you are aware of ozone concentrations in the area, in the last week, please 
    answer the following questions.</p>
</div>

<ul class="table-view core inputs no-top <%- obj.isSynchronising ? 'disabled' : '' %>">
  </li>
  <li class="table-view-cell">
    <a href="#samples/<%- obj.id %>/edit/smp:pollution-concentration" id="pollution-concentration-button"
      class="<%- obj.locks['pollution-concentration'] ? 'lock' : 'navigate-right' %> question">
     <%- obj.labels['pollution-concentration'] %>
     <span class="media-object pull-right answer"><%- obj['pollution-concentration'] %></span>
   </a>
 </li>
  <li class="table-view-cell">
    <a href="#samples/<%- obj.id %>/edit/smp:pollution-duration" id="pollution-duration-button"
      class="<%- obj.locks['pollution-duration'] ? 'lock' : 'navigate-right' %> question">
     <%- obj.labels['pollution-duration'] %>
     <span class="media-object pull-right answer"><%- obj['pollution-duration'] %></span>
   </a>
 </li>
</ul>
