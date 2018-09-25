<% if (obj.id) { %>
  <li class="table-view-cell leaf">
    <label class="item item-radio">
      <input id="<%= obj.id %>" type="radio" name="group" value="<%= obj.path %>" <%= (obj.selected === obj.path) ? "checked" : "" %> >
      <div class="radio-content">
        <div class="item-content">
            <%= obj.title %>
        </div>
        <i class="radio-icon icon-check"></i>
      </div>
    </label>
  </li>
<% } %>