<% if (obj.message) { %>
<div class="info-message">
  <p><%= t(obj.message) %></p>
</div>
<% } %>

<% obj.selection.forEach((option) => { %>
  <label class="item item-radio">
    <input type="checkbox" value="<%= option.value %>" <%- obj.selected && obj.selected.indexOf(option.value) >= 0 ? 'checked' : ''%>>
    <div class="radio-content">
      <div class="item-content">
        <%= t(option.label || option.value) %>
      </div>
      <i class="radio-icon icon-check"></i>
    </div>
  </label>
<% }) %>
