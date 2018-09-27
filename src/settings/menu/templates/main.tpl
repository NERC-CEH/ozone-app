<li class="table-view-divider"><%= t("Records") %></li>
<li class="table-view-cell">
  <a id="submit-all-btn">
    <span class="media-object pull-left icon icon-send"></span>
    <%= t("Submit All") %>
  </a>
</li>
<li class="table-view-cell">
  <a id="delete-all-btn">
    <span class="media-object pull-left icon icon-delete"></span>
    <%= t("Remove All Saved") %>
  </a>
</li>
<li id="use-training-btn-parent" class="table-view-cell">
  <%= t("Training Mode") %>
  <span class="media-object pull-left icon icon-training"></span>
  <div id="use-training-btn" data-setting="useTraining"
       class="toggle no-yes <%- obj.useTraining ? 'active' : '' %>">
    <div class="toggle-handle"></div>
  </div>
</li>

<li class="table-view-divider"><%= t("Application") %></li>
<li class="table-view-cell">
  <a id="app-reset-btn">
    <span class="media-object pull-left icon icon-undo"></span>
    <%= t("Reset") %>
  </a>
</li>
