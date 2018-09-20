<div class="pull-left">
  <a data-rel="back" class="icon icon-left-nav"></a>
</div>
<div class="pull-right">
  <div class="img-picker icon icon-camera">
    <input type="file" accept="image/*"/>
  </div>
  <button id="create-new-btn" class="icon icon-plus"></button>
</div>

<%  if(obj.activity_title || obj.training) { %>
<div id="subheader">
  <% if (obj.activity_title) { %>
  <div class="activity"><%- t(obj.activity_title) %></div>
  <% } %>
  <% if (obj.training) { %>
  <div class="training"><%= t("Training") %></div>
  <% } %>
</div>
<% } %>
