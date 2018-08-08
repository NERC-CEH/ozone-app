<% if (obj.id) { %>
  <label class="item item-radio">
      <input id="<%= obj.id %>" type="radio" name="group" value="<%= obj.title %>" >
      <div class="radio-content">
        <div class="item-content">
            <%= obj.title %>
        </div>
        <i class="radio-icon icon-check"></i>
      </div>
    </label>
<% } %>