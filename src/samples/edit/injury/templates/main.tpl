<div class="info-message">
  <p>Please answer the following questions.</p>
</div>

<ul class="table-view core inputs no-top <%- obj.isSynchronising ? 'disabled' : '' %>">
  </li>
  <li class="table-view-cell">
    <a href="#samples/<%- obj.id %>/edit/occ:injury-symptoms" id="injury-symptoms-button"
       class="<%- obj.locks['injury-symptoms'] ? 'lock' : 'navigate-right' %> question">
      <%- obj.labels['injury-symptoms'] %>
      <span class="media-object pull-right answer"><%- obj['injury-symptoms'] %></span>
    </a>
  </li>
  <li class="table-view-cell">
    <a href="#samples/<%- obj.id %>/edit/occ:injury-colour" id="injury-colour-button"
       class="<%- obj.locks['injury-colour'] ? 'lock' : 'navigate-right' %> question">
      <%- obj.labels['injury-colour'] %>
      <span class="media-object pull-right answer"><%- obj['injury-colour'] %></span>
    </a>
  </li>
  <li class="table-view-cell">
    <a href="#samples/<%- obj.id %>/edit/occ:injury-location" id="injury-location-button"
       class="<%- obj.locks['injury-location'] ? 'lock' : 'navigate-right' %> question">
      <%- obj.labels['injury-location'] %>
      <span class="media-object pull-right answer"><%- obj['injury-location'] %></span>
    </a>
  </li>
  <li class="table-view-cell">
    <a href="#samples/<%- obj.id %>/edit/occ:injury-side" id="injury-side-button"
       class="<%- obj.locks['injury-side'] ? 'lock' : 'navigate-right' %> question">
      <%- obj.labels['injury-side'] %>
      <span class="media-object pull-right answer"><%- obj['injury-side'] %></span>
    </a>
  </li>
  <li class="table-view-cell">
    <a href="#samples/<%- obj.id %>/edit/occ:injury-age" id="injury-age-button"
       class="<%- obj.locks['injury-age'] ? 'lock' : 'navigate-right' %> question">
      <%- obj.labels['injury-age'] %>
      <span class="media-object pull-right answer"><%- obj['injury-age'] %></span>
    </a>
  </li>
  <li class="table-view-cell">
    <a href="#samples/<%- obj.id %>/edit/occ:injury-extent" id="injury-extent-button"
       class="<%- obj.locks['injury-extent'] ? 'lock' : 'navigate-right' %> question">
      <%- obj.labels['injury-extent'] %>
      <span class="media-object pull-right answer"><%- obj['injury-extent'] %></span>
    </a>
  </li>
  <li class="table-view-cell">
    <a href="#samples/<%- obj.id %>/edit/occ:injury-evidence" id="injury-evidence-button"
       class="<%- obj.locks['injury-evidence'] ? 'lock' : 'navigate-right' %> question">
      <%- obj.labels['injury-evidence'] %>
      <span class="media-object pull-right answer">
        <%- obj['injury-evidence'] && obj['injury-evidence'].join(', ') %>
      </span>
    </a>
  </li>
  <% if (obj['injury-evidence'] && obj['injury-evidence'].indexOf('Other symptoms') !== -1) { %>
    <li class="table-view-cell">
      <a href="#samples/<%- obj.id %>/edit/occ:injury-evidence-other" id="injury-evidence-other-button"
        class="<%- obj.locks['injury-evidence-other'] ? 'lock' : 'navigate-right' %> question">
        <%- obj.labels['injury-evidence-other'] %>
        <span class="media-object pull-right answer"><%- obj['injury-evidence-other'] %></span>
      </a>
    </li>
  <% } %>
  <li class="table-view-cell">
      &nbsp;
      <button class="btn btn-positive" data-rel="back">Done</button>
    </li>
  </ul>
