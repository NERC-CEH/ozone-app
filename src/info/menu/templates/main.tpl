<% if (obj.login) { %>
<li class="table-view-cell">
  <a id="logout-button" class="navigate-right">
    <span class="media-object pull-left icon icon-logout"></span>
    <%= t("Logout") %>: <%- obj.firstname %> <%- obj.secondname %>
  </a>
</li>
<% } else { %>
<li class="table-view-cell">
  <a href="#user/login" class="navigate-right">
    <span class="media-object pull-left icon icon-user"></span>
    <%= t("Login") %>
  </a>
</li>
<li class="table-view-cell">
  <a href="#user/register" class="navigate-right">
    <span class="media-object pull-left icon icon-user-plus"></span>
    <%= t("Register") %>
  </a>
</li>
<% } %>

<li class="table-view-divider"><%= t("Settings") %></li>
<li class="table-view-cell">
  <a href="#settings" class="navigate-right">
    <span class="media-object pull-left icon icon-settings"></span>
    <%= t("Settings") %>
  </a>
</li>

<li class="table-view-cell">
  <a href="#info/help" class="navigate-right">
    <span class="media-object pull-left icon icon-help"></span>
    <%= t("Help") %>
  </a>
</li>
<li class="table-view-cell">
  <a href="#info/privacy" class="navigate-right">
    <span class="media-object pull-left icon icon-lock-closed"></span>
    <%= t("Privacy") %>
  </a>
</li>
<li class="table-view-cell">
  <a href="#info/credits" class="navigate-right">
    <span class="media-object pull-left icon icon-heart"></span>
    <%= t("Credits") %>
  </a>
</li>
