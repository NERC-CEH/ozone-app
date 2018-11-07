<% if (obj.message) { %>
<div class="info-message">
  <p><%= t(obj.message) %></p>
</div>
<% } %>

<div class="input-group">
  <textarea cols="80" rows="16" autofocus><%= obj.value %></textarea>

  <% if (obj.done) { %>
    <div class="input-row" id="done-row">
      <button class="btn btn-positive" data-rel="back">Done</button>
    </div>
  <% } %>

</div>
