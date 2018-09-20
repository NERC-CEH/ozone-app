<div class="pull-left">
  <a data-rel="back" class="icon icon-left-nav"></a>
</div>
<div class="pull-right">
  <button id="create-new-btn" class="icon icon-plus"></button>
</div>
<h1 class="title"><%= t("List") %></h1>

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
